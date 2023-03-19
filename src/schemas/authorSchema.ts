import {z} from "zod";

export const createAuthor = z.object({});

export type createAuthorType = z.infer<typeof createAuthor>;