import { z } from "zod";

export const createBookSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),

    description: z.string({
        required_error: "Description is required"
    }),

    image: z.string({
        required_error: "Image is required"
    }),

    author: z.string({
        required_error: "Author is required"
    }),

    status: z.string({
        required_error: "Status is required"
    }),

    pages: z.number({
        required_error: "Pages is required",
        invalid_type_error: "Page must be positive number"
    }),

    year: z.number({
        invalid_type_error: "Year must be positive number",
        required_error: "Year is required"
    })
})

export type createBookType = z.infer<typeof createBookSchema>;

export type updateBookType = Partial<createBookType>;