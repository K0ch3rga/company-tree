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

  // counting cumulative width
  const treeWidthMap = new Map<string, number>()
  const getSetWidth = (node: string): number => {
    const coordinates =
      childrenMap
        .get(node)
        ?.reduce((prev: number, val: string) => getSetWidth(val) + prev + 20, -20) ?? 150
    treeWidthMap.set(node, coordinates)
    return coordinates
  }
  getSetWidth('All Departments')

  // calculate positions
  const childrenPositionMap = new Map<string, number[]>()
  childrenMap.forEach((children, department) =>
    children.forEach((currentChild, index) => {
      const width = treeWidthMap.get(department) ?? 150
      const prevWidth = treeWidthMap.get(children[index - 1]) ?? 0
      const curWidth = treeWidthMap.get(currentChild) ?? 150
      const prevPos = childrenPositionMap.get(department)?.[index - 1] ?? -width / 2
      const gap = index == 0 ? 0 : 20
      const position = prevPos + prevWidth / 2 + curWidth / 2 + gap
      childrenPositionMap.set(
        department,
        (childrenPositionMap.get(department) ?? []).concat(position)
      )
    })
  )

  // removing root "All Departments"
  departmentMap.delete('All Departments')
  departmentMap.forEach((dep) =>
    dep.parent_department == 'All Departments'
      ? departmentMap.set(dep.name, { ...dep, parent_department: '' })
      : ''
  )
  console.log(departmentMap)

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
