<template>
  <form
    class="newsletter-form"
    @submit.prevent="handleSubmit"
  >
    <input
      v-model="email"
      type="email"
      class="newsletter-input"
      id="newsletter-email"
      name="newsletter-email"
      placeholder="Give an email, get the newsletter."
      required
      aria-label="Email for newsletter"
    />
    <button
      class="newsletter-submit"
      type="submit"
      aria-label="Subscribe to newsletter"
    >
      <Icon
        name="material-symbols:arrow-right-alt-rounded"
        size="24"
      />
    </button>
  </form>
  <Transition name="fade">
    <div
      v-if="message"
      class="custom-notification"
      role="alert"
    >
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const message = ref("");

let messageTimeoutId: ReturnType<typeof setTimeout> | null = null;

const clearMessageTimeout = () => {
  if (messageTimeoutId) {
    clearTimeout(messageTimeoutId);
    messageTimeoutId = null;
  }
};

const handleSubmit = () => {
  message.value = "";
  const trimmedEmail = email.value.trim();
  let newMessage = "";

  if (!trimmedEmail) {
    newMessage = "Please enter a valid email address.";
    return;
  }

  try {
    const storageKey = "newsletterEmailsArray";
    let emails: string[] = [];

    const existingEmailsJson = localStorage.getItem(storageKey);
    if (existingEmailsJson) {
      try {
        emails = JSON.parse(existingEmailsJson);

        if (!Array.isArray(emails)) {
          console.warn("Stored emails data was not an array, resetting.");
          emails = [];
        }
      } catch (parseError) {
        console.error("Error parsing stored emails:", parseError);
        emails = [];
      }
    }

    if (
      emails.some(
        (storedEmail) =>
          storedEmail.toLowerCase() === trimmedEmail.toLowerCase()
      )
    ) {
      newMessage = `${trimmedEmail} is already subscribed!`;
      email.value = "";
      return;
    }

    emails.push(trimmedEmail);

    localStorage.setItem(storageKey, JSON.stringify(emails));

    newMessage = `Success! ${trimmedEmail} added to the newsletter list.`;
    console.log("Stored Emails:", emails);
    email.value = "";
  } catch (storageError) {
    console.error("Error interacting with localStorage:", storageError);
    newMessage = "Could not save email. Please try again later.";
  }

  message.value = newMessage;

  if (message.value) {
    messageTimeoutId = setTimeout(() => {
      message.value = "";
      messageTimeoutId = null;
    }, 3000);
  }
};

onUnmounted(() => {
  clearMessageTimeout();
});
</script>

<style scoped lang="scss">
.newsletter-form {
  display: flex;
  align-items: center;
  max-width: 400px;
  min-width: 400px;
  border-bottom: 1px solid theme-color(link-color-light);
  overflow: hidden;
}

.newsletter-input {
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  flex-grow: 1;
  padding-bottom: 10px;

  border: none;
  outline: none;
  background-color: theme-color(main-color);
  color: theme-color(opposite-color);

  &::placeholder {
    font-family: "DM Sans", sans-serif;
    color: theme-color(gray-dark-color);
    opacity: 0.8;
  }
}

.newsletter-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  border: none;
  background-color: theme-color(main-color);
  color: theme-color(link-color-light);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    filter: brightness(80%);
  }
}

.custom-notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: theme-color(opposite-color);
  color: theme-color(main-color);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 300px;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
