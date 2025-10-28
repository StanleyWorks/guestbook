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
    <div>
      <NuxtLink to="/">See messages</NuxtLink>
    </div>
    <div v-if="showSuccessAlert">Your message has been recorded.</div>
    <form action="#" @submit.prevent="signBook">
      <div>
        <label for="name">Your name</label>
        <input type="text" autocomplete="name" v-model="name" />
      </div>

      <div>
        <label for="message">Leave a message</label>
        <textarea name="message" id="message" v-model="message"></textarea>
      </div>

      <div>
        <button type="submit">Sign book</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
