import { z } from "zod";

export type TCabin = {
  id: number;
  name: string;
  description: string;
  discount: number;
  maxCapacity: number;
  regularPrice: number;
  image: string;
  createdAt: string;
};

export const createCabinSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "cabin name is required")
      .min(3, "cabin name must contain at least 3 characters"),
    maxCapacity: z
      .number({ invalid_type_error: "max capacity is required" })
      .positive("max capacity should be at least 1"),
    regularPrice: z
      .number({ invalid_type_error: "regular price is required" })
      .positive("regular price should be at least 1"),
    discount: z
      .number({ invalid_type_error: "discount should be at least 0" })
      .min(0, "discount should be at least 0"),
    description: z
      .string()
      .trim()
      .min(1, "description is required")
      .min(3, "description must contain at least 3 characters"),
    image: z
      .custom<FileList | string>()
      .transform((files) => (files instanceof FileList ? files[0] : files)),
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "discount should be less than regular price",
    path: ["discount"],
  });

export type TCabinFormData = z.infer<typeof createCabinSchema>;
