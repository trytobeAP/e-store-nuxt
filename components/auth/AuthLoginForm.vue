<template>
  <form
    class="login-form"
    novalidate
    @submit.prevent="handleLogin"
  >
    <div class="login-form__field">
      <BaseInput
        v-model="values.name"
        placeholder="Username"
        variant="line"
        clearable
        clearIconName="local-custom:clear-cross-filled"
        :iconColor="iconClearColor"
        @blur="validateField('name')"
      />
      <span
        v-if="errors.name"
        class="login-form__error"
      >
        {{ errors.name }}
      </span>
    </div>

    <div class="login-form__field login-form__field--last">
      <BaseInput
        v-model="values.password"
        type="password"
        placeholder="Password"
        variant="line"
        clearable
        clearIconName="local-custom:clear-cross-filled"
        :iconColor="iconClearColor"
        @blur="validateField('password')"
      />
      <span
        v-if="errors.password"
        class="login-form__error"
      >
        {{ errors.password }}
      </span>
    </div>

    <div class="login-form__actions">
      <BaseCheckbox v-model="rememberMe"> Remember me </BaseCheckbox>
    </div>

    <div
      v-if="formError"
      class="login-form__error login-form__error--general"
    >
      {{ formError }}
    </div>

    <BaseButton
      variant="secondary"
      class="login-form__submit"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? "SIGNING IN..." : "SIGN IN" }}
    </BaseButton>

    <NuxtLink
      to="/reset-password"
      class="login-form__forgot-password"
    >
      Have you forgotten your password?
    </NuxtLink>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useForm from "~/composables/forms/useForm";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const { values, errors, isSubmitting, validateField, submitForm } = useForm({
  name: "mor_2314",
  password: "83r5^_",
});

const rememberMe = ref(false);
const formError = ref<string | null>(null);

const handleLogin = () => {
  formError.value = null;

  submitForm(async (formValues) => {
    try {
      await authStore.login({
        name: formValues.name,
        password: formValues.password,
      });

      await router.push("/");
    } catch (e: unknown) {
      formError.value =
        e instanceof Error ? e.message : "An unknown error occurred.";
    }
  });
};

const iconClearColor = "var(--color-gray-theme-complimentary-color)";
</script>

<style scoped lang="scss">
.login-form__field {
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 46px;

  @media (max-width: ($breakpoints-l - 1px)) {
    margin-bottom: 40px;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-bottom: 32px;
  }
}

.login-form__field--last {
  margin-bottom: 16px;

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-bottom: 24px;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    margin-bottom: 22px;
  }
}

.login-form__error {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 14px;
  color: theme-color("error-color");

  &--general {
    position: static;
    margin-bottom: 16px;
    text-align: center;
  }
}

.login-form__actions {
  margin-bottom: 68px;

  @media (max-width: ($breakpoints-l - 1px)) {
    margin-bottom: 56px;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-bottom: 40px;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    margin-bottom: 12px;
  }
}

.login-form__submit {
  display: block;
  width: 100%;
  margin-right: auto;
  margin-bottom: 24px;
  margin-left: auto;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: $fw-bold;
  line-height: 100%;
  border-radius: 4px;

  @media (max-width: ($breakpoints-m - 1px)) {
    height: 48px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: $fw-medium;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    height: 32px;
    margin-bottom: 16px;
    font-size: 12px;
    font-weight: $fw-regular;
    line-height: 20px;
  }
}

.login-form__forgot-password {
  display: block;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: $fw-regular;
  color: theme-color("opposite-color");
  text-align: center;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    font-size: 12px;
  }
}
</style>
