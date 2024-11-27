import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> =
  React.ComponentPropsWithRef<"input"> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    isPending?: boolean;
  };

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { control, name, label, isPending, disabled, ...rest } = props;
  return (
    <>
      {name !== "phone_number" ? (
        <FormField
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...rest}
                  className={cn(
                    fieldState.error && "border-red-500",
                    "dark:text-white",
                    "text-black"
                  )}
                  disabled={isPending || disabled}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-white">Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending || disabled}
                  placeholder="+977XXXXXXXXXX"
                  {...rest}
                  className={cn(
                    fieldState.error && "border-red-500",
                    "dark:text-white",
                    "text-black"
                  )}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Only allow digits and plus sign at start
                    value = value.replace(/[^\d+]/g, "");

                    // Ensure plus sign is only at the start
                    if (value.includes("+") && !value.startsWith("+")) {
                      value = value.replace(/\+/g, "");
                    }

                    // If starts with +, allow country code (max 4 digits) + 10 digits
                    if (value.startsWith("+")) {
                      const withoutPlus = value.slice(1);
                      if (withoutPlus.length > 13) {
                        // 4 digits country code + 10 digits number
                        value = "+" + withoutPlus.slice(0, 13);
                      }
                    } else {
                      // Without country code, limit to 10 digits
                      if (value.length > 10) {
                        value = value.slice(0, 10);
                      }
                    }

                    field.onChange(value);
                  }}
                  onKeyDown={(e) => {
                    // Allow only digits and plus sign
                    if (!/[\d+]/.test(e.key)) {
                      e.preventDefault();
                    }
                    // Prevent plus sign if not at start or if already exists
                    if (
                      e.key === "+" &&
                      (field.value.includes("+") || field.value.length > 0)
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
