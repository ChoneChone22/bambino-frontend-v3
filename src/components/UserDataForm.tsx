"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MenuItem } from "@/types/api/menuItem";
import Image from "next/image";

const normalizePhone = (phone: string) => phone.replace(/[\s\-()]/g, "");

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Please enter a valid email address",
      }),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((val) => (val ? normalizePhone(val) : val))
      .refine((val) => !val || /^\+?[0-9]{8,15}$/.test(val), {
        message: "Phone must be 8-15 digits",
      }),
    gender: z.string().min(1, { message: "Please select your gender" }),
    age: z
      .string()
      .min(1, { message: "Age is required" })
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 120,
        {
          message: "Please enter a valid age between 1 and 120",
        }
      ),
    cardNumber: z
      .string()
      .trim()
      .min(1, { message: "Card Number is required" }),
    menuItems: z
      .array(z.string())
      .min(1, "Please select at least 1 menu item."),
  })
  .refine((data) => data.email || data.phone, {
    message: "Please provide either an email or phone number",
    path: ["phone"],
  });

type FormValues = z.infer<typeof formSchema>;

// Form state always has all keys (from defaultValues); assert resolver for compatibility
type FormValuesWithDefaults = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  cardNumber: string;
  menuItems: string[];
};

export default function UserDataForm() {
  const form = useForm<FormValuesWithDefaults>({
    resolver: zodResolver(formSchema) as Resolver<FormValuesWithDefaults>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      age: "",
      cardNumber: "",
      menuItems: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [availableMenuItems, setAvailableMenuItems] = useState<MenuItem[]>([]);

  const onSubmit = (data: FormValuesWithDefaults) => {
    toast.success("Your information has been submitted successfully.");
    form.reset();
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products?limit=100
        }`
      );
      const data = await response.json();
      setAvailableMenuItems(data.data);
      setLoading(false);
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="form-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold heading2 mb-2">
            Member Information
          </h1>
          <p className="sub_heading2">Please fill in your details below</p>
        </div>

        <form
          id="user-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            {/* Full Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-info-form-name">
                    Full Name <span className="text-destructive">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <input
                      {...field}
                      type="name"
                      id="name"
                      placeholder="Name"
                      className="w-full px-0 py-3 heading2 bg-transparent border-b primary_border placeholder:heading focus:outline-none focus:primary_border transition-colors"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-info-form-email">
                    Email Address <span className="text-destructive">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full px-0 py-3 heading2 bg-transparent border-b primary_border placeholder:heading focus:outline-none focus:primary_border transition-colors"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-info-form-phone">
                    Phone Number <span className="text-destructive">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <input
                      {...field}
                      type="phone"
                      id="phone"
                      placeholder="Phone"
                      className="w-full px-0 py-3 heading2 bg-transparent border-b primary_border placeholder:heading focus:outline-none focus:primary_border transition-colors"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Gender + Age (2 columns) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Gender */}
              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-info-form-gender">
                      Gender <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="user-info-form-gender"
                        className="border border-primary"
                        aria-invalid={fieldState.invalid}
                      >
                        <div className="flex items-center gap-2">
                          <SelectValue placeholder="Select" />
                        </div>
                      </SelectTrigger>

                      <SelectContent className="border border_border">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Age */}
              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-info-form-age">Age</FieldLabel>

                    <div className="relative">
                      <Input
                        id="user-info-form-age"
                        type="number"
                        placeholder="Age"
                        min={1}
                        max={120}
                        className="border border-primary"
                        aria-invalid={fieldState.invalid}
                        // RHF likes string values sometimes; keep consistent with your schema.
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        autoComplete="off"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="menuItems"
              control={form.control}
              render={({ field, fieldState }) => {
                const value: string[] = Array.isArray(field.value)
                  ? field.value
                  : [];

                const toggleItem = (name: string, checked: boolean) => {
                  if (checked) {
                    field.onChange([...new Set([...(value ?? []), name])]);
                  } else {
                    field.onChange((value ?? []).filter((v) => v !== name));
                  }
                };

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <div
                      className={`
            grid grid-cols-1 sm:grid-cols-2
            gap-3 p-3 sm:p-4
            border rounded-lg
            bg-transparent ${fieldState.invalid ? "border-destructive" : "border-border"}`}
          
                    >
                      {availableMenuItems.map((item) => {
                        const checked = value.includes(item.name);

                        return (
                          <label
                            key={item.id}
                            className="
        flex items-start gap-3
        p-3
        rounded-lg border border-border
        bg-white hover:bg-accent/50
        transition-colors cursor-pointer
      "
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(v) =>
                                toggleItem(item.name, Boolean(v))
                              }
                              className="mt-1 shrink-0"
                            />

                            <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                              {item.imageUrls.length > 0 && (
                                <Image
                                  src={item.imageUrls[0]}
                                  alt={item.name}
                                  width={96}
                                  height={96}
                                  className="h-24 w-24 rounded-md object-cover"
                                />
                              )}

                              <div className="text-sm font-medium leading-snug wrap-break-word line-clamp-2">
                                {item.name}
                              </div>

                              <div className="text-sm text-muted-foreground leading-snug wrap-break-word line-clamp-2">
                                {item.thaiName}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Card Nmber */}
            <Controller
              name="cardNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-info-form-cardNumber">
                    Card Number (Eg. ID00001) หมายเลขบัตร (เช่น ID00001){" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>

                  <div className="relative">
                    <input
                      {...field}
                      type="text"
                      id="user-info-form-cardNumber"
                      placeholder="Card Number"
                      className="w-full px-0 py-3 heading2 bg-transparent border-b primary_border placeholder:heading focus:outline-none focus:primary_border transition-colors"
                      aria-invalid={fieldState.invalid}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <button
            type="submit"
            className="inline-block mt-10 w-full px-8 py-3 primary_btn text-sm rounded-3xl tracking-wider uppercase transition-all duration-300"
          >
            Submit Information
          </button>
        </form>
      </div>
    </div>
  );
}
