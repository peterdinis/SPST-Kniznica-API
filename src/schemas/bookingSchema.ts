import { z } from "zod";

export const borrowBookSchema = z.object({
    from: z.string({
        required_error: "From date is required"
    }),

    to: z.string({
        required_error: "To date is required"
    }),

    email: z.string({
        required_error: "Email is required"
    }),

    bookId: z.number({
        description: "Book ID is required"
    }),
})