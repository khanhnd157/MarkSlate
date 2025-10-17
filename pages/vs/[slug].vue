<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b border-slate-200/50 bg-white/80 backdrop-blur sticky top-0 z-10 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="text-xl font-bold text-slate-900">Slate</span>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            Open Editor
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <Icon icon="lucide:loader-2" class="w-8 h-8 text-slate-400 animate-spin" />
    </div>

    <!-- Error State -->
    <div v-else-if="!pageData" class="max-w-3xl mx-auto px-4 py-20 text-center">
      <Icon icon="lucide:file-question" class="w-16 h-16 text-slate-300 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p class="text-slate-600 mb-6">The page you're looking for doesn't exist.</p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all"
      >
        Go to Slate
      </NuxtLink>
    </div>

    <!-- Content -->
    <main v-else class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {{ pageData.h1 }}
        </h1>
        <p class="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          {{ pageData.description }}
        </p>
        <div class="flex flex-wrap gap-2 justify-center">
          <span
            v-for="keyword in pageData.keywords.slice(0, 5)"
            :key="keyword"
            class="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
          >
            {{ keyword }}
          </span>
        </div>
      </div>

      <!-- Product-Led Section - Embedded Editor -->
      <div class="bg-white/80 backdrop-blur rounded-md border border-slate-200/50 shadow-sm p-6 mb-12">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-slate-900">Try It Now</h2>
          <span class="text-sm text-slate-500">No signup required</span>
        </div>

        <EmbeddedSlate
          v-if="pageData.ai_prompt"
          :initial-prompt="pageData.ai_prompt"
          :placeholder="`Start typing or click 'Generate Example'...`"
        />

        <div class="mt-4 flex items-center justify-between">
          <p class="text-sm text-slate-600">
            💡 Tip: Edit the AI output to match your style
          </p>
          <NuxtLink
            to="/"
            class="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Open in full editor →
          </NuxtLink>
        </div>
      </div>

      <!-- Examples Section -->
      <div v-if="pageData.examples && pageData.examples.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Examples</h2>
        <div class="space-y-6">
          <div
            v-for="(example, index) in pageData.examples"
            :key="index"
            class="bg-white/80 backdrop-blur rounded-md border border-slate-200/50 shadow-sm p-6"
          >
            <h3 class="font-semibold text-slate-900 mb-4">{{ example.title }}</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-slate-600 mb-2">Before:</p>
                <div class="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
                  {{ example.before }}
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-slate-600 mb-2">After AI:</p>
                <div class="bg-blue-50 rounded-lg p-4 text-sm text-slate-900">
                  {{ example.after }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <div v-if="pageData.benefits && pageData.benefits.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Why Use Slate?</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(benefit, index) in pageData.benefits"
            :key="index"
            class="flex items-start gap-3 bg-white/80 backdrop-blur rounded-md border border-slate-200/50 shadow-sm p-4"
          >
            <Icon icon="lucide:check-circle" class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span class="text-slate-700">{{ benefit }}</span>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div v-if="pageData.faqs && pageData.faqs.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in pageData.faqs"
            :key="index"
            class="bg-white/80 backdrop-blur rounded-md border border-slate-200/50 shadow-sm p-6"
          >
            <h3 class="font-semibold text-slate-900 mb-2">{{ faq.question }}</h3>
            <p class="text-slate-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-slate-900 rounded-md p-8 text-center shadow-sm">
        <h2 class="text-2xl font-bold text-white mb-4">
          Ready to {{ pageData.h1.toLowerCase() }}?
        </h2>
        <p class="text-slate-300 mb-6">
          Start creating professional content in seconds. No credit card required.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-md hover:bg-slate-50 transition-all duration-200 active:scale-95 font-semibold"
        >
          <Icon icon="lucide:sparkles" class="w-5 h-5" />
          {{ pageData.cta_text || 'Try Free' }}
        </NuxtLink>
      </div>

    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200/50 bg-white/80 backdrop-blur mt-20 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div class="text-center text-sm text-slate-600">
          <p>© 2025 Slate. Built by <a href="https://x.com/thetronjohnson" class="text-slate-900 hover:underline">Kiran Johns</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const route = useRoute()
const supabase = useSupabaseClient()
const pageData = ref(null)
const isLoading = ref(true)

// Fetch page data from Supabase
async function fetchPageData() {
  try {
    isLoading.value = true

    // Fetch main page data
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('slug', route.params.slug)
      .eq('type', 'vs')
      .eq('published', true)
      .single()

    if (error) throw error

    pageData.value = data

  } catch (error) {
    console.error('Error fetching page data:', error)
    pageData.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPageData()
})

// SEO Meta Tags
useHead(() => ({
  title: pageData.value?.title || 'Create with AI | Slate',
  meta: [
    { name: 'description', content: pageData.value?.meta_description || '' },
    { name: 'keywords', content: pageData.value?.keywords?.join(', ') || '' },

    // Open Graph
    { property: 'og:title', content: pageData.value?.title || '' },
    { property: 'og:description', content: pageData.value?.meta_description || '' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://slate.ink/vs/${route.params.slug}` },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageData.value?.title || '' },
    { name: 'twitter:description', content: pageData.value?.meta_description || '' },
  ],
  link: [
    { rel: 'canonical', href: `https://slate.ink/vs/${route.params.slug}` }
  ],
  script: pageData.value ? [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: pageData.value.h1,
        description: pageData.value.description,
        step: pageData.value.examples?.map((ex, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: ex.title,
          text: ex.after
        })) || []
      })
    }
  ] : []
}))

// Track page view
onMounted(() => {
  if (pageData.value) {
    if (typeof posthog !== 'undefined') {
      posthog.capture('seo_page_viewed', {
        page_type: 'create',
        page_slug: route.params.slug,
        page_title: pageData.value.title
      })
    }
  }
})
</script>
