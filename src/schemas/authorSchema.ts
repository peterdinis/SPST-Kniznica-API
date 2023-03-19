import {z} from "zod";

export const createAuthor = z.object({
    name: z.string({
        required_error: "Name is required"
    }),

    lastName: z.string({
        required_error: "Last name is required"
    }),

    picture: z.string({
        required_error: "Picture is required"
    }),

    birthYear: z.number({
        required_error: "BirthYear is required and must be a number" 
    }),

    deathYear: z.number({
        required_error: "DeathYear is required and must be a number"
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