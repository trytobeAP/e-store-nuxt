<template>
  <div class="logo">
    <span class="logo-1">S</span>
    <span class="logo-2">HOPEE</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  margin-bottom: 0;
  font-family: "Allerta Stencil", sans-serif;
  font-size: clamp(24px, 8vw, 35px);
  font-weight: vars.$fw-regular;
  line-height: 1;
  word-break: break-all;
}

.logo-1 {
  color: vars.theme-color("accent-color");
}

.logo-2 {
  color: vars.theme-color("opposite-color");
}
</style>
