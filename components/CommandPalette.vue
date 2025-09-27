<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="command-palette fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[480px] max-w-[90vw]">
      <div class="relative bg-white/95 backdrop-blur border border-slate-200/50 rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[60vh]">
          <!-- Login Prompt for Unauthenticated Users -->
          <div v-if="!user" class="p-4">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon icon="lucide:sparkles" class="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 class="font-medium text-slate-900">Login to use Slate AI</h3>
                <p class="text-sm text-slate-500">Get instant help with your writing</p>
              </div>
            </div>
            <button
              @click="handleLogin"
              class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all duration-200 active:scale-95"
            >
              <Icon icon="lucide:log-in" class="w-4 h-4" />
              Sign in to continue
            </button>
          </div>

          <!-- Content for authenticated users -->
          <div v-if="user">
            <!-- Selection Preview (when applicable) -->
            <div v-if="props.selectedContent !== props.fullContent" class="px-4 py-3 pr-12 border-b border-slate-100/50 bg-slate-50/30">
              <div class="flex items-center gap-2">
                <Icon icon="lucide:text-select" class="w-3.5 h-3.5 text-slate-400" />
                <p class="text-xs text-slate-500 truncate">
                  Selected: {{ truncateText(stripHtml(props.selectedContent), 80) }}
                </p>
              </div>
            </div>

            <!-- Input Area -->
            <div class="relative p-4">
              <textarea
                v-model="prompt"
                class="w-full border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-sm leading-relaxed resize-none min-h-[2.5rem] max-h-32"
                :placeholder="props.selectedContent === props.fullContent 
                  ? 'Ask Slate AI to help with editing...' 
                  : 'Ask Slate AI to help with the selected text...'"
                @keydown="handleTextareaKeydown"
                @input="autoResize"
                ref="inputRef"
                rows="1"
              />
              
              <div v-if="isLoading" class="absolute right-12 top-4">
                <Icon icon="lucide:loader-2" class="w-5 h-5 text-slate-400 animate-spin" />
              </div>
            </div>

            <!-- Helper Prompts -->
            <div class="px-4 pb-4 border-t border-slate-100/50">
              <div class="grid grid-cols-2 gap-2 mt-3">
                <template v-if="props.selectedContent !== props.fullContent">
                  <!-- Selected text prompts -->
                  <button
                    v-for="suggestion in selectedTextPrompts"
                    :key="suggestion"
                    @click="usePrompt(suggestion)"
                    class="text-xs px-3 py-2 rounded-md bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all duration-200 text-left"
                  >
                    {{ suggestion }}
                  </button>
                </template>
                <template v-else>
                  <!-- Full document prompts -->
                  <button
                    v-for="suggestion in fullDocumentPrompts"
                    :key="suggestion"
                    @click="usePrompt(suggestion)"
                    class="text-xs px-3 py-2 rounded-md bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all duration-200 text-left"
                  >
                    {{ suggestion }}
                  </button>
                </template>
              </div>
            </div>
          </div>
          
          <div v-if="error" class="px-4 py-3 bg-red-50/80 border-t border-red-100/50">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>
          
          <!-- Close button - positioned at top right -->
          <button 
            @click="close"
            class="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 transition-all duration-200"
            title="Close (Esc)"
          >
            <Icon icon="lucide:x" class="w-3.5 h-3.5" />
          </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { useSupabaseUser } from '#imports';
import { useSupabaseClient } from '#imports';

const props = defineProps({
  isOpen: Boolean,
  selectedContent: String,
  fullContent: String
});

const emit = defineEmits(['close', 'update-content']);

const prompt = ref('');
const error = ref('');
const isLoading = ref(false);
const inputRef = ref(null);
let savedSelection = null;
const user = useSupabaseUser();
const router = useRouter();
const supabase = useSupabaseClient();

const selectedTextPrompts = [
  'Fix grammar',
  'Make it LinkedIn-friendly',
  'Convert to bullet points',
  'Simplify and clarify'
];

const fullDocumentPrompts = [
  'Create a travel checklist',
  'Create a marketing plan for my mobile app',
  'Create a survey',
  'Write a blog post outline'
];

async function handleSubmit() {
  if (!prompt.value.trim() || isLoading.value) return;
  
  try {
    isLoading.value = true;
    error.value = '';
    
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        content: props.selectedContent
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }
    
    const data = await response.json();
    emit('update-content', data.content);
    close();
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

function close() {
  if (savedSelection) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedSelection);
  }
  emit('close');
}

async function handleLogin() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    if (error) throw error;
    emit('close');
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
}

function usePrompt(suggestion) {
  prompt.value = suggestion;
  handleSubmit();
}

function handleTextareaKeydown(e) {
  // Submit on Enter (but not Shift+Enter)
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
  
  // Handle Ctrl+A/Cmd+A to select only textarea content
  if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
    e.preventDefault();
    e.stopPropagation();
    // Select all text in the textarea
    if (inputRef.value) {
      inputRef.value.select();
    }
  }
  // Allow Shift+Enter for new lines (default behavior)
}

function autoResize() {
  const textarea = inputRef.value;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'; // max-h-32 = 128px
  }
}

function stripHtml(html) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function truncateText(text, wordLimit) {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}

onMounted(() => {
  // Setup keyboard shortcut
  window.addEventListener('keydown', handleKeydown);
  // Prevent global select all when CommandPalette is open
  window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keydown', handleGlobalKeydown);
});

function handleKeydown(e) {
  // Close on escape
  if (e.key === 'Escape' && props.isOpen) {
    close();
  }
}

function handleGlobalKeydown(e) {
  // Prevent global Ctrl+A/Cmd+A when CommandPalette is open and focused
  if (props.isOpen && (e.ctrlKey || e.metaKey) && e.key === 'a') {
    const activeElement = document.activeElement;
    // Only prevent if the textarea is focused or CommandPalette is the active area
    if (activeElement === inputRef.value || activeElement?.closest('.command-palette')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    prompt.value = '';
    error.value = '';
    if (user.value) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        savedSelection = selection.getRangeAt(0);
      }
    }
    await nextTick();
    if (user.value) {
      inputRef.value?.focus();
      // Reset textarea height
      if (inputRef.value) {
        inputRef.value.style.height = 'auto';
      }
    }
  }
});
</script>

<style scoped>
/* Add your styles here */
</style> 