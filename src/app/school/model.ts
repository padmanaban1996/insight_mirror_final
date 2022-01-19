
export class SchoolEachClass {
    _id: string
    name: string
}

export class SchoolTeacher {
    _id: string
    name: string
    subject: string
}

export class SchoolAdmins {
    _id: string
    name: string
}

export class SchoolStudents {
    _id: string
    name: string
    belongs_to_class: string
}

export class SchoolContactPerson {
    name: string
    phone_number: number
}

export class SchoolSubscription {
    type: string
    validity: boolean
    valid_till: Date
}
export class SchoolAccountManager {

    name: string

}
export interface ISchoolAddress {
    line1: string,
    locality: string,
    city: string,
}
export class SchoolDetails {
    _id: string
    name: string
    classes: SchoolEachClass[]
    admins: SchoolAdmins[]
    logoUrl: string
    subscriptionPlan: number
    departments: string[]
    subjects: string[]
    phone_number: number
    address: ISchoolAddress
    pincode: Number
    contact_person: SchoolContactPerson
    subscription: SchoolSubscription
    account_manager: SchoolAccountManager

}