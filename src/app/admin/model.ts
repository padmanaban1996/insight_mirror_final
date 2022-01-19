
export class AdminUser {
    _id: string
    email: string
    password: string
    role: string
    name: string
    belongs_to_school: string
    subscriptionPlan: number
    _admin: Admin

}


export class AdminCreate {
    email: string
    password: string
    role: string
    name: string
    _admin: Admin
}

export class Admin {

    belongs_to_school: string
    mobile_number: string


}
