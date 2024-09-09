import { ProductCategory } from "@/constants";
import { z } from "zod";
export const productFormSchema = z.object({
  productName: z.string().nonempty({ message: "Product name is required" }),
  productQuantity: z
    .number()
    .min(1, { message: "Product quantity must be greater than 1" }),
  productPrice: z.number().positive("Product price must be positive"),
  productCategory: z.enum(
    Object.keys(ProductCategory) as [keyof typeof ProductCategory]
  ),
  productCompany: z
    .string()
    .nonempty({ message: "Product company is required" }),
  minOrder: z
    .number()
    .min(1, { message: "Product order must be greater than 1" }),
  productImage: z.string().nonempty("Image is required"),
  productDescription: z
    .string()
    .nonempty({ message: "Product description is required" }),
});

export type productFormSchema = z.infer<typeof productFormSchema>;
