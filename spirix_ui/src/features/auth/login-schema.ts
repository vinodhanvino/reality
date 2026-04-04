import { z } from "zod";

export const loginSchema = z.object({
  user_name: z.string().min(2, "At least 2 characters").optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  confirm_password: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
