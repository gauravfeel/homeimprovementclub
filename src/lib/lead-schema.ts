import { z } from "zod";

export const BEST_CONTACT_TIMES = ["Morning", "Afternoon", "Evening"] as const;

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

const firstName = z
  .string()
  .trim()
  .min(1, "Enter your first name")
  .max(100, "First name is too long");

const lastName = z.string().trim().max(100, "Last name is too long").default("");

const email = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .email("Enter a valid email")
  .max(255);

const optionalPhone = z
  .string()
  .trim()
  .max(20)
  .refine((value) => {
    if (!value) return true;
    const digits = phoneDigits(value);
    return digits.length >= 10 && digits.length <= 15;
  }, "Enter a valid phone number")
  .default("");

const requiredPhone = z
  .string()
  .trim()
  .min(1, "Enter your phone")
  .refine((value) => {
    const digits = phoneDigits(value);
    return digits.length >= 10 && digits.length <= 15;
  }, "Enter a valid phone number");

export const contactLeadSchema = z.object({
  firstName,
  lastName,
  email,
  phone: requiredPhone,
  propertyAddress: z
    .string()
    .trim()
    .min(1, "Enter the property address")
    .max(200, "Address is too long"),
  city: z.string().trim().max(100).default(""),
  bestContactTime: z
    .string()
    .min(1, "Select a time")
    .refine(
      (value) =>
        BEST_CONTACT_TIMES.includes(value as (typeof BEST_CONTACT_TIMES)[number]),
      "Select a time",
    ),
  projectType: z.string().trim().max(120).default(""),
  budget: z.preprocess((value) => {
    if (value === "" || value === undefined || value === null) return undefined;
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : value;
  }, z.number({ required_error: "Enter a budget amount", invalid_type_error: "Enter a budget amount" }).gt(10000, "Budget must be greater than $10,000 CAD")),
  message: z.string().trim().max(1000, "Message is too long").default(""),
  company: z.string().max(80).default(""),
});

export const popupLeadSchema = z.object({
  firstName,
  lastName,
  email,
  phone: optionalPhone,
  projectType: z.string().trim().max(120).default(""),
  budget: z.string().trim().max(40).default(""),
  company: z.string().max(80).default(""),
});

export type ContactLeadValues = z.input<typeof contactLeadSchema>;
export type PopupLeadValues = z.input<typeof popupLeadSchema>;
