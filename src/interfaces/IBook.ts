export interface IBook {
    id?: number;
    name: string;
    description: string;
    author: string;
    year: number;
    available: boolean;
    pages: number;
    publisher: string;
    image: string;
    status: string;
    categoryId: number;
}