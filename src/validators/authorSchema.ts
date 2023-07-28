import {z} from "zod";

export const createAuthor = z.object({
    name: z.string({
        required_error: "Name is required"
    }),

    lastName: z.string({
        required_error: "Last name is required"
    }),

    fullname: z.string({
        required_error: "Full name must be required"
    }),

    image: z.string({
        required_error: "Picture is required"
    }),

    birthYear: z.number({
        required_error: "BirthYear is required and must be a number" 
    }),

    isAlive: z.boolean({
        required_error: "isAlive must be boolean"
    }).optional(),

    country: z.string({
        required_error: "Country is required"
    }),

    description: z.string({
        required_error: "Description is required"
    }),

    litPeriod: z.string({
        required_error: "LitPeriod is required"
    })
});

export type createAuthorType = z.infer<typeof createAuthor>;

export type updateBookType = Partial<createAuthorType>;