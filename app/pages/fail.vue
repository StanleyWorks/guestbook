<script setup lang="ts">
const triggerFailure = async () => {
  try {
    await $fetch("/api/fail");
  } catch (err) {
    showError("Task failed successfully");
  }
};
</script>

<template>
  <div>Page: fail</div>

  <div class="m-5">
    <button
      class="bg-primary cursor-pointer text-white p-2 rounded-lg"
      @click.prevent="triggerFailure"
    >
      Trigger server error
    </button>
  </div>
</template>

<style scoped></style>
