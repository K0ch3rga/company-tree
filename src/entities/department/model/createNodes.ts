import type { Edge, Node } from '@vue-flow/core'
import type { Department } from '..'

export const createNodes = (depatrments: Department[]): [Node<Department>[], Edge[]] => {
  const departmentMap = new Map<string, Department>()
  depatrments.forEach((dep) => departmentMap.set(dep.department_name, dep))
  const nodes: Node<Department>[] = Array.from(departmentMap.values()).map(
    (dep) =>
      ({
        id: dep.department_name,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        parentNode: dep.parent_department,
        data: dep
      }) as Node
  )
  const edges: Edge[] = nodes
    .filter((n) => n.data?.parent_department)
    .map(
      (n) =>
        ({
          id: n.data?.department_name,
          target: n.parentNode,
          source: n.id
        }) as Edge
    )
  return [nodes, edges]
}
