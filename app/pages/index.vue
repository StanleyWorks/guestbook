<script setup lang="ts">
type Comment = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};
const { data } = useFetch<Comment[]>("/api/comments");
</script>

<template>
  <main>
    <section class="mx-auto max-w-7xl px-4 py-10">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold tracking-tight">Messages</h1>
        <NuxtLink
          to="/sign"
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
          >Sign book</NuxtLink
        >
      </div>

      <div v-if="!data || !data.length" class="text-sm text-muted">
        No messages yet. Be the first to sign the book.
      </div>

      <ul class="space-y-3" v-else>
        <li
          v-for="comment in data"
          :key="comment.id"
          class="rounded-card border border-border bg-white shadow-card p-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-medium text-text">{{ comment.name }}</p>
              <p class="mt-1 text-sm text-text/80">{{ comment.message }}</p>
            </div>
            <time class="shrink-0 text-xs text-muted">{{
              comment.created_at
            }}</time>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
