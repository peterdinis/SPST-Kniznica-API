import {z} from "zod";

export const createNotificationSchema = z.object({
    text: z.string({
        required_error: "Text for notification must be defined"
    }),

    content: z.string({
        required_error: "Content for notification must be defined"
    }),

    username: z.string({
        required_error: "Username for student or teacher or admin must be defined"
    })
});

export type createNotificationType = z.infer<typeof createNotificationSchema>;