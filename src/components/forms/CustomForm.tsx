"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "../dashboard/admin/AddProduct";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { ProductCategory } from "@/constants";
import ImageUpload from "../dashboard/admin/ImageUpload";
import { z } from "zod";
import { productFormSchema } from "./AddProductForm";
import { Textarea } from "../ui/textarea";

interface Props {
  name: keyof z.infer<typeof productFormSchema>;
  label?: string;
  custom?: (props: { field: any }) => React.ReactNode;
  control: Control<any>;
  fieldType: FormFieldType;
  placeholder?: string;
  selectItems?: string[];
}

const RenderField = ({ field, props }: { field: any; props: Props }) => {
  const { fieldType, placeholder, selectItems, custom } = props;
  switch (fieldType) {
    case FormFieldType.TEXT:
      return <Input {...field} placeholder={placeholder} />;
    case FormFieldType.NUMBER:
      return (
        <Input
          {...field}
          placeholder={placeholder}
          type="number"
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      );
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>

          <SelectContent className="bg-background border p-2">
            {selectItems?.map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case FormFieldType.TEXTAREA:
      return <Textarea placeholder={placeholder} {...field} />;
    // case FormFieldType.SKELETON:
    //   return <ImageUpload value={field.value} onChange={field.onChange} />;

    default:
      return null;
  }
};

const CustomForm = (props: Props) => {
  const { control, name, label, custom: a, fieldType } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-bold text-base">{label}</FormLabel>
          )}
          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
