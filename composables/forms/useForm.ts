import { reactive, ref, computed, nextTick } from "vue";

interface ValidationRule {
  validate: (value: string | null, allValues: FormValues) => true | string;
}
export interface FormValues {
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
    initialValues ? (Object.keys(initialValues) as (keyof FormValues)[]) : [],
  );

  const defaultValues: FormValues = {
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
  };

  const values = reactive<FormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const errors = reactive<FormErrors>({});
  const isSubmitting = ref(false);

  const setFieldValue = <K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) => {
    values[key] = value;
  };

  const passwordMinLength = 3;
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
        if (value.length < passwordMinLength)
          return `Password must be at least ${passwordMinLength} characters.`;
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
        } catch {
          return "Please enter a valid website URL.";
        }
      },
    },
    couponCode: { validate: (_value) => true },
    companyName: { validate: (_value) => true },
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
    Object.values(errors).some((error) => error != null),
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
    const resetState = { ...defaultValues, ...initialValues };

    for (const fieldName of activeFieldKeys) {
      setFieldValue(fieldName, resetState[fieldName]);
      errors[fieldName] = null;
    }
    isSubmitting.value = false;
  };

  const submitForm = async (
    onSubmit: (formValues: FormValues) => Promise<void> | void,
  ) => {
    if (isSubmitting.value) return;

    isSubmitting.value = true;

    await nextTick();

    try {
      const isFormValid = validateForm();

      if (isFormValid) {
        const relevantValues = {} as Partial<FormValues>;
        const setRelevantValue = <K extends keyof FormValues>(
          key: K,
          value: FormValues[K],
        ) => {
          relevantValues[key] = value;
        };
        activeFieldKeys.forEach((key) => {
          setRelevantValue(key, values[key]);
        });
        await onSubmit(relevantValues as FormValues);
      } else {
        console.log("Form validation failed. Errors:", errors);
      }
    } catch (submitError) {
      console.error("Form submission callback failed:", submitError);
    } finally {
      isSubmitting.value = false;
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
