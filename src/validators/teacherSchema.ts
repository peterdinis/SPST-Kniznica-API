import {z} from "zod";

export const registerTeacherSchema = z.object({
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

});

export const loginTeacherSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }),

    password: z.string({
        required_error: "Password is required"
    }),
})

export type createTeacherRegisterType = z.infer<typeof registerTeacherSchema>;
export type createTeacherLoginType = z.infer<typeof loginTeacherSchema>;
export type updateStudentType = Partial<z.infer<typeof registerTeacherSchema>>;