import { z } from "zod";

export const bookingSchema = z.object({
  customer_name: z
    .string()
    .min(2, "Customer name is required"),

  customer_phone: z
    .string()
    .min(7, "Valid phone number is required"),

  appointment_date: z
    .string()
    .min(1, "Appointment date is required"),

  appointment_time: z
    .string()
    .min(1, "Appointment time is required"),

  appointment_type: z
    .string()
    .optional(),

  notes: z
    .string()
    .optional(),
});