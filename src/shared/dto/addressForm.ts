import { z } from "zod";

export const addressSchema = z.object({
  is_active: z.boolean().optional(),
  type: z.string().min(1, { message: "type is required" }),
  address_type: z.string().min(1, { message: "Address type is required" }),
  address_line_1: z.string().min(1, { message: "Address line 1 is required" }),
  address_line_2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postal_code: z
    .string()
    .regex(/^\d{6}$/, { message: "Postal code must be 6 digits" }),
  country_code: z
    .string()
    .length(2, { message: "Country code must be 2 characters" }),
});
