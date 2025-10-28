<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="border-b border-border bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div
        class="mx-auto max-w-7xl px-4 flex items-center justify-between py-4"
      >
        <NuxtLink to="/" class="font-semibold text-text">Guestbook</NuxtLink>
        <nav class="flex items-center gap-3 text-sm">
          <NuxtLink to="/" class="text-muted hover:text-text"
            >Messages</NuxtLink
          >
          <NuxtLink
            to="/sign"
            class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
            >Sign</NuxtLink
          >
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-border bg-white">
      <div class="mx-auto max-w-7xl px-4 py-6 text-xs text-muted">
        Built with Nuxt
      </div>
    </footer>
  </div>
</template>
