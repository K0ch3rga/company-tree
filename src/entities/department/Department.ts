type DepartmentFullDto = {
  name: string
  owner: string
  creation: Date
  modified: Date
  modified_by: string
  docstatus: number
  idx: number
  department_name: string
  parent_department: string
  company: null | string
  is_group: number
  disabled: number
  lft: number
  rgt: number
  old_parent: null | string
}

export type Department = Pick<
  DepartmentFullDto,
  'name' | 'department_name' | 'parent_department' | 'lft'
>

export type RecursiveDepartment = Department & { children?: RecursiveDepartment[] }

export const RecursifyDepartmentList = (departments: Department[]): RecursiveDepartment[] => {
  const departmentMap = new Map<string, RecursiveDepartment>()

  departments.forEach((department) =>
    departmentMap.set(department.name, { ...department, children: [] })
  )

  const tree: RecursiveDepartment[] = []

  departmentMap.forEach((department) => {
    if (department.parent_department) {
      const parent = departmentMap.get(department.parent_department)
      if (parent) {
        parent.children!.push(department)
      }
    } else {
      tree.push(department)
    }
  })
  return tree
}
