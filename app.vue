<template>
  <div class="content">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.content {
  margin-top: 16px;

  @media (min-width: $breakpoints-m) {
    margin-top: 32px;
  }

  @media (min-width: $breakpoints-l) {
    margin-top: 64px;
  }
}
</style>
