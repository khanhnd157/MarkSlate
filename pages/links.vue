<template>
  <div class="min-h-screen bg-white p-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-lg font-medium text-slate-800 mb-6">Links</h1>
      
      <div v-if="pending" class="text-sm text-slate-500">Loading...</div>
      
      <div v-else-if="error" class="text-sm text-red-500">Failed to load links</div>
      
      <ul v-else class="space-y-2">
        <li v-for="link in data?.links" :key="link.url">
          <a 
            :href="link.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-sm text-slate-600 hover:text-slate-900 hover:underline"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { data, pending, error } = await useFetch('https://kiranjohns.com/api/links')
</script>
