import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),

    description: z.string({
        required_error: "Description is required"
    }),
})