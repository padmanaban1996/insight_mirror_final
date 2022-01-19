import { Card } from '../model';

export const Cards: Card[] = [
    {
        tiername: "Free: current Plan",
        price: 0,
        features: [
            {
                featurename: "60 participants per live class",
                availability: true
            },
            {
                featurename: "Unlimited Students",
                availability: true
            },
            {
                featurename: "Unlimited Schedule class",
                availability: true
            },
            {
                featurename: "Online Exams",
                availability: false
            },
            {
                featurename: "Remote proctoring",
                availability: false
            },
            {
                featurename: "Dedicated Phone Support",
                availability: false
            },
            {
                featurename: "Free Feature upgrades",
                availability: false
            },
            {
                featurename: "Monthly Status Reports",
                availability: false
            }
        ],
        buttonStatus: false
    },
    {
        tiername: "PLUS: Currently Unavailable",
        price: 9,
        features: [
            {
                featurename: "5 Users",
                availability: true
            },
            {
                featurename: "50GB Storage",
                availability: true
            },
            {
                featurename: "Unlimited Public Projects",
                availability: true
            },
            {
                featurename: "Community Access",
                availability: true
            },
            {
                featurename: "Unlimited Private Projects",
                availability: true
            },
            {
                featurename: "Dedicated Phone Support",
                availability: true
            },
            {
                featurename: "Free Subdomain",
                availability: true
            },
            {
                featurename: "Monthly Status Reports",
                availability: false
            }
        ],
        buttonStatus: true
    },
    {
        tiername: "PRO: Currently Unavailable",
        price: 49,
        features: [
            {
                featurename: "Unlimited Users",
                availability: true
            },
            {
                featurename: "150GB Storage",
                availability: true
            },
            {
                featurename: "Unlimited Public Projects",
                availability: true
            },
            {
                featurename: "Community Access",
                availability: true
            },
            {
                featurename: "Unlimited Private Projects",
                availability: true
            },
            {
                featurename: "Dedicated Phone Support",
                availability: true
            },
            {
                featurename: "Unlimited Free Subdomains",
                availability: true
            },
            {
                featurename: "Monthly Status Reports",
                availability: true
            }
        ],
        buttonStatus: true
    }
];