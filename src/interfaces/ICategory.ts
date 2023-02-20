import { IBook } from "./IBook";

export interface ICategory {
    id?: number |string;
    name: string;
    description: string;
    books?: Array<IBook[]>;
}