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

    publisher: z.string({
        required_error: "Publisher is required"
    }),

    status: z.string({
        required_error: "Status is required"
    }),

    quantity: z.number({
        required_error: "Quantity is required"
    }),

    pages: z.number({
        required_error: "Pages is required",
        invalid_type_error: "Page must be positive number"
    }),

    year: z.number({
        invalid_type_error: "Year must be positive number",
        required_error: "Year is required"
    }),

    authorName: z.string({
        required_error: "Autor name is required"
    }),

    categoryName: z.string({
        required_error: "Category name is required"
    })
})

export type createBookType = z.infer<typeof createBookSchema>;

export type updateBookType = Partial<createBookType>;