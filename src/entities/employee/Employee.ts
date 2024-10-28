type EmployeeFullDto = {
  name: string
  owner: string
  creation: Date
  modified: Date
  modified_by: string
  docstatus: number
  idx: number
  employee: string
  naming_series: string
  first_name: string
  middle_name: string
  last_name: string
  employee_name: string
  gender: string
  date_of_birth: Date
  salutation: string
  date_of_joining: Date
  image?: string
  status: string
  user_id: string
  create_user_permission: number
  company: string
  department: string
  employee_number: string
  designation: string
  reports_to: string
  branch: string
  scheduled_confirmation_date: string
  final_confirmation_date: string
  contract_end_date: string
  notice_number_of_days: number
  date_of_retirement: string
  cell_number: string
  personal_email: string
  company_email: string
  prefered_contact_email: string
  prefered_email: string
  unsubscribed: number
  current_address: string
  current_accommodation_type: string
  permanent_address: string
  permanent_accommodation_type: string
  person_to_be_contacted: string
  emergency_phone_number: string
  relation: string
  attendance_device_id: string
  holiday_list: string
  ctc: number
  salary_currency: string
  salary_mode: string
  bank_name: string
  bank_ac_no: string
  iban: string
  marital_status: string
  family_background: string
  blood_group: string
  health_details: string
  passport_number: string
  valid_upto: string
  date_of_issue: string
  place_of_issue: string
  bio: string
  resignation_letter_date: string
  relieving_date: string
  held_on: string
  new_workplace: string
  leave_encashed: string
  encashment_date: string
  reason_for_leaving: string
  feedback: string
  lft: number
  rgt: number
  old_parent: string
}

export type Employee = Pick<
  EmployeeFullDto,
  'first_name' | 'last_name' | 'designation' | 'department' | 'employee_number' | 'image'
>

// fields of Employee type in array form. Object must be filled with properties
export const employeeKeys = Object.keys({
  first_name: undefined,
  last_name: undefined,
  department: undefined,
  designation: undefined,
  employee_number: undefined,
  image: undefined
} as Record<keyof Employee, undefined>) as (keyof Employee)[]
