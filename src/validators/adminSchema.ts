import {z} from "zod";

export const createAdminSchema = z.object({
    name: z.string({
        required_error: "Name must be defined"
    }),

    lastName: z.string({
        required_error: "Last name must be defined"
    }),

    username: z.string({
        required_error: "Username must be defined"
    }),

    email: z.string({
        required_error: "Email must be defined"
    }),

    password: z.string({
        required_error: "Password must be defined"
    })
});

export const loginAdminSchema = z.object({
    email: z.string({
        required_error: "Email must be defined"
    }),

    password: z.string({
        required_error: "Password must be defined"
    })
});

export type createAdminRegisterType = z.infer<typeof createAdminSchema>;
export type createAdminLoginType = z.infer<typeof loginAdminSchema>;