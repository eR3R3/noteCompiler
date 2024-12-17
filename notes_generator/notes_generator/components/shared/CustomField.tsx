import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";


// @ts-ignore
export const CustomField = ({control, render, name, formLabel, className}) => {
  return (
      <FormField
          control={control}
          name={name}
          render={({field}) => (
              <FormItem className={className}>
                {formLabel && <FormLabel>{formLabel}</FormLabel>}
                <FormControl>{render({field})}</FormControl>
                <FormMessage/>
              </FormItem>
          )}
      />
  );
};