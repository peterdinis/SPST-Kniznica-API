export interface IBooking {
    id: number;
    from: string | Date;
    to: string | Date;
    username: string;
    bookName: string;
}