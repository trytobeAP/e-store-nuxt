<template>
  <form
    class="newsletter-form"
    @submit.prevent="attemptSubmit"
    novalidate
  >
    <div class="input-wrapper">
      <input
        v-model="values.email"
        id="newsletter-email"
        type="email"
        name="newsletter-email"
        class="newsletter-input"
        placeholder="Give an email, get the newsletter."
        required
        aria-label="Email for newsletter"
        @blur="() => validateField('email')"
        :aria-invalid="!!errors.email"
        aria-describedby="newsletter-email-error"
      />
      <span
        v-if="errors.email"
        id="newsletter-email-error"
        class="validation-error-message"
      >
        {{ errors.email }}
      </span>
    </div>
    <button
      class="newsletter-submit"
      type="submit"
      aria-label="Subscribe to newsletter"
      :disabled="isSubmitting"
    >
      <Icon
        name="material-symbols:arrow-right-alt-rounded"
        size="24"
      />
    </button>
  </form>

  <UtilsNotificationCustom :message="statusMessage" />
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import useForm from "~/composables/forms/useForm";
import { addEmailToNewsletter } from "~/utils/newsletterStorage";

const { values, errors, isSubmitting, validateField, submitForm, resetForm } =
  useForm({
    email: "",
  });

const statusMessage = ref("");
let statusMessageTimeoutId: ReturnType<typeof setTimeout> | null = null;

const clearStatusMessageTimeout = () => {
  if (statusMessageTimeoutId) {
    clearTimeout(statusMessageTimeoutId);
    statusMessageTimeoutId = null;
  }
};

const performSubscription = (formValues: { email: string }) => {
  console.log(
    "Validation passed, attempting subscription for:",
    formValues.email
  );
  clearStatusMessageTimeout();

  const result = addEmailToNewsletter(formValues.email);

  switch (result) {
    case "success":
      statusMessage.value = `Success! ${formValues.email} added.`;
      resetForm();
      break;
    case "duplicate":
      statusMessage.value = `${formValues.email} is already subscribed!`;
      break;
    case "error":
      statusMessage.value = "Could not save email. Please try again later.";
      break;
  }

  if (statusMessage.value) {
    statusMessageTimeoutId = setTimeout(() => {
      statusMessage.value = "";
      statusMessageTimeoutId = null;
    }, 3000);
  }
};

const attemptSubmit = () => {
  submitForm(performSubscription);
};

onUnmounted(() => {
  clearStatusMessageTimeout();
});
</script>

<style scoped lang="scss">
.newsletter-form {
  display: flex;
  align-items: center;
  position: relative;
  max-width: 400px;
  min-width: 300px;
  width: 100%;
  border-bottom: 1px solid theme-color(link-color-light);
  overflow: visible;
}

.input-wrapper {
  flex-grow: 1;
  position: relative;
  padding-bottom: 10px;
}

.newsletter-input {
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  width: 100%;
  display: block;

  border: none;
  outline: none;
  background-color: theme-color(main-color);
  color: theme-color(opposite-color);

  &::placeholder {
    font-family: "DM Sans", sans-serif;
    color: theme-color(gray-dark-color);
    opacity: 0.8;
  }

  &[aria-invalid="true"] {
    border-color: theme-color(error-color);
    box-shadow: inset 0 -2px 0 0 theme-color(error-color);
  }
}

.validation-error-message {
  position: absolute;
  bottom: -16px;
  left: 0;
  color: theme-color(error-color);
  font-size: 0.8rem;
  white-space: nowrap;
}

.newsletter-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-bottom: 10px;
  border: none;
  background-color: transparent;
  color: theme-color(link-color-light);
  cursor: pointer;
  flex-shrink: 0;

  &:active {
    filter: brightness(80%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
