export interface Params {
    city: string,
    checkInDate: Date,
    checkOutDate: Date,
    priceLimit: number
}
export interface Results {
    id: string,
    title: string,
    details: string,
    photos: Array<string>,
    coordinates: Array<number>,
    bookedDates: Array<Date>,
    totalPrice: number
}

export class FlatRentSdk {
    search(parameters: Params): Promise<Array<Results>>;
}
