<template>
  <div class="embedded-slate">
    <!-- Editor Container -->
    <div class="relative">
      <EditorContent
        :editor="editor"
        class="prose prose-slate max-w-none min-h-[300px] p-4 border border-slate-200 rounded-lg focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200 transition-all"
      />

      <!-- AI Generate Button -->
      <div class="mt-4 flex items-center justify-between">
        <button
          v-if="initialPrompt"
          @click="generateWithAI"
          :disabled="isGenerating || usageCount >= maxFreeUses"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all font-medium"
        >
          <Icon
            :icon="isGenerating ? 'lucide:loader-2' : 'lucide:sparkles'"
            class="w-4 h-4"
            :class="{ 'animate-spin': isGenerating }"
          />
          {{ isGenerating ? 'Generating...' : 'Generate Example' }}
        </button>

        <!-- Usage Counter -->
        <div class="text-sm text-slate-600">
          {{ usageCount }}/{{ maxFreeUses }} free uses today
        </div>
      </div>

      <!-- Upgrade Prompt (after max uses) -->
      <div
        v-if="usageCount >= maxFreeUses"
        class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg"
      >
        <div class="flex items-start gap-3">
          <Icon icon="lucide:zap" class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <h4 class="font-semibold text-amber-900 mb-1">Free limit reached</h4>
            <p class="text-sm text-amber-800 mb-3">
              Sign up for a free account to get 10 more AI generations per month!
            </p>
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all text-sm font-medium"
            >
              Sign Up Free
              <Icon icon="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800"
      >
        {{ errorMessage }}
      </div>
    </div>

    <!-- Save to Account CTA (after first use) -->
    <div
      v-if="hasGeneratedContent && !user"
      class="mt-6 p-6 bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg text-white"
    >
      <div class="flex items-start gap-4">
        <Icon icon="lucide:save" class="w-6 h-6 flex-shrink-0 mt-1" />
        <div class="flex-1">
          <h3 class="font-semibold text-lg mb-2">Love what you created?</h3>
          <p class="text-slate-300 mb-4">
            Sign up for a free account to save your work, access unlimited documents, and get 10 AI generations per month.
          </p>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all font-semibold"
          >
            Create Free Account
            <Icon icon="lucide:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Icon } from '@iconify/vue'
import posthog from 'posthog-js'

const props = defineProps({
  initialPrompt: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Start typing...'
  }
})

const user = useSupabaseUser()
const isGenerating = ref(false)
const errorMessage = ref('')
const hasGeneratedContent = ref(false)
const usageCount = ref(0)
const maxFreeUses = 3

// Initialize TipTap editor
const editor = useEditor({
  extensions: [StarterKit],
  editable: true,
  content: `<p>${props.placeholder}</p>`,
})

// Load usage count from localStorage
onMounted(() => {
  if (process.client) {
    const today = new Date().toDateString()
    const storedData = localStorage.getItem('slate_seo_usage')

    if (storedData) {
      const parsed = JSON.parse(storedData)
      if (parsed.date === today) {
        usageCount.value = parsed.count || 0
      } else {
        // Reset for new day
        localStorage.setItem('slate_seo_usage', JSON.stringify({ date: today, count: 0 }))
      }
    }
  }
})

// Generate content with AI
async function generateWithAI() {
  if (!props.initialPrompt || usageCount.value >= maxFreeUses) return

  isGenerating.value = true
  errorMessage.value = ''

  try {
    // Get current editor content
    const currentContent = editor.value.getHTML()

    // Call public AI API (no auth required)
    const response = await $fetch('/api/ai-public', {
      method: 'POST',
      body: {
        prompt: props.initialPrompt,
        content: currentContent === `<p>${props.placeholder}</p>` ? '' : currentContent
      }
    })

    if (response.content) {
      // Update editor with AI response
      editor.value.commands.setContent(response.content)
      hasGeneratedContent.value = true

      // Increment usage count
      usageCount.value++
      if (process.client) {
        const today = new Date().toDateString()
        localStorage.setItem('slate_seo_usage', JSON.stringify({
          date: today,
          count: usageCount.value
        }))
      }

      // Track event
      if (typeof posthog !== 'undefined') {
        posthog.capture('seo_ai_generated', {
          prompt: props.initialPrompt,
          usage_count: usageCount.value,
          has_account: !!user.value
        })
      }
    }
  } catch (error) {
    console.error('AI generation error:', error)
    errorMessage.value = error.message || 'Failed to generate content. Please try again.'
  } finally {
    isGenerating.value = false
  }
}

// Cleanup
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.embedded-slate :deep(.ProseMirror) {
  outline: none;
  min-height: 300px;
}

.embedded-slate :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
