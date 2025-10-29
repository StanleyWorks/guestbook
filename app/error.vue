<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="h-screen flex justify-center content-center items-center">
    <div class="bg-gray-200 p-10 rounded-lg">
      <h2 class="text-2xl">{{ error?.statusCode }}</h2>
      <h3 class="text-lg">{{ error?.message }}</h3>

      <div>
        <button
          class="bg-primary text-white p-1 rounded-lg w-full"
          @click="handleError"
        >
          Clear errors
        </button>
      </div>
    </div>
  </div>
</template>
