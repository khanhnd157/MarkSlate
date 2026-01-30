<template>
  <div class="min-h-screen bg-white p-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-lg font-medium text-slate-800 mb-6">Links</h1>
      
      <ul class="space-y-2">
        <li v-for="link in links" :key="link.url">
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
const links = [
  { name: "62", url: "https://sixty.to" },
  { name: "Chibi", url: "https://chibi.sh" },
  { name: "Daysi", url: "https://daysi.app" },
  { name: "Layrr", url: "https://layrr.dev" },
  { name: "Loops", url: "https://tryloops.dev" },
  { name: "Pookie", url: "https://trypookie.com" },
  { name: "Runlight", url: "https://runlight.co" },
  { name: "Shipyard", url: "https://tryshipyard.com" },
  { name: "Slate", url: "https://slate.ink" },
  { name: "Stew", url: "https://stew.so" }
]
</script>
