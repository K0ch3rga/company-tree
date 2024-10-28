import type { Edge, Node } from '@vue-flow/core'
import type { Department, DepartmentNode } from '..'

export const createNodes = (departments: Department[]): [Node<DepartmentNode>[], Edge[]] => {
  const departmentMap = new Map<string, Department>()
  const childrenMap = new Map<string, string[]>()
  // counting all departments
  departments.forEach((dep) => {
    if (dep.parent_department)
      childrenMap.set(
        dep.parent_department,
        (childrenMap.get(dep.parent_department) ?? []).concat(dep.name)
      )
    departmentMap.set(dep.name, dep)
  })

  // calculating positions
  const childrenPositionMap = new Map<string, number[]>()
  childrenMap.forEach((v, k) =>
    childrenPositionMap.set(k, calculateNodeXPositions(v.length, 20, 150))
  )

  const treeWidthMap = new Map<string, [number, number]>()
  const getSetWidth = (node: string): [number, number] => {
    const coordinates = childrenMap
      .get(node)
      ?.reduce(
        (prev: [number, number], val: string) =>
          getSetWidth(val).map((n: number) => n) as [number, number],
        [0, 0]
      ) ?? [0, 150]
    treeWidthMap.set(node, coordinates)
    return coordinates
  }
  getSetWidth('All Departments')
  console.log(treeWidthMap)

  // shift positions to aviod overlapping
  childrenMap.forEach((_, k) => {
    const parent = departmentMap.get(k)?.parent_department
    if (!parent) return
    const siblings = childrenMap.get(parent)
    const siblingsPos = childrenPositionMap.get(parent)
    if (!siblings || !siblingsPos) return
    const place = siblings.findIndex((sibling) => sibling === k) + 1
    const center = siblings.length / 2
    const shift = place - center - 0.5
    if (shift == 0) return
    if (shift > 0) {
      console.log(k, siblingsPos, place, treeWidthMap.get(k))
      siblingsPos[place - 1] += (treeWidthMap.get(k)?.[1] ?? 0) / 2 + 10
      console.log(k, siblingsPos[place - 1])
    }
    if (shift < 0) siblingsPos[place - 1] -= (treeWidthMap.get(k)?.[0] ?? 0) / 2
  })

  // creating nodes
  const nodes: Node<DepartmentNode>[] = Array.from(departmentMap.values()).map(
    (dep) =>
      ({
        id: dep.name,
        position: { x: childrenPositionMap.get(dep.parent_department)?.shift() ?? 0, y: 100 },
        parentNode: dep.parent_department,
        data: { ...dep, expanded: false },
        label: dep.department_name,
        type: 'department'
      }) as Node
  )

  // creating edges
  const edges: Edge[] = nodes
    .filter((n) => n.data?.parent_department)
    .map(
      (n) =>
        ({
          id: n.data?.name,
          target: n.id,
          source: n.parentNode,
          type: 'smoothstep',
          curvature: 8,
          focusable: false,
          selectable: false
        }) as Edge
    )
  return [nodes, edges]
}

const calculateNodeXPositions = (
  numberOfNodes: number,
  gap: number,
  nodeSize: number
): number[] => {
  const positions = new Array<number>(numberOfNodes)
  positions[0] = ((gap + nodeSize) / -2) * (numberOfNodes - 1)
  for (let i = 1; i < positions.length; i++) {
    positions[i] = positions[i - 1] + nodeSize + gap
  }
  return positions
}
