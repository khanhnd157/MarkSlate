<template>
  <Modal
    :is-open="isOpen"
    title="Public Pages"
    @close="$emit('close')"
    modal-class="w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] flex flex-col"
  >
    <!-- Delete Confirmation Modal -->
    <Modal
      :is-open="showDeleteModal"
      title="Delete Page"
      @close="showDeleteModal = false"
    >
      <p class="text-sm text-slate-600">
        Are you sure you want to delete "{{ pageToDelete?.name }}"? This action cannot be undone.
      </p>
      <template #actions>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="showDeleteModal = false"
            class="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="isDeleting"
            @click="confirmDelete"
            class="inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </template>
    </Modal>

    <div class="mb-4 flex-shrink-0">
      <p class="text-sm text-slate-500">Public pages can be shared with anyone and cannot be updated</p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12 flex-1">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
    </div>

    <div v-else-if="pages.length === 0" class="text-center py-12 flex-1">
      <Icon icon="lucide:files" class="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <h3 class="text-sm font-medium text-slate-900">No public pages yet</h3>
      <p class="mt-1 text-sm text-slate-500">
        Your published pages will appear here
      </p>
    </div>

    <!-- Compact Card Grid -->
    <div v-else class="flex-1 overflow-y-auto p-4">
      <div class="grid gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div
          v-for="page in pages"
          :key="page.id"
          class="group bg-white border border-slate-200 rounded-md p-3 hover:shadow-sm hover:border-slate-300 transition-all duration-200 cursor-pointer relative min-h-[80px]"
          @click="openPage(page.id)"
        >
          <!-- File Icon & Name -->
          <div class="flex items-start gap-2 mb-2">
            <Icon icon="lucide:file-text" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <h3 class="font-medium text-slate-900 text-sm leading-tight truncate">
              {{ page.name }}
            </h3>
          </div>
          
          <!-- Date & Status -->
          <div class="flex items-center justify-between">
            <p class="text-xs text-slate-500">
              {{ formatDateCompact(page.created_at) }}
            </p>
            <div class="flex items-center gap-1 text-xs text-slate-400">
              <Icon icon="lucide:globe" class="w-3 h-3" />
              <span>Public</span>
            </div>
          </div>
          
          <!-- Actions (hover only) -->
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="flex gap-1">
              <button 
                @click.stop="copyPageId(page.id)"
                class="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                title="Copy URL"
              >
                <Icon icon="lucide:copy" class="w-3 h-3" />
              </button>
              <button 
                @click.stop="handleDelete(page)"
                class="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-red-600"
                title="Delete"
              >
                <Icon icon="lucide:trash-2" class="w-3 h-3" />
              </button>
            </div>
            
            <!-- Copied message -->
            <div
              v-if="showCopiedMessage === page.id"
              class="absolute top-8 right-0 px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg animate-fade-in-down whitespace-nowrap"
            >
              Copied!
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #actions>
      <!-- Empty to remove the Done button -->
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import Modal from './Modal.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const pages = ref([])
const isLoading = ref(false)
const isDeleting = ref(false)
const showDeleteModal = ref(false)
const pageToDelete = ref(null)
const user = useSupabaseUser()
const showCopiedMessage = ref(null)

// Watch for modal open to fetch pages
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen && user.value) {
    await fetchPages()
  }
})

async function fetchPages() {
  if (!user.value) return
  
  isLoading.value = true
  try {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    pages.value = data
  } catch (error) {
    console.error('Error fetching pages:', error)
  } finally {
    isLoading.value = false
  }
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString))
}

function formatDateCompact(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1d ago'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays/7)}w ago`
  if (diffDays < 365) return `${Math.floor(diffDays/30)}mo ago`
  return `${Math.floor(diffDays/365)}y ago`
}

async function copyPageId(id) {
  try {
    const config = useRuntimeConfig();
    const pageUrl = `${config.public.appUrl}/${id}`;
    await navigator.clipboard.writeText(pageUrl);
    
    // Show and auto-hide the copied message for this specific page
    showCopiedMessage.value = id;
    setTimeout(() => {
      showCopiedMessage.value = null;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    alert('Failed to copy to clipboard. Please copy manually.');
  }
}

function openPage(id) {
  window.open(`/${id}`, '_blank');
}

function handleDelete(page) {
  pageToDelete.value = page
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!pageToDelete.value) return
  
  isDeleting.value = true
  try {
    const { error } = await $fetch('/api/pages/delete', {
      method: 'POST',
      body: {
        pageId: pageToDelete.value.id,
        userId: user.value.id
      }
    })

    if (error) throw error

    // Remove from local state
    pages.value = pages.value.filter(p => p.id !== pageToDelete.value.id)
    showDeleteModal.value = false
  } catch (error) {
    console.error('Error deleting page:', error)
    alert('Failed to delete page. Please try again.')
  } finally {
    isDeleting.value = false
    pageToDelete.value = null
  }
}
</script>

<style>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.2s ease-out;
}
</style>