<template>
  <NuxtPage />
</template>

<script setup>
import { watch, onMounted } from 'vue';
import posthog from 'posthog-js';

const config = useRuntimeConfig();
const user = useSupabaseUser();
const router = useRouter();

// Initialize PostHog
if (process.client) {  // Only initialize on client-side
  posthog.init(config.public.posthogKey, {
    api_host: config.public.posthogHost,
    person_profiles: 'identified_only',
    capture_pageview: true, // Enable automatic pageview tracking
    capture_pageleave: true, // Track when users leave pages
  });
}

// SEO Meta Tags
useHead({
  title: 'Slate - Write better, faster with AI',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'A minimal local first writing app with AI superpowers. Write, edit, and improve your content with AI assistance.' },
    
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://slate.ink' },
    { property: 'og:title', content: 'Slate - Write better, faster with AI' },
    { property: 'og:description', content: 'A minimal local first writing app with AI superpowers. Write, edit, and improve your content with AI assistance.' },
    { property: 'og:image', content: '/og-image.png' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://slate.ink' },
    { name: 'twitter:title', content: 'Slate - Write better, faster with AI' },
    { name: 'twitter:description', content: 'A minimal local first writing app with AI superpowers. Write, edit, and improve your content with AI assistance.' },
    { name: 'twitter:image', content: '/og-image.png' },
    
    // Additional SEO
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' },
    { rel: 'apple-touch-icon', href: '/icon.png' }
  ]
});

onMounted(() => {
  // Watch for authentication state changes at the app level
  watch(user, (newUser) => {
    // Clean up URL if it contains auth code
    if (process.client && window.location.search.includes('code=')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, { immediate: true });

  // Track page views with UTM parameters and traffic source on route changes
  if (process.client) {
    router.afterEach((to, from) => {
      // Get URL parameters (including UTM parameters)
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {};

      // Extract all UTM parameters
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          utmParams[param] = value;
        }
      });

      // Capture the page view with additional context
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        path: to.path,
        ...utmParams,
        referrer: document.referrer || 'direct',
        // Store UTM parameters as super properties for the session
        ...(Object.keys(utmParams).length > 0 && {
          $set: utmParams
        })
      });
    });
  }
});
</script> 