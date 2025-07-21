<template>
  <div class="container product-page">
    <h1>Страница продукта</h1>
    <p>Вы просматриваете продукт {{ route.params.slug }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#app";

const route = useRoute();
</script>
