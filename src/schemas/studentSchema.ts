import {z} from "zod";

export const registerStudentSchema = z.object({
    id: z.number().optional(),
    name: z.string({
        required_error: "Name is required"
    }),
    lastName: z.string({
        required_error: "LastName is required"
    }),

    username: z.string({
        required_error: "Username is required"
    }),

    email: z.string({
        required_error: "Email is required"
    }),

    password: z.string({
        required_error: "Password is required"
    }),

    role: z.string({
        required_error: "Role is required"
    }),

    classRoom: z.string({
        required_error: "Classroom is required"
    })
});

export const loginStudentSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }),

    password: z.string({
        required_error: "Password is required"
    }),
})

export type createStudentRegisterType = z.infer<typeof registerStudentSchema>;
export type createStudentLoginType = z.infer<typeof loginStudentSchema>;
export type updateStudentType = Partial<z.infer<typeof registerStudentSchema>>;