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
    { name: 'keywords', content: 'writing app, AI writing assistant, markdown editor, note taking, content creation, AI editor, local first, privacy focused' },
    { name: 'author', content: 'Kiran Johns' },

    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://slate.ink' },
    { property: 'og:title', content: 'Slate - Write better, faster with AI' },
    { property: 'og:description', content: 'A minimal local first writing app with AI superpowers. Write, edit, and improve your content with AI assistance.' },
    { property: 'og:image', content: 'https://slate.ink/og-image.png' },
    { property: 'og:site_name', content: 'Slate' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://slate.ink' },
    { name: 'twitter:title', content: 'Slate - Write better, faster with AI' },
    { name: 'twitter:description', content: 'A minimal local first writing app with AI superpowers. Write, edit, and improve your content with AI assistance.' },
    { name: 'twitter:image', content: 'https://slate.ink/og-image.png' },
    { name: 'twitter:creator', content: '@thetronjohnson' },

    // Additional SEO
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' },
    { rel: 'apple-touch-icon', href: '/icon.png' },
    { rel: 'canonical', href: 'https://slate.ink' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            '@id': 'https://slate.ink/#webapp',
            name: 'Slate',
            url: 'https://slate.ink',
            description: 'A minimal local first writing app with AI superpowers. Write, edit, and improve your content with AI assistance.',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            author: {
              '@type': 'Person',
              name: 'Kiran Johns',
              url: 'https://x.com/thetronjohnson'
            },
            featureList: [
              'AI-powered writing assistance',
              'Local-first storage',
              'Rich text editing',
              'Markdown export',
              'PDF export',
              'One-click publishing'
            ]
          },
          {
            '@type': 'Organization',
            '@id': 'https://slate.ink/#organization',
            name: 'Slate',
            url: 'https://slate.ink',
            logo: 'https://slate.ink/icon.png',
            sameAs: [
              'https://github.com/thetronjohnson/slate',
              'https://x.com/thetronjohnson'
            ]
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://slate.ink/#software',
            name: 'Slate',
            applicationCategory: 'WritingApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '1'
            }
          }
        ]
      })
    }
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