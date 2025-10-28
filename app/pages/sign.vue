<script setup lang="ts">
const name = ref<string | undefined>();
const message = ref<string | undefined>();
const showSuccessAlert = ref<boolean>(false);

const signBook = async () => {
  const res = await useFetch("/api/comments", {
    method: "POST",
    body: {
      name: name.value,
      message: message.value,
    },
  });

  showSuccessAlert.value = true;

  name.value = message.value = undefined;

  setTimeout(() => (showSuccessAlert.value = false), 3000);
};
</script>

<template>
  <div>
    <section class="mx-auto max-w-7xl px-4 py-10">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold tracking-tight">Sign the book</h1>
        <NuxtLink to="/" class="text-muted hover:text-text"
          >See messages</NuxtLink
        >
      </div>

      <div
        v-if="showSuccessAlert"
        class="mb-4 rounded-md border border-border bg-white p-3 text-sm text-green-700"
      >
        Your message has been recorded.
      </div>

      <form action="#" @submit.prevent="signBook" class="space-y-4">
        <div>
          <label for="name" class="mb-1 block text-sm font-medium text-text/90"
            >Your name</label
          >
          <input
            id="name"
            type="text"
            autocomplete="name"
            v-model="name"
            class="block w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text shadow-sm placeholder:text-muted focus:border-transparent focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        <div>
          <label
            for="message"
            class="mb-1 block text-sm font-medium text-text/90"
            >Leave a message</label
          >
          <textarea
            id="message"
            name="message"
            v-model="message"
            rows="4"
            class="block w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text shadow-sm placeholder:text-muted focus:border-transparent focus:ring-2 focus:ring-primary outline-none"
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign book
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped></style>
