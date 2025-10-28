<script setup lang="ts">
const { data } = useFetch("/api/comments");
</script>

<template>
  <main>
    <div>
      <NuxtLink to="/sign">Sign book</NuxtLink>
    </div>

    <div v-for="comment in data">
      <p>
        <strong>{{ comment.name }} - {{ comment.message }}</strong>
      </p>
      <p>
        <small>{{ comment.created_at }} </small>
      </p>
    </div>
  </main>
</template>
