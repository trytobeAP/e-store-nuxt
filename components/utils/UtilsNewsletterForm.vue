<template>
  <form
    class="newsletter-form"
    novalidate
    :style="formStyle"
    @submit.prevent="attemptSubmit"
  >
    <div class="input-wrapper">
      <input
        id="newsletter-email"
        v-model="values.email"
        type="email"
        name="newsletter-email"
        class="newsletter-input"
        placeholder="Give an email, get the newsletter."
        required
        aria-label="Email for newsletter"
        :aria-invalid="!!errors.email"
        aria-describedby="newsletter-email-error"
        @blur="() => validateField('email')"
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
      :disabled="isSubmitting || !isAgreementAccepted"
    >
      <Icon
        name="local-custom:arrow-right"
        size="7"
      />
    </button>
  </form>

  <UtilsNotificationCustom
    :message="statusMessage"
    :type="notificationType"
    mode="fixed"
  />
</template>

<script setup lang="ts">
import { ref, onUnmounted, computed } from "vue";
import useForm from "~/composables/forms/useForm";
import { addEmailToNewsletter } from "~/utils/newsletterStorage";
import { NotificationTypeEnum } from "~/types/notification";

const { values, errors, isSubmitting, validateField, submitForm, resetForm } =
  useForm({
    email: "",
  });

interface Props {
  minWidth?: string;
  maxWidth?: string;
  isAgreementAccepted?: boolean;
}

const props = defineProps<Props>();

const formStyle = computed(() => {
  return {
    minWidth: props.minWidth ?? "282px",
    maxWidth: props.maxWidth,
  };
});

const statusMessage = ref("");
const notificationType = ref<NotificationTypeEnum>(NotificationTypeEnum.Info);
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
    formValues.email,
  );
  clearStatusMessageTimeout();

  const result = addEmailToNewsletter(formValues.email);

  switch (result) {
    case "success":
      statusMessage.value = `Success! ${formValues.email} added.`;
      notificationType.value = NotificationTypeEnum.Success;
      resetForm();
      break;
    case "duplicate":
      statusMessage.value = `${formValues.email} is already subscribed!`;
      notificationType.value = NotificationTypeEnum.Error;
      break;
    case "error":
      statusMessage.value = "Could not save email. Please try again later.";
      notificationType.value = NotificationTypeEnum.Error;
      break;
  }

  if (statusMessage.value) {
    statusMessageTimeoutId = setTimeout(() => {
      statusMessage.value = "";
      notificationType.value = NotificationTypeEnum.Info;
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
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: visible;
  border-bottom: 1px solid theme-color(link-color-light);
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
  padding-bottom: 10px;
}

.newsletter-input {
  display: block;
  width: 100%;
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  color: theme-color(opposite-color);
  outline: none;
  background-color: theme-color(main-color);
  border: none;

  &::placeholder {
    font-family: "DM Sans", sans-serif;
    color: theme-color(gray-dark-color);
    opacity: 0.8;
  }
}

.validation-error-message {
  position: absolute;
  bottom: -30px;
  left: 0;
  font-size: 0.8rem;
  color: theme-color(error-color);
  white-space: nowrap;
}

.newsletter-submit {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  padding-left: 10px;
  color: theme-color(link-color-light);
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:active {
    filter: brightness(80%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
