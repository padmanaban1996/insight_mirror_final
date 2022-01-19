
export interface Card {
    tiername: string;
    price: number;
    features: Feature[];
    buttonStatus: boolean;
}
interface Feature {
    featurename: string;
    availability: boolean;
}