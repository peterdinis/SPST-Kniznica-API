import { IBook } from "./IBook";

export interface ICategory {
    id: number;
    externalId: number;
    name: string;
    description: string;
    Books?: [] | Array<IBook[]>;
}