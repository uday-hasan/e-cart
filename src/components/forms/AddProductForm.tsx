"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { FormFieldType } from "../dashboard/admin/AddProduct";
import { ProductCategory } from "@/constants";
import Image from "next/image";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { ProductInterface } from "@/lib/database/db_model/product.models";
import { productFormSchema } from "@/lib/zod-schema/productFormSchema";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface ImageInfo {
  asset_folder: string;
  bytes: number;
  public_id: string;
  width: number;
  height: number;
  format: "jpg" | "png" | "jpeg";
}

const AddProductForm = ({
  type,
  title,
  productId,
}: {
  type: "add" | "update";
  title: string;
  productId?: string;
}) => {
  const router = useRouter();
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [initialValue, setInitialValue] = useState({
    productName: "",
    productCategory: "Motor" as keyof typeof ProductCategory,
    productQuantity: 1,
    productPrice: 1,
    productCompany: "",
    minOrder: 1,
    productImage: "",
    productDescription: "",
  });

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { ...initialValue },
  });

  const { reset } = form;

  useEffect(() => {
    if (type === "update") {
      (async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `http://localhost:3000/api/products/get-product/?product-id=${productId}`
          );
          const { products } = await res.json();
          if (products) {
            setProduct(products);
            const updatedValues = {
              productName: products.productName,
              productCategory:
                products.productCategory as keyof typeof ProductCategory,
              productQuantity: products.productQuantity,
              productPrice: products.productPrice,
              productCompany: products.productCompany,
              minOrder: products.minOrder,
              productImage: products.productImage,
              productDescription: products.productDescription,
            };
            setInitialValue(updatedValues);
            reset(updatedValues); // Reset the form with the new values
            setImage({
              public_id: products.public_id,
              asset_folder: products.asset_folder || "",
              bytes: products.bytes || 0,
              width: products.width || 0,
              height: products.height || 0,
              format: products.format || "jpg",
            });
          }
        } catch (error) {
          console.log({ e: error });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [type, productId, reset]);

  async function onSubmitHandler(values: z.infer<typeof productFormSchema>) {
    setLoading(true);
    try {
      if (type === "update") {
        const res = await fetch(
          `/api/products/update-product?product-id=${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ values }),
          }
        );
        const data = await res.json();
        if (data.success && !loading) {
          router.push(`/dashboard/admin/manage-product/update`);
          toast.success(data.message, {
            autoClose: 7000,
          });
        } else {
          toast.error(data.message, {
            autoClose: 7000,
          });
        }
        return;
      }
      const res = await fetch(
        `http://localhost:3000/api/products/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (data.success) {
        form.reset();
        setImage(null);
        toast.success(data.message, {
          autoClose: 7000,
        });
      } else {
        toast.error(data.message, {
          autoClose: 7000,
        });
      }
    } catch (error) {
      toast.success("Something went wrong", {
        autoClose: 7000,
      });
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold my-4">{title}</h1>
      {loading ? (
        <h1>Loading... </h1>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-4 overflow-auto"
          >
            <CustomForm
              name="productName"
              label="Product Name"
              control={form.control}
              placeholder="Product Name"
              fieldType={FormFieldType.TEXT}
            />
            <CustomForm
              name="productCategory"
              control={form.control}
              label="Select Product Category"
              fieldType={FormFieldType.SELECT}
              selectItems={Object.keys(ProductCategory)}
            />
            <CustomForm
              name="productPrice"
              label="Product Price"
              placeholder="Product Price"
              control={form.control}
              fieldType={FormFieldType.NUMBER}
            />
            <CustomForm
              name="productQuantity"
              label="Product Quantity"
              placeholder="Product Quantity"
              control={form.control}
              fieldType={FormFieldType.NUMBER}
            />
            <CustomForm
              name="minOrder"
              label="Minimum Order"
              placeholder="Minimum Order"
              control={form.control}
              fieldType={FormFieldType.NUMBER}
            />
            <CustomForm
              name="productCompany"
              label="Product Company"
              placeholder="Product Company"
              control={form.control}
              fieldType={FormFieldType.TEXT}
            />
            <CustomForm
              name="productDescription"
              label="Product Description"
              placeholder="Product Description"
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
            />
            <FormField
              name="productImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CldUploadWidget
                      uploadPreset="make-your-drone"
                      options={{ multiple: false }}
                      onSuccess={(results: any) => {
                        if (results.event === "success") {
                          console.log({ results: results.info });
                          if (results.info.bytes > 1000000) {
                            toast.error("Image must be less than or equal 1MB");
                            return;
                          }
                          const validFormats = ["jpg", "png", "jpeg"];
                          if (!validFormats.includes(results.info.format)) {
                            toast.error(
                              "Format must be 'jpg', 'png', or 'jpeg'"
                            );
                            return;
                          }
                          setImage(results?.info);
                          field.onChange(results?.info?.public_id);
                        }
                      }}
                      onError={(error) => {
                        console.log(error);
                      }}
                      onQueuesEnd={(result, { widget }) => {
                        if (image) {
                          widget.close();
                        }
                      }}
                    >
                      {({ open }) => (
                        <>
                          {image?.public_id || product?.productImage ? (
                            <>
                              <CldImage
                                src={
                                  image?.public_id! || product?.productImage!
                                }
                                alt="Image"
                                width={400}
                                height={400}
                              />
                              <Button
                                variant={"outline"}
                                onClick={() => {
                                  setImage(null);
                                  setProduct((prev) => {
                                    if (!prev) return null;
                                    return {
                                      ...prev,
                                      _id: prev._id,
                                      productImage: null,
                                    };
                                  });
                                }}
                              >
                                Click to remove image
                              </Button>
                            </>
                          ) : (
                            <div
                              className="border border-primary rounded-md py-4 cursor-pointer flex flex-col items-center justify-center gap-2"
                              onClick={() => open()}
                            >
                              <p className="text-xl font-medium ">
                                Click to upload
                              </p>
                              <Image
                                src={"/assets/icons/upload.svg"}
                                alt="Upload Icon"
                                width={30}
                                height={30}
                                className="invert-[.70]"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </CldUploadWidget>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting" : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AddProductForm;
