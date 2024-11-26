import { z } from "zod";

const EMAIL_SCHEMA = z
  .string()
  .min(1, "Email Address is required.")
  .email("Invalid Email Address.");

export const loginSchema = z.object({
  login: z.string().min(1, "Login is required."),
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z.object({
  email: EMAIL_SCHEMA,
  username: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .min(4, "Name must be at least 4 characters.")
    .max(24, "Maximum length of Name is 24 characters."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
  phone_number: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: "Invalid phone number format.",
    }), // This regex ensures an optional valid phone number format.
});

export const resendSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const resetPasswordSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match.",
    path: ["confirmPassword"],
  });

export const twoFactorSchema = z.object({
  code: z
    .string()
    .regex(/^[0-9]+$/, "Code must be a number.")
    .length(6, "Code must be 6 digits long."),
});

export const profileSchema = z
  .object({
    username: z.optional(
      z
        .string()
        .min(1, {
          message: "Name is required.",
        })
        .min(4, "Name must be at least 4 characters.")
        .max(24, "Maximum length of Name is 24 characters.")
    ),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(6, "Password must be at least 6 characters.")
    ),
    newPassword: z.optional(
      z.string().min(6, "New Password must be at least 6 characters.")
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: "Password is required.",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "New Password is required.",
      path: ["newPassword"],
    }
  );




  // Product Schema


  const MAX_FILE_SIZE = 5000000;

  const imageSchema = z
    .union([
      z.instanceof(File).refine(
        (file) => file.type.startsWith("image/"),
        "Invalid file type. Only image files are allowed."
      ).refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "File size should be less than 5MB."
      ),
      z.string(), 
    ]);
  

  
    export const numberSchema = ({
      required = false, // Determines if the field is required
      required_error = "This field is required", // Custom error message for required fields
    } = {}) => {
      const error = required ? { required_error } : {}; // Conditionally apply the required error
      const schema = z.number(error);
    
      let finalSchema = z.preprocess((value) => {
        if (typeof value === "string") {
          const parsed = parseFloat(value);
          return isNaN(parsed) ? undefined : parsed;
        }
        return value;
      }, schema);
    
      // If the field is not required, make it optional
      if (!required) {
        return finalSchema.optional();
      }
    
      return finalSchema;
    };


    
    export const productSchema = z.object({
      name: z.string().min(1, "Name is required"),
      image: imageSchema.optional(),
      imageUrl: z.string().url("Please enter a valid URL").optional(),
      description: z.string().optional(),
    
      taxRate: z.string().optional(),
    
      costPrice: numberSchema({
        required: true, // Cost price is required
        required_error: "Cost price is required",
      }),
    
      quantityInStock: numberSchema({
        required: true, // Quantity in stock is required
        required_error: "Quantity is required",
      }),
    
      validity: z.string().optional(),
    
      discount: numberSchema({
        required: false, // Discount is optional
      }),
    
      salePrice: numberSchema({
        required: true, // Sale price is required
        required_error: "Sale price is required",
      }),
    
      margin: z.string().optional(),
    
      category: z.string().refine((val) => val !== "", {
        message: "Please select a valid category",
      }),
    
      tax: z
  .string()
  .optional(),

    
      suppliers: z
        .array(
          z.object({
            id: z.string().min(1, { message: "Supplier is required" }),
            supplier: z.string().min(1, { message: "Supplier is required" }),
          })
        )
        .nonempty({ message: "At least one supplier is required" }),
    })
    .refine(
      (data) => data.image || data.imageUrl,
      {
        message: "Either an image or image URL is required",
        path: ['imageUrl'], // Path to show the error
      }
    )
    .refine(
      (data) => data.tax || data.taxRate,
      {
        message: "Either a tax or tax rate is required",
        path: ['taxRate'], // Path to show the error
      }
    );



  export const taxSchema = z.object({
      name: z.string().min(1, "Tax name is required"),
      rate: numberSchema({
        required: true, 
        required_error: "Rate  is required",
      }),
      description: z.string().optional(),
    });
    
  
const PHONE_SCHEMA = z
  .string()
  .regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits.' })
  .trim()

export const supplierSchema = z.object({
    suppliername: z.string().min(1,"suppliername is required"),
    email: EMAIL_SCHEMA,
    phone: PHONE_SCHEMA.optional(),
    address: z.string().optional(),
  })
  
