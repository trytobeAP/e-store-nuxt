<template>
  <form
    class="reset-password-form"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <div class="reset-password-form__field">
      <BaseInput
        v-model="values.email"
        type="email"
        variant="line"
        placeholder="Email"
        @blur="validateField('email')"
      />
      <span
        v-if="errors.email"
        class="reset-password-form__error"
      >
        {{ errors.email }}
      </span>
    </div>

    <BaseButton
      variant="secondary"
      class="reset-password-form__submit-button"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? "SENDING..." : "RESET PASSWORD" }}
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import useForm from "~/composables/forms/useForm";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const { values, errors, isSubmitting, validateField, submitForm, resetForm } =
  useForm({
    email: "",
  });

const handleSubmit = () => {
  submitForm(() => {
    emit("success");
    resetForm();
  });
};
</script>

<style scoped lang="scss">
.reset-password-form__field {
  position: relative;
  margin-bottom: 64px;

  @media (max-width: $breakpoints-m) {
    max-width: 400px;
    margin-right: auto;
    margin-left: auto;
  }
}

.reset-password-form__error {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  font-size: 14px;
  color: theme-color("error-color");
  text-align: left;
}

.reset-password-form__submit-button {
  width: 100%;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: $fw-bold;
}
</style>
