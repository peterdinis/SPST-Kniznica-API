import { z } from "zod";

export const createBookingSchema = z.object({
  from: z.string({
    required_error: "From is required",
  }),

  to: z.string({
    required_error: "To is required",
  }),

  username: z.string({
    required_error: "Username is required",
  }),

  bookId: z.number({
    required_error: "Book id  must be defined",
  }),
});

export const returnBookingSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),

  bookId: z.number({
    required_error: "Book id  must be defined",
  }),
});

export type createBookingType = z.infer<typeof createBookingSchema>;
export type returnBookingType = z.infer<typeof returnBookingSchema>;
