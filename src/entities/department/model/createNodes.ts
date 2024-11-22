import type { Edge } from '@vue-flow/core'
import type { Department, DepartmentNode } from '..'

const nodeWidth = 150
const nodeHeight = 100
const gapWidth = 40

export const createNodes = (departments: Department[]): [DepartmentNode[], Edge[]] => {
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

  // count children without children for making them in column
  const childlessChildrenMap = new Map<string, string[]>()
  const childlessSet = new Set<string>()
  childrenMap.forEach((children, department) =>
    children.forEach((child) => {
      const grandChildren = childrenMap.get(child)
      if (!grandChildren || grandChildren.length == 0) {
        childlessChildrenMap.set(
          department,
          (childlessChildrenMap.get(department) ?? []).concat(child)
        )
        childlessSet.add(child)
      }
    })
  )

  // counting cumulative width
  const treeWidthMap = new Map<string, number>()
  const getSetWidth = (node: string): number => {
    const childless = childlessChildrenMap.get(node)
    const initialShift = childless && childless.length > 0 ? nodeWidth : -gapWidth
    const coordinates =
      childrenMap
        .get(node)
        ?.reduce(
          (prev: number, val: string) =>
            childless?.includes(val) ? prev : getSetWidth(val) + prev + gapWidth,
          initialShift
        ) ?? nodeWidth
    treeWidthMap.set(node, coordinates)
    return coordinates
  }
  getSetWidth('All Departments')

  // calculate positions
  const childrenPositionMap = new Map<string, number[][]>()
  childrenMap.forEach((children, department) =>
    children.forEach((currentChild, index) => {
      const childlessIndex = childlessChildrenMap.get(department)?.indexOf(currentChild)
      const stackIndex = childlessIndex && childlessIndex > -1 ? childlessIndex : undefined
      const width = treeWidthMap.get(department) ?? nodeWidth
      const prevWidth =
        stackIndex || index == 0 ? 0 : (treeWidthMap.get(children[index - 1]) ?? nodeWidth)
      const curWidth = treeWidthMap.get(currentChild) ?? nodeWidth
      const prevPos =
        (stackIndex ? undefined : childrenPositionMap.get(department)?.[index - 1]?.[0]) ??
        -width / 2
      const gap = index == 0 || stackIndex ? 0 : gapWidth
      const position = [
        prevPos + prevWidth / 2 + curWidth / 2 + gap,
        (stackIndex ?? 0) * nodeHeight
      ]
      childrenPositionMap.set(
        department,
        (childrenPositionMap.get(department) ?? []).concat([position])
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

  // creating nodes
  const nodes: DepartmentNode[] = Array.from(departmentMap.values()).map((dep) => {
    const position = childrenPositionMap.get(dep.parent_department)?.shift()
    return {
      id: dep.name,
      position: { x: position?.[0] ?? 0, y: nodeHeight + (position?.[1] ?? 0) },
      parentNode: dep.parent_department,
      data: { ...dep, expanded: false, isHidden: false },
      label: dep.department_name,
      type:
        childlessSet.has(dep.name) &&
        (childlessChildrenMap.get(dep.parent_department)?.length ?? 0) > 1
          ? 'stacked_department'
          : 'department',
      targetPosition: childlessSet.has(dep.name) ? 'left' : 'top'
    } as DepartmentNode
  })

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
