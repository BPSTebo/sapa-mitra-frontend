<template>
  <div>
    <el-text
      >© 2024. (Versi: {{ version }}, Mode: {{ mode }}, Build:
      {{ build }})</el-text
    >
  </div>
</template>

<script setup>
const version = import.meta.env.VITE_APP_VERSION;
const mode = import.meta.env.MODE;
const build = import.meta.env.VITE_BUILD_HASH;
</script>
