export class TeacherUser {
    _id: string
    email: string
    password: string
    role: string
    name: string
    belongs_to_school: string
    subscriptionPlan: number
    _teacher: Teacher
}

export class TeacherCreate {
    _id: string
    email: string
    password: string
    role: string
    name: string
    belongs_to_school: string
    subscriptionPlan: number
    _teacher: Teacher
}

export class Teacher {
    belongs_to_class: string[]
    subjects: string[]
    is_class_teacher: boolean
    class_teacher_of: string
    mobile_number: number

}