import { reactive, ref, computed } from "vue";

interface ValidationRule {
  validate: (value: any, allValues: FormValues) => true | string;
}
interface FormValues {
  name: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  subject: string;
  message: string;
  website: string;
  couponCode: string;
  companyName: string;
  country: string | null;
  streetAddress: string;
  postcode: string;
  city: string;
}
type FormErrors = { [K in keyof FormValues]?: string | null };
type FormRules = { [K in keyof Partial<FormValues>]: ValidationRule };

export default function useForm(initialValues?: Partial<FormValues>) {
  const activeFieldKeys = new Set<keyof FormValues>(
    initialValues ? (Object.keys(initialValues) as (keyof FormValues)[]) : []
  );

  const values = reactive<FormValues>({
    name: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    subject: "",
    message: "",
    website: "",
    couponCode: "",
    companyName: "",
    country: null,
    streetAddress: "",
    postcode: "",
    city: "",
  });
  if (initialValues) {
    for (const key of activeFieldKeys) {
      if (initialValues[key] !== undefined) {
        values[key] = initialValues[key] as any;
      }
    }
  }

  const errors = reactive<FormErrors>({});
  const isSubmitting = ref(false);

  const rules: FormRules = {
    name: { validate: (value) => (!value ? "Name is required." : true) },
    fullName: {
      validate: (value) => (!value ? "Full Name is required." : true),
    },
    email: {
      validate: (value) => {
        if (!value) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address.";
        return true;
      },
    },
    phone: {
      validate: (value) => {
        if (!value) return "Phone number is required.";
        if (String(value).replace(/\D/g, "").length < 10)
          return "Please enter a valid phone number.";
        return true;
      },
    },
    password: {
      validate: (value) => {
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        return true;
      },
    },
    confirmPassword: {
      validate: (value, allValues) => {
        if (!value) return "Please confirm your password.";
        if (value !== allValues.password) return "Passwords do not match.";
        return true;
      },
    },
    subject: { validate: (value) => (!value ? "Subject is required." : true) },
    message: { validate: (value) => (!value ? "Message is required." : true) },
    website: {
      validate: (value) => {
        if (!value) return true;
        try {
          new URL(value);
          return true;
        } catch (_) {
          return "Please enter a valid website URL.";
        }
      },
    },
    couponCode: { validate: (value) => true },
    companyName: { validate: (value) => true },
    country: {
      validate: (value) => (!value ? "Please select a country." : true),
    },
    streetAddress: {
      validate: (value) => (!value ? "Street address is required." : true),
    },
    postcode: {
      validate: (value) => {
        if (!value) return "Postcode / ZIP is required.";
        return true;
      },
    },
    city: { validate: (value) => (!value ? "Town / City is required." : true) },
  };

  const hasErrors = computed(() =>
    Object.values(errors).some((error) => error != null)
  );
  const isValid = computed(() => !hasErrors.value);

  const validateField = <K extends keyof FormValues>(fieldName: K): boolean => {
    if (!activeFieldKeys.has(fieldName)) {
      errors[fieldName] = null;
      return true;
    }

    const rule = rules[fieldName];
    if (rule) {
      const result = rule.validate(values[fieldName], values);
      if (result === true) {
        errors[fieldName] = null;
        return true;
      } else {
        errors[fieldName] = result;
        return false;
      }
    }
    errors[fieldName] = null;
    return true;
  };

  const validateForm = (): boolean => {
    let isFormValid = true;
    for (const fieldName of activeFieldKeys) {
      if (!validateField(fieldName)) {
        isFormValid = false;
      }
    }
    return isFormValid;
  };

  const resetForm = () => {
    for (const fieldName of activeFieldKeys) {
      const defaultValue =
        initialValues?.[fieldName] ??
        (typeof values[fieldName] === "string" ? "" : null);
      values[fieldName] = defaultValue as any;
      errors[fieldName] = null;
    }
    isSubmitting.value = false;
  };

  const submitForm = async (
    onSubmit: (formValues: FormValues) => Promise<void> | void
  ) => {
    if (isSubmitting.value) return;
    const isFormValid = validateForm();

    if (isFormValid) {
      isSubmitting.value = true;
      try {
        const relevantValues = {} as Partial<FormValues>;
        activeFieldKeys.forEach((key) => (relevantValues[key] = values[key]));
        await onSubmit(relevantValues as FormValues);
      } catch (submitError) {
        console.error("Form submission callback failed:", submitError);
      } finally {
        isSubmitting.value = false;
      }
    } else {
      console.log("Form validation failed. Errors:", errors);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    hasErrors,
    validateField,
    validateForm,
    submitForm,
    resetForm,
  };
}
