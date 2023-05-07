export interface IBook {
    id: number;
    externalId: number;
    name: string;
    description: string;
    image: string;
    publisher: string;
    status: string;
    quantity: number;
    pages: number;
    year: number;
    categoryId: number;
    authorId: number;
}