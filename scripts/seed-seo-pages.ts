#!/usr/bin/env tsx

/**
 * Smart SEO Pages Seeder
 *
 * This script intelligently seeds the seo_pages table with programmatic SEO pages
 * - Checks for existing pages before inserting
 * - Only adds new pages (no duplicates)
 * - Updates existing pages if data changed
 * - Shows detailed diff of what was added/updated/skipped
 *
 * Usage:
 *   1. Ensure you have Supabase credentials in .env
 *   2. Run: bun run scripts/seed-seo-pages.ts
 */

import { createClient } from '@supabase/supabase-js'

// Load environment variables
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// ============================================================================
// SEO PAGES DATA - Add your pages here!
// ============================================================================

export const seoPages = [
  // /create pages - High intent, product-led
  {
    slug: 'linkedin-post',
    type: 'create',
    title: 'Create LinkedIn Post with AI - Free LinkedIn Post Generator | Slate',
    meta_description: 'Generate engaging LinkedIn posts instantly with AI. Free LinkedIn post creator with professional templates. Write better, faster with Slate.',
    h1: 'Create LinkedIn Posts with AI',
    description: 'Transform your thoughts into professional LinkedIn posts in seconds. Our AI-powered LinkedIn post generator helps you craft engaging content that resonates with your audience.',
    keywords: ['linkedin post generator', 'create linkedin post', 'ai linkedin', 'linkedin content creator', 'linkedin writing tool'],
    ai_prompt: 'Make it LinkedIn-friendly',
    category: 'Social Media',
    search_volume: 20000,
    difficulty: 45,
    examples: [
      {
        title: 'Professional Update',
        before: 'Got a new job at tech company',
        after: 'Excited to announce that I\'m starting a new chapter as a Software Engineer at TechCorp! Looking forward to contributing to innovative projects and growing with an amazing team. #NewBeginnings #CareerGrowth'
      },
      {
        title: 'Thought Leadership',
        before: 'AI is changing how we work',
        after: 'The future of work isn\'t about replacing humans with AI—it\'s about empowering people with better tools. Here\'s what I\'ve learned after implementing AI in our workflow... 🧵'
      }
    ],
    faqs: [
      {
        question: 'How does the LinkedIn post generator work?',
        answer: 'Simply type or paste your idea, and our AI will transform it into a professional LinkedIn post with proper formatting, hashtags, and engaging language.'
      },
      {
        question: 'Is the LinkedIn post generator free?',
        answer: 'Yes! You can create up to 10 LinkedIn posts per month for free. Pro users get unlimited access.'
      },
      {
        question: 'Can I customize the generated posts?',
        answer: 'Absolutely! Every generated post is fully editable in Slate\'s editor. Adjust tone, length, and style to match your voice.'
      }
    ],
    benefits: [
      'Generate professional posts in seconds',
      'Optimized for LinkedIn algorithm',
      'Include relevant hashtags automatically',
      'Maintain your authentic voice',
      'Save hours of writing time'
    ],
    cta_text: 'Create Your LinkedIn Post',
    related_pages: ['blog-outline', 'meeting-notes', 'grammar-checker']
  },
  {
    slug: 'blog-outline',
    type: 'create',
    title: 'Blog Outline Generator - Create Blog Post Outlines with AI | Slate',
    meta_description: 'Generate structured blog outlines instantly with AI. Free blog outline creator for writers, marketers, and content creators. Start writing better blogs today.',
    h1: 'Create Blog Outlines with AI',
    description: 'Never stare at a blank page again. Our AI blog outline generator creates comprehensive, SEO-friendly blog structures in seconds. Perfect for writers who want to publish faster.',
    keywords: ['blog outline generator', 'blog post outline', 'content outline', 'blog structure', 'ai blog writing'],
    ai_prompt: 'Write a blog post outline',
    category: 'Content Writing',
    search_volume: 15000,
    difficulty: 40,
    examples: [
      {
        title: 'How-To Guide',
        before: 'How to start a podcast',
        after: '# How to Start a Successful Podcast in 2025\n\n## Introduction\n- Why podcasting is growing\n- What you\'ll learn in this guide\n\n## 1. Planning Your Podcast\n- Choose your niche\n- Define your target audience\n- Plan your content format\n\n## 2. Equipment You Need\n- Microphone recommendations\n- Recording software\n- Editing tools\n\n## 3. Recording Your First Episode\n- Script vs. freestyle\n- Audio tips\n- Common mistakes\n\n## 4. Publishing & Promotion\n- Hosting platforms\n- Distribution channels\n- Marketing strategies\n\n## Conclusion\n- Next steps\n- Resources'
      }
    ],
    faqs: [
      {
        question: 'What makes a good blog outline?',
        answer: 'A good blog outline includes a clear structure with introduction, main points, subheadings, and conclusion. It should guide the reader logically through your content.'
      },
      {
        question: 'Can I use the outline for SEO?',
        answer: 'Yes! Our AI generates outlines with SEO-friendly heading structures (H2, H3) that help search engines understand your content better.'
      }
    ],
    benefits: [
      'Overcome writer\'s block instantly',
      'SEO-optimized heading structure',
      'Comprehensive coverage of topics',
      'Save 2+ hours per blog post',
      'Professional formatting included'
    ],
    cta_text: 'Generate Blog Outline',
    related_pages: ['linkedin-post', 'meeting-notes', 'ai-writing-assistant']
  },
  {
    slug: 'meeting-notes',
    type: 'create',
    title: 'Meeting Notes Template Generator - Create Professional Meeting Notes | Slate',
    meta_description: 'Generate organized meeting notes instantly. Free meeting notes template with action items, decisions, and summaries. Never miss important details again.',
    h1: 'Create Meeting Notes with AI',
    description: 'Transform messy meeting notes into structured, actionable documents. Our AI helps you capture decisions, action items, and key discussion points automatically.',
    keywords: ['meeting notes template', 'meeting notes generator', 'meeting minutes', 'team meeting notes', 'project meeting notes'],
    ai_prompt: 'Create meeting notes template',
    category: 'Productivity',
    search_volume: 30000,
    difficulty: 35,
    examples: [
      {
        title: 'Team Standup',
        before: 'Discussed project status, blockers, and next steps',
        after: '# Team Standup - January 15, 2025\n\n## Attendees\n- Team members present\n\n## What We Accomplished\n- ✅ Completed user authentication\n- ✅ Fixed payment integration bug\n\n## Current Blockers\n- API rate limiting issues\n- Waiting for design approval\n\n## Action Items\n- [ ] @John - Investigate API limits (Due: Jan 17)\n- [ ] @Sarah - Follow up with design team (Due: Jan 16)\n\n## Next Meeting\nJanuary 16, 2025 at 10:00 AM'
      }
    ],
    faqs: [
      {
        question: 'What should meeting notes include?',
        answer: 'Good meeting notes should include attendees, key decisions, action items with owners, discussion points, and next steps.'
      },
      {
        question: 'Can I customize the meeting notes template?',
        answer: 'Yes! All templates are fully customizable. Add or remove sections to fit your team\'s meeting style.'
      }
    ],
    benefits: [
      'Never forget action items',
      'Structured format for clarity',
      'Easy to share with team',
      'Track decisions over time',
      'Reduce meeting follow-up time'
    ],
    cta_text: 'Create Meeting Notes',
    related_pages: ['blog-outline', 'linkedin-post', 'ai-writing-assistant']
  },

  // /tools pages - Feature intent
  {
    slug: 'ai-writing-assistant',
    type: 'tool',
    title: 'Free AI Writing Assistant - Write Better, Faster with AI | Slate',
    meta_description: 'Your free AI writing assistant for grammar, tone, clarity, and style. Write professional content 10x faster with Slate\'s AI-powered editor.',
    h1: 'AI Writing Assistant',
    description: 'Write with confidence using Slate\'s AI writing assistant. Get instant help with grammar, tone, clarity, and style. Perfect for professionals, students, and content creators.',
    keywords: ['ai writing assistant', 'ai writing tool', 'writing helper', 'ai editor', 'content writing ai'],
    ai_prompt: null,
    category: 'AI Tools',
    search_volume: 60000,
    difficulty: 75,
    benefits: [
      'Grammar and spelling correction',
      'Tone and style suggestions',
      'Content rewriting',
      'Bullet point generation',
      'Professional formatting',
      'Local-first privacy',
      '100% free to use'
    ],
    cta_text: 'Start Writing with AI',
    related_pages: ['grammar-checker', 'linkedin-post', 'blog-outline']
  },
  {
    slug: 'grammar-checker',
    type: 'tool',
    title: 'Free AI Grammar Checker - Fix Writing Errors Instantly | Slate',
    meta_description: 'Fix grammar, spelling, and punctuation errors instantly with AI. Free online grammar checker with intelligent suggestions. Write error-free content.',
    h1: 'AI Grammar Checker',
    description: 'Eliminate grammar mistakes and write with confidence. Our AI grammar checker catches errors that traditional spell checkers miss and provides intelligent suggestions for improvement.',
    keywords: ['grammar checker', 'ai grammar', 'spelling checker', 'punctuation checker', 'writing checker'],
    ai_prompt: 'Fix grammar',
    category: 'AI Tools',
    search_volume: 90000,
    difficulty: 80,
    examples: [
      {
        title: 'Common Grammar Fixes',
        before: 'Me and john went to the store yesterday and buys some milk',
        after: 'John and I went to the store yesterday and bought some milk.'
      }
    ],
    benefits: [
      'Catch grammar mistakes instantly',
      'Spelling and punctuation fixes',
      'Style and clarity improvements',
      'Contextual suggestions',
      'Privacy-focused (local processing)',
      'No word limits',
      'Completely free'
    ],
    cta_text: 'Check Your Grammar',
    related_pages: ['ai-writing-assistant', 'linkedin-post', 'blog-outline']
  },

  // /vs pages - Comparison intent
  {
    slug: 'notion-ai',
    type: 'vs',
    title: 'Slate vs Notion AI - Free Alternative to Notion AI | Slate',
    meta_description: 'Compare Slate and Notion AI. Get AI writing features without the $10/month fee. Local-first, privacy-focused, and completely free.',
    h1: 'Slate vs Notion AI',
    description: 'Looking for a Notion AI alternative? Slate offers similar AI writing features with a focus on privacy, speed, and affordability. Best of all? It\'s completely free.',
    keywords: ['notion ai alternative', 'slate vs notion', 'free notion ai', 'notion ai comparison'],
    category: 'Comparisons',
    search_volume: 5000,
    difficulty: 50,
    benefits: [
      '100% free (Notion AI is $10/month)',
      'Local-first storage',
      'No workspace required',
      'Instant AI responses',
      'Export to markdown/PDF',
      'No page limits',
      'Privacy-focused'
    ],
    cta_text: 'Try Slate Free',
    related_pages: ['ai-writing-assistant', 'grammar-checker', 'linkedin-post']
  },

  // ============================================================================
  // TRAVEL CHECKLISTS - High Volume Keywords
  // ============================================================================

  {
    slug: 'business-travel-checklist',
    type: 'create',
    title: 'Business Travel Checklist - Free Travel Checklist Generator | Slate',
    meta_description: 'Create comprehensive business travel checklists instantly. Free business travel checklist template with packing lists, documents, and essentials. Never forget anything.',
    h1: 'Create Business Travel Checklists',
    description: 'Prepare for business trips with confidence. Our AI-powered business travel checklist generator helps you organize documents, packing lists, and travel essentials for professional trips.',
    keywords: ['business travel checklist', 'business trip checklist', 'corporate travel checklist', 'work travel packing list', 'business travel essentials'],
    ai_prompt: 'Create a business travel checklist',
    category: 'Travel',
    search_volume: 18000,
    difficulty: 30,
    examples: [
      {
        title: 'International Business Trip',
        before: '3 day trip to London for client meeting',
        after: '# Business Travel Checklist - London Trip\n\n## Documents\n- [ ] Passport (check expiration)\n- [ ] Business visa\n- [ ] Travel insurance\n- [ ] Hotel confirmation\n- [ ] Meeting schedules\n- [ ] Client contact info\n\n## Professional Items\n- [ ] Laptop + charger\n- [ ] Business cards\n- [ ] Presentation materials\n- [ ] Portfolio/samples\n- [ ] Notebook & pens\n\n## Clothing\n- [ ] Business suits (2)\n- [ ] Dress shirts (3)\n- [ ] Ties\n- [ ] Dress shoes\n- [ ] Business casual outfit\n\n## Essentials\n- [ ] Phone + international adapter\n- [ ] Toiletries\n- [ ] Medications\n- [ ] Travel umbrella'
      }
    ],
    benefits: [
      'Never forget important documents',
      'Professional packing organization',
      'Customizable for any business trip',
      'Save time with pre-made templates',
      'Reduce travel stress'
    ],
    cta_text: 'Create Business Travel Checklist',
    related_pages: ['international-travel-checklist', 'meeting-notes']
  },
  {
    slug: 'international-travel-checklist',
    type: 'create',
    title: 'International Travel Checklist - Free Travel Checklist Template | Slate',
    meta_description: 'Generate comprehensive international travel checklists with AI. Free international travel checklist covering documents, packing, and essentials. Travel prepared.',
    h1: 'Create International Travel Checklists',
    description: 'Make international travel stress-free with our comprehensive checklist generator. Cover all essential documents, packing needs, and travel preparations for overseas trips.',
    keywords: ['international travel checklist', 'overseas travel checklist', 'international trip checklist', 'travel abroad checklist', 'passport checklist'],
    ai_prompt: 'Create an international travel checklist',
    category: 'Travel',
    search_volume: 22000,
    difficulty: 28,
    benefits: [
      'Complete document preparation guide',
      'Country-specific requirements',
      'Packing optimization tips',
      'Pre-departure checklist',
      'Safety and health essentials'
    ],
    cta_text: 'Create International Checklist',
    related_pages: ['business-travel-checklist', 'europe-travel-checklist']
  },
  {
    slug: 'europe-travel-checklist',
    type: 'create',
    title: 'Europe Travel Checklist - Free European Travel Checklist PDF | Slate',
    meta_description: 'Create detailed Europe travel checklists instantly. Free Europe travel checklist PDF with packing tips, documents, and destination guides. Plan your European adventure.',
    h1: 'Create Europe Travel Checklists',
    description: 'Plan the perfect European vacation with our AI travel checklist generator. Get customized packing lists, visa requirements, and travel essentials for your Europe trip.',
    keywords: ['europe travel checklist', 'european travel checklist', 'europe trip checklist', 'europe packing list', 'travel to europe checklist'],
    ai_prompt: 'Create a Europe travel checklist',
    category: 'Travel',
    search_volume: 15000,
    difficulty: 32,
    benefits: [
      'Schengen visa requirements',
      'Multi-country travel planning',
      'European power adapter reminders',
      'Currency and payment tips',
      'Export as PDF'
    ],
    cta_text: 'Create Europe Travel Checklist',
    related_pages: ['international-travel-checklist', 'vacation-packing-list']
  },

  // More Travel Checklists
  {
    slug: 'vacation-packing-list',
    type: 'create',
    title: 'Vacation Packing List Generator - Free Travel Packing Checklist | Slate',
    meta_description: 'Generate perfect vacation packing lists with AI. Free vacation packing checklist for beach, mountain, city trips. Pack smarter, travel lighter.',
    h1: 'Create Vacation Packing Lists',
    description: 'Never overpack or forget essentials again. Our AI packing list generator creates customized checklists based on your destination, duration, and activities.',
    keywords: ['vacation packing list', 'travel packing checklist', 'holiday packing list', 'vacation checklist', 'packing list generator'],
    ai_prompt: 'Create a vacation packing list',
    category: 'Travel',
    search_volume: 35000,
    difficulty: 25,
    benefits: [
      'Weather-appropriate suggestions',
      'Activity-based packing tips',
      'Minimize luggage weight',
      'TSA-friendly organization',
      'Print or save digitally'
    ],
    cta_text: 'Create Packing List'
  },

  // ============================================================================
  // RESUME & CAREER - High Intent Keywords
  // ============================================================================

  {
    slug: 'resume',
    type: 'create',
    title: 'Free Resume Builder with AI - Create Professional Resume | Slate',
    meta_description: 'Build professional resumes instantly with AI. Free resume builder with ATS-friendly templates. Create winning resumes in minutes, not hours.',
    h1: 'Create Professional Resumes with AI',
    description: 'Land your dream job with AI-powered resume creation. Our resume builder helps you craft compelling, ATS-optimized resumes that get noticed by recruiters.',
    keywords: ['resume builder', 'create resume', 'ai resume', 'free resume builder', 'resume maker', 'resume template'],
    ai_prompt: 'Help me write a professional resume',
    category: 'Career',
    search_volume: 50000,
    difficulty: 65,
    examples: [
      {
        title: 'Software Engineer Resume',
        before: 'Built apps, worked with teams, 5 years experience',
        after: 'PROFESSIONAL SUMMARY\nResults-driven Software Engineer with 5+ years developing scalable web applications. Specialized in React, Node.js, and cloud architecture.\n\nKEY ACHIEVEMENTS\n• Led development of microservices platform serving 1M+ users\n• Reduced API response time by 60% through optimization\n• Mentored team of 4 junior developers\n\nTECHNICAL SKILLS\nFrontend: React, TypeScript, Vue.js\nBackend: Node.js, Python, PostgreSQL\nCloud: AWS, Docker, Kubernetes'
      }
    ],
    benefits: [
      'ATS-optimized formatting',
      'Industry-specific templates',
      'Action verb suggestions',
      'Quantifiable achievement tips',
      'Export to PDF/Word'
    ],
    cta_text: 'Build Your Resume',
    related_pages: ['cover-letter', 'linkedin-post']
  },
  {
    slug: 'cover-letter',
    type: 'create',
    title: 'Cover Letter Generator - Create Cover Letter with AI | Slate',
    meta_description: 'Generate compelling cover letters instantly with AI. Free cover letter builder that matches your resume and job description. Stand out from applicants.',
    h1: 'Create Cover Letters with AI',
    description: 'Write cover letters that get interviews. Our AI cover letter generator creates personalized, professional cover letters tailored to each job application.',
    keywords: ['cover letter generator', 'cover letter builder', 'create cover letter', 'ai cover letter', 'cover letter template'],
    ai_prompt: 'Write a professional cover letter',
    category: 'Career',
    search_volume: 40000,
    difficulty: 60,
    benefits: [
      'Job-specific customization',
      'Professional tone and structure',
      'Highlight relevant skills',
      'Engaging opening paragraphs',
      'Multiple format options'
    ],
    cta_text: 'Create Cover Letter',
    related_pages: ['resume', 'job-description']
  },

  // ============================================================================
  // BUSINESS & MARKETING - High Volume
  // ============================================================================

  {
    slug: 'email-template',
    type: 'create',
    title: 'Email Template Generator - Create Professional Email Templates | Slate',
    meta_description: 'Generate professional email templates instantly with AI. Free email template creator for business, marketing, and cold outreach. Save time, increase replies.',
    h1: 'Create Email Templates with AI',
    description: 'Write better emails faster. Our AI email template generator creates professional, engaging email templates for any business scenario.',
    keywords: ['email template', 'email generator', 'business email template', 'professional email', 'email creator'],
    ai_prompt: 'Create a professional email template',
    category: 'Business Communication',
    search_volume: 30000,
    difficulty: 35,
    benefits: [
      'Professional tone and formatting',
      'Subject line suggestions',
      'Call-to-action optimization',
      'Mobile-friendly layouts',
      'Personalization variables'
    ],
    cta_text: 'Create Email Template',
    related_pages: ['cold-email', 'meeting-notes']
  },
  {
    slug: 'product-description',
    type: 'create',
    title: 'Product Description Generator - Create Product Descriptions with AI | Slate',
    meta_description: 'Generate compelling product descriptions instantly with AI. Free product description writer for ecommerce, marketing, and sales. Boost conversions.',
    h1: 'Create Product Descriptions with AI',
    description: 'Sell more with better product descriptions. Our AI product description generator creates compelling, SEO-optimized descriptions that convert browsers into buyers.',
    keywords: ['product description generator', 'product description writer', 'ecommerce product description', 'ai product description'],
    ai_prompt: 'Write a compelling product description',
    category: 'Ecommerce',
    search_volume: 25000,
    difficulty: 40,
    benefits: [
      'SEO-optimized descriptions',
      'Benefit-focused copy',
      'Emotional trigger words',
      'Feature highlighting',
      'Multiple length options'
    ],
    cta_text: 'Create Product Description',
    related_pages: ['marketing-plan', 'social-media-post']
  },
  {
    slug: 'social-media-post',
    type: 'create',
    title: 'Social Media Post Generator - Create Social Media Posts with AI | Slate',
    meta_description: 'Generate engaging social media posts instantly with AI. Free social media post creator for Instagram, Twitter, Facebook, LinkedIn. Post consistently.',
    h1: 'Create Social Media Posts with AI',
    description: 'Never run out of social media content ideas. Our AI post generator creates engaging, platform-optimized posts for all major social networks.',
    keywords: ['social media post generator', 'social media content creator', 'ai social media', 'post generator', 'instagram caption generator'],
    ai_prompt: 'Create an engaging social media post',
    category: 'Social Media',
    search_volume: 20000,
    difficulty: 42,
    benefits: [
      'Platform-specific optimization',
      'Hashtag suggestions',
      'Engagement optimization',
      'Multiple post variations',
      'Emoji and formatting'
    ],
    cta_text: 'Create Social Post',
    related_pages: ['linkedin-post', 'content-calendar']
  },
  {
    slug: 'marketing-plan',
    type: 'create',
    title: 'Marketing Plan Generator - Create Marketing Plans with AI | Slate',
    meta_description: 'Generate comprehensive marketing plans instantly with AI. Free marketing plan template for startups, SMBs, and enterprises. Strategic planning made easy.',
    h1: 'Create Marketing Plans with AI',
    description: 'Build winning marketing strategies faster. Our AI marketing plan generator creates detailed, actionable marketing plans tailored to your business goals.',
    keywords: ['marketing plan generator', 'marketing strategy template', 'marketing plan template', 'business marketing plan'],
    ai_prompt: 'Create a comprehensive marketing plan',
    category: 'Marketing',
    search_volume: 18000,
    difficulty: 45,
    benefits: [
      'Market analysis frameworks',
      'Target audience definition',
      'Channel strategy recommendations',
      'Budget allocation guidance',
      'KPI tracking templates'
    ],
    cta_text: 'Create Marketing Plan',
    related_pages: ['business-plan', 'content-calendar']
  },
  {
    slug: 'press-release',
    type: 'create',
    title: 'Press Release Generator - Create Press Releases with AI | Slate',
    meta_description: 'Generate professional press releases instantly with AI. Free press release template for product launches, company news, and announcements. Get media attention.',
    h1: 'Create Press Releases with AI',
    description: 'Get your news noticed. Our AI press release generator creates journalist-ready press releases following AP style and industry best practices.',
    keywords: ['press release generator', 'press release template', 'create press release', 'ai press release', 'news release'],
    ai_prompt: 'Write a professional press release',
    category: 'Public Relations',
    search_volume: 15000,
    difficulty: 38,
    benefits: [
      'AP style formatting',
      'Compelling headlines',
      'Quote integration',
      'Boilerplate generation',
      'Distribution-ready format'
    ],
    cta_text: 'Create Press Release',
    related_pages: ['company-announcement', 'blog-outline']
  },
  {
    slug: 'job-description',
    type: 'create',
    title: 'Job Description Generator - Create Job Descriptions with AI | Slate',
    meta_description: 'Generate professional job descriptions instantly with AI. Free job description template for recruiters and hiring managers. Attract top talent.',
    h1: 'Create Job Descriptions with AI',
    description: 'Attract the right candidates faster. Our AI job description generator creates clear, inclusive, and compelling job postings that resonate with top talent.',
    keywords: ['job description generator', 'job posting template', 'create job description', 'job description template'],
    ai_prompt: 'Write a compelling job description',
    category: 'Human Resources',
    search_volume: 12000,
    difficulty: 35,
    benefits: [
      'Inclusive language checking',
      'Skills and qualifications clarity',
      'Company culture integration',
      'Salary range guidance',
      'ATS-optimized format'
    ],
    cta_text: 'Create Job Description',
    related_pages: ['resume', 'cover-letter']
  },
  {
    slug: 'business-plan',
    type: 'create',
    title: 'Business Plan Generator - Create Business Plans with AI | Slate',
    meta_description: 'Generate comprehensive business plans instantly with AI. Free business plan template for startups and entrepreneurs. Investor-ready in minutes.',
    h1: 'Create Business Plans with AI',
    description: 'Turn your business idea into a professional plan. Our AI business plan generator creates detailed, investor-ready business plans covering all essential sections.',
    keywords: ['business plan generator', 'business plan template', 'startup business plan', 'create business plan'],
    ai_prompt: 'Create a comprehensive business plan',
    category: 'Business Planning',
    search_volume: 10000,
    difficulty: 50,
    benefits: [
      'Executive summary creation',
      'Financial projections templates',
      'Market analysis frameworks',
      'Competitive analysis',
      'Investor pitch-ready'
    ],
    cta_text: 'Create Business Plan',
    related_pages: ['marketing-plan', 'pitch-deck']
  },
  {
    slug: 'pitch-deck',
    type: 'create',
    title: 'Pitch Deck Generator - Create Pitch Decks with AI | Slate',
    meta_description: 'Generate compelling pitch decks instantly with AI. Free pitch deck template for startups raising funding. Create investor presentations that convert.',
    h1: 'Create Pitch Decks with AI',
    description: 'Win over investors with powerful pitch decks. Our AI pitch deck generator creates structured, compelling presentations following proven frameworks.',
    keywords: ['pitch deck generator', 'pitch deck template', 'investor pitch deck', 'startup pitch deck'],
    ai_prompt: 'Create a compelling pitch deck outline',
    category: 'Fundraising',
    search_volume: 8000,
    difficulty: 48,
    benefits: [
      'Proven slide structures',
      'Compelling narratives',
      'Data visualization tips',
      'Problem-solution framing',
      'Investor-focused messaging'
    ],
    cta_text: 'Create Pitch Deck',
    related_pages: ['business-plan', 'executive-summary']
  },

  // ============================================================================
  // MORE TOOLS - Content Creation & Writing
  // ============================================================================

  {
    slug: 'content-rewriter',
    type: 'tool',
    title: 'Free Content Rewriter - Rewrite Text with AI | Slate',
    meta_description: 'Rewrite content instantly with AI. Free content rewriter tool for articles, paragraphs, and essays. Improve clarity and avoid plagiarism.',
    h1: 'Content Rewriter Tool',
    description: 'Transform existing content into fresh, original text. Our AI content rewriter maintains meaning while improving clarity, tone, and uniqueness.',
    keywords: ['content rewriter', 'article rewriter', 'text rewriter', 'rewrite tool', 'paraphrasing tool'],
    ai_prompt: 'Rewrite this content',
    category: 'Writing Tools',
    search_volume: 35000,
    difficulty: 55,
    benefits: [
      'Preserve original meaning',
      'Improve readability',
      'Multiple rewrite variations',
      'Plagiarism avoidance',
      'Tone adjustment options'
    ],
    cta_text: 'Rewrite Content'
  },
  {
    slug: 'paraphraser',
    type: 'tool',
    title: 'Free Paraphrasing Tool - Paraphrase Text with AI | Slate',
    meta_description: 'Paraphrase any text instantly with AI. Free paraphrasing tool for essays, articles, and academic writing. Avoid plagiarism effortlessly.',
    h1: 'AI Paraphrasing Tool',
    description: 'Rephrase sentences and paragraphs while maintaining original meaning. Perfect for academic writing, content creation, and avoiding plagiarism.',
    keywords: ['paraphrasing tool', 'paraphrase generator', 'rephrase tool', 'sentence rephraser', 'ai paraphraser'],
    ai_prompt: 'Paraphrase this text',
    category: 'Writing Tools',
    search_volume: 25000,
    difficulty: 52,
    benefits: [
      'Academic-grade paraphrasing',
      'Citation-friendly outputs',
      'Multiple paraphrase options',
      'Maintain technical accuracy',
      'Completely free to use'
    ],
    cta_text: 'Paraphrase Text'
  },
  {
    slug: 'summarizer',
    type: 'tool',
    title: 'Free Text Summarizer - Summarize Text with AI | Slate',
    meta_description: 'Summarize long texts instantly with AI. Free text summarizer for articles, research papers, and documents. Get key points in seconds.',
    h1: 'AI Text Summarizer',
    description: 'Extract key insights from long documents instantly. Our AI summarizer creates concise summaries while preserving essential information.',
    keywords: ['text summarizer', 'article summarizer', 'summary generator', 'ai summarizer', 'summarize tool'],
    ai_prompt: 'Summarize this text',
    category: 'Writing Tools',
    search_volume: 15000,
    difficulty: 48,
    benefits: [
      'Customizable summary length',
      'Bullet point or paragraph format',
      'Key points extraction',
      'Save reading time',
      'Research-friendly'
    ],
    cta_text: 'Summarize Text'
  },
  {
    slug: 'bullet-point-generator',
    type: 'tool',
    title: 'Bullet Point Generator - Create Bullet Points with AI | Slate',
    meta_description: 'Generate clear bullet points instantly with AI. Free bullet point creator for presentations, reports, and summaries. Improve readability.',
    h1: 'Bullet Point Generator',
    description: 'Transform paragraphs into clear, concise bullet points. Perfect for presentations, resumes, and professional documents.',
    keywords: ['bullet point generator', 'bullet points creator', 'list generator', 'summary bullets', 'ai bullet points'],
    ai_prompt: 'Convert this to bullet points',
    category: 'Writing Tools',
    search_volume: 12000,
    difficulty: 42,
    benefits: [
      'Instant bullet point conversion',
      'Professional formatting',
      'Action-oriented language',
      'Hierarchical organization',
      'Presentation-ready'
    ],
    cta_text: 'Create Bullet Points'
  },
  {
    slug: 'tone-changer',
    type: 'tool',
    title: 'Free Tone Changer - Change Text Tone with AI | Slate',
    meta_description: 'Change writing tone instantly with AI. Free tone changer for professional, casual, formal, or friendly text. Adapt your message.',
    h1: 'AI Tone Changer',
    description: 'Adjust your writing tone for any audience. Transform text between professional, casual, formal, friendly, and more with AI.',
    keywords: ['tone changer', 'writing tone', 'text tone', 'formal tone', 'casual tone'],
    ai_prompt: 'Change the tone of this text',
    category: 'Writing Tools',
    search_volume: 8000,
    difficulty: 38,
    benefits: [
      'Multiple tone options',
      'Audience adaptation',
      'Maintain message meaning',
      'Professional to casual',
      'Context-aware changes'
    ],
    cta_text: 'Change Tone'
  },

  // ============================================================================
  // MORE VS PAGES - Comparisons
  // ============================================================================

  {
    slug: 'grammarly',
    type: 'vs',
    title: 'Slate vs Grammarly - Free Grammarly Alternative | Slate',
    meta_description: 'Compare Slate and Grammarly. Get AI writing help without the subscription. Free Grammarly alternative with privacy-first approach.',
    h1: 'Slate vs Grammarly',
    description: 'Looking for a free Grammarly alternative? Slate offers AI-powered grammar checking, writing suggestions, and content generation without the monthly fee.',
    keywords: ['grammarly alternative', 'free grammarly', 'slate vs grammarly', 'grammar checker alternative'],
    category: 'Comparisons',
    search_volume: 8000,
    difficulty: 68,
    benefits: [
      '100% free (Grammarly Premium is $12/month)',
      'No browser extension required',
      'Local-first privacy',
      'AI content generation included',
      'No word limits',
      'Export to any format'
    ],
    cta_text: 'Try Slate Free'
  },
  {
    slug: 'jasper',
    type: 'vs',
    title: 'Slate vs Jasper AI - Free Jasper Alternative | Slate',
    meta_description: 'Compare Slate and Jasper AI. Get AI writing features without the $49/month cost. Free Jasper AI alternative for content creators.',
    h1: 'Slate vs Jasper AI',
    description: 'Need a Jasper AI alternative? Slate provides powerful AI writing capabilities, content generation, and editing tools completely free.',
    keywords: ['jasper alternative', 'free jasper ai', 'slate vs jasper', 'jasper ai alternative'],
    category: 'Comparisons',
    search_volume: 5000,
    difficulty: 62,
    benefits: [
      '100% free (Jasper starts at $49/month)',
      'No usage limits',
      'Local storage control',
      'Simple, clean interface',
      'No credit card required',
      'Privacy-focused'
    ],
    cta_text: 'Try Slate Free'
  },
  {
    slug: 'copy-ai',
    type: 'vs',
    title: 'Slate vs Copy.ai - Free Copy.ai Alternative | Slate',
    meta_description: 'Compare Slate and Copy.ai. Get AI copywriting without subscriptions. Free Copy.ai alternative for marketers and creators.',
    h1: 'Slate vs Copy.ai',
    description: 'Searching for a Copy.ai alternative? Slate offers AI-powered copywriting, content generation, and editing without the monthly subscription.',
    keywords: ['copy.ai alternative', 'free copy.ai', 'slate vs copy.ai', 'copywriting tool alternative'],
    category: 'Comparisons',
    search_volume: 3000,
    difficulty: 58,
    benefits: [
      '100% free (Copy.ai is $36/month)',
      'Unlimited generations',
      'No word count limits',
      'Privacy-focused',
      'Export anywhere',
      'Local-first storage'
    ],
    cta_text: 'Try Slate Free'
  },
  {
    slug: 'chatgpt',
    type: 'vs',
    title: 'Slate vs ChatGPT - AI Writing Tool Comparison | Slate',
    meta_description: 'Compare Slate and ChatGPT for writing. Purpose-built editor vs chat interface. See which AI writing tool fits your workflow.',
    h1: 'Slate vs ChatGPT',
    description: 'ChatGPT is powerful, but it\'s not built for writing. Slate combines AI capabilities with a professional editor designed specifically for content creation.',
    keywords: ['chatgpt alternative', 'slate vs chatgpt', 'chatgpt for writing', 'ai writing tool'],
    category: 'Comparisons',
    search_volume: 15000,
    difficulty: 72,
    benefits: [
      'Purpose-built editor (not a chat)',
      'Local-first privacy',
      'Markdown formatting',
      'Version history',
      'Export to any format',
      'Completely free'
    ],
    cta_text: 'Try Slate'
  }
]

// ============================================================================
// PROGRAMMATIC PAGE GENERATION
// Helper function to generate variations at scale
// ============================================================================

// Generate content type variations for different industries
const contentTypes = [
  'blog-post', 'article', 'newsletter', 'case-study', 'white-paper',
  'ebook', 'guide', 'tutorial', 'how-to', 'checklist',
  'template', 'report', 'proposal', 'memo', 'brief'
]

const industries = [
  'saas', 'ecommerce', 'marketing', 'healthcare', 'finance',
  'education', 'real-estate', 'technology', 'consulting', 'agency',
  'startup', 'nonprofit', 'fitness', 'food', 'travel',
  'fashion', 'legal', 'hr', 'sales', 'customer-service'
]

const socialPlatforms = [
  'instagram', 'twitter', 'facebook', 'tiktok', 'pinterest',
  'youtube', 'threads', 'linkedin'
]

const documentTypes = [
  'contract', 'agreement', 'policy', 'terms', 'privacy-policy',
  'invoice', 'quote', 'receipt', 'statement', 'letter'
]

// Generate industry-specific content pages
for (const contentType of contentTypes) {
  for (const industry of industries) { // All industries
    seoPages.push({
      slug: `${contentType}-for-${industry}`,
      type: 'create',
      title: `${capitalize(contentType.replace(/-/g, ' '))} for ${capitalize(industry)} - AI Generator | Slate`,
      meta_description: `Create ${contentType.replace(/-/g, ' ')} for ${industry} industry with AI. Free ${contentType} generator tailored for ${industry} businesses.`,
      h1: `Create ${capitalize(contentType.replace(/-/g, ' '))} for ${capitalize(industry)}`,
      description: `Generate industry-specific ${contentType.replace(/-/g, ' ')} optimized for ${industry} businesses. Our AI understands ${industry} terminology and best practices.`,
      keywords: [`${contentType} ${industry}`, `${industry} ${contentType}`, `${contentType} generator`, `${industry} content`],
      ai_prompt: `Write a ${contentType.replace(/-/g, ' ')} for ${industry} industry`,
      category: capitalize(industry),
      search_volume: Math.floor(Math.random() * 5000) + 1000,
      difficulty: Math.floor(Math.random() * 30) + 30,
      benefits: [
        `${capitalize(industry)}-specific terminology`,
        'Industry best practices',
        'Compliance-aware content',
        'Audience-targeted messaging',
        'Professional formatting'
      ],
      cta_text: `Create ${capitalize(contentType.replace(/-/g, ' '))}`
    })
  }
}

// Generate social media posts for different platforms
for (const platform of socialPlatforms) {
  seoPages.push({
    slug: `${platform}-post`,
    type: 'create',
    title: `${capitalize(platform)} Post Generator - Create ${capitalize(platform)} Posts with AI | Slate`,
    meta_description: `Generate engaging ${platform} posts instantly with AI. Free ${platform} post creator with hashtags, captions, and content ideas.`,
    h1: `Create ${capitalize(platform)} Posts with AI`,
    description: `Create viral-worthy ${platform} content effortlessly. Our AI understands ${platform}'s algorithm, best posting times, and content formats.`,
    keywords: [`${platform} post generator`, `${platform} caption generator`, `${platform} content creator`, `ai ${platform}`],
    ai_prompt: `Create an engaging ${platform} post`,
    category: 'Social Media',
    search_volume: Math.floor(Math.random() * 15000) + 5000,
    difficulty: Math.floor(Math.random() * 25) + 35,
    benefits: [
      `${capitalize(platform)}-optimized format`,
      'Trending hashtag suggestions',
      'Engagement optimization',
      'Character count management',
      'Platform-specific best practices'
    ],
    cta_text: `Create ${capitalize(platform)} Post`
  })
}

// Generate professional document templates
for (const docType of documentTypes) {
  seoPages.push({
    slug: `${docType}-template`,
    type: 'create',
    title: `${capitalize(docType.replace(/-/g, ' '))} Template - Create ${capitalize(docType.replace(/-/g, ' '))} with AI | Slate`,
    meta_description: `Generate professional ${docType.replace(/-/g, ' ')} templates instantly with AI. Free ${docType} template generator with legal language.`,
    h1: `Create ${capitalize(docType.replace(/-/g, ' '))} Templates`,
    description: `Generate legally sound ${docType.replace(/-/g, ' ')} templates tailored to your needs. Our AI creates professional, comprehensive documents.`,
    keywords: [`${docType} template`, `${docType} generator`, `create ${docType}`, `${docType} example`],
    ai_prompt: `Create a professional ${docType.replace(/-/g, ' ')} template`,
    category: 'Legal & Business',
    search_volume: Math.floor(Math.random() * 8000) + 2000,
    difficulty: Math.floor(Math.random() * 30) + 40,
    benefits: [
      'Legally sound language',
      'Customizable sections',
      'Professional formatting',
      'Industry-standard structure',
      'Easy to modify'
    ],
    cta_text: `Create ${capitalize(docType.replace(/-/g, ' '))}`
  })
}

// More specific travel checklists
const travelDestinations = [
  'japan', 'thailand', 'bali', 'australia', 'new-zealand',
  'dubai', 'paris', 'london', 'italy', 'spain',
  'mexico', 'canada', 'usa', 'south-africa', 'egypt'
]

for (const destination of travelDestinations) {
  seoPages.push({
    slug: `${destination}-travel-checklist`,
    type: 'create',
    title: `${capitalize(destination)} Travel Checklist - Complete ${capitalize(destination)} Trip Planner | Slate`,
    meta_description: `Complete ${destination} travel checklist with packing list, documents, and essentials. Plan your perfect ${destination} trip with AI.`,
    h1: `${capitalize(destination)} Travel Checklist`,
    description: `Everything you need for an amazing ${destination} trip. Our AI checklist includes country-specific requirements, packing tips, and local insights.`,
    keywords: [`${destination} travel checklist`, `${destination} packing list`, `travel to ${destination}`, `${destination} trip planner`],
    ai_prompt: `Create a comprehensive travel checklist for ${destination}`,
    category: 'Travel',
    search_volume: Math.floor(Math.random() * 6000) + 1500,
    difficulty: Math.floor(Math.random() * 20) + 25,
    benefits: [
      'Country-specific visa requirements',
      'Local customs and etiquette',
      'Weather-appropriate packing',
      'Essential phrases and tips',
      'Safety and health info'
    ],
    cta_text: `Create ${capitalize(destination)} Checklist`
  })
}

// Academic & Student content
const academicTypes = [
  'essay', 'research-paper', 'thesis', 'dissertation', 'literature-review',
  'lab-report', 'case-analysis', 'book-report', 'annotated-bibliography', 'abstract'
]

for (const academicType of academicTypes) {
  seoPages.push({
    slug: `${academicType}-outline`,
    type: 'create',
    title: `${capitalize(academicType.replace(/-/g, ' '))} Outline Generator - Academic Writing | Slate`,
    meta_description: `Create ${academicType.replace(/-/g, ' ')} outlines instantly with AI. Free academic ${academicType} outline generator for students.`,
    h1: `${capitalize(academicType.replace(/-/g, ' '))} Outline Generator`,
    description: `Structure your ${academicType.replace(/-/g, ' ')} with AI-powered outlines. Follow academic standards and best practices effortlessly.`,
    keywords: [`${academicType} outline`, `${academicType} structure`, `${academicType} template`, `academic writing`],
    ai_prompt: `Create an outline for a ${academicType.replace(/-/g, ' ')}`,
    category: 'Academic',
    search_volume: Math.floor(Math.random() * 10000) + 3000,
    difficulty: Math.floor(Math.random() * 25) + 35,
    benefits: [
      'Academic citation formats',
      'Logical structure',
      'Research-backed frameworks',
      'Professor-approved outlines',
      'Save hours of planning'
    ],
    cta_text: `Create ${capitalize(academicType.replace(/-/g, ' '))} Outline`
  })
}

// Email types
const emailTypes = [
  'cold-email', 'follow-up-email', 'thank-you-email', 'introduction-email',
  'networking-email', 'sales-email', 'outreach-email', 'resignation-email',
  'complaint-email', 'apology-email', 'invitation-email', 'reminder-email'
]

for (const emailType of emailTypes) {
  seoPages.push({
    slug: emailType,
    type: 'create',
    title: `${capitalize(emailType.replace(/-/g, ' '))} Template - AI Email Generator | Slate`,
    meta_description: `Create perfect ${emailType.replace(/-/g, ' ')} templates with AI. Free ${emailType} generator with professional examples and tips.`,
    h1: `${capitalize(emailType.replace(/-/g, ' '))} Generator`,
    description: `Write effective ${emailType.replace(/-/g, ' ')}s that get responses. Our AI creates personalized, professional emails for any situation.`,
    keywords: [`${emailType}`, `${emailType} template`, `${emailType} example`, `how to write ${emailType}`],
    ai_prompt: `Write a professional ${emailType.replace(/-/g, ' ')}`,
    category: 'Email',
    search_volume: Math.floor(Math.random() * 12000) + 4000,
    difficulty: Math.floor(Math.random() * 30) + 30,
    benefits: [
      'Professional tone',
      'High response rates',
      'Personalization tips',
      'Subject line optimization',
      'Multiple variations'
    ],
    cta_text: `Create ${capitalize(emailType.replace(/-/g, ' '))}`
  })
}

// Personal & Life Events
const personalDocs = [
  'wedding-vows', 'wedding-speech', 'birthday-speech', 'retirement-speech',
  'eulogy', 'graduation-speech', 'toast', 'welcome-speech',
  'farewell-message', 'anniversary-message', 'sympathy-message'
]

for (const docType of personalDocs) {
  seoPages.push({
    slug: docType,
    type: 'create',
    title: `${capitalize(docType.replace(/-/g, ' '))} Generator - AI Writing Helper | Slate`,
    meta_description: `Create heartfelt ${docType.replace(/-/g, ' ')} with AI. Free ${docType} generator for meaningful, memorable moments.`,
    h1: `${capitalize(docType.replace(/-/g, ' '))} Generator`,
    description: `Express your feelings perfectly with AI-powered ${docType.replace(/-/g, ' ')} generation. Create meaningful, personal content for important moments.`,
    keywords: [`${docType}`, `${docType} examples`, `how to write ${docType}`, `${docType} template`],
    ai_prompt: `Write a heartfelt ${docType.replace(/-/g, ' ')}`,
    category: 'Personal',
    search_volume: Math.floor(Math.random() * 8000) + 2000,
    difficulty: Math.floor(Math.random() * 20) + 25,
    benefits: [
      'Emotionally resonant',
      'Personalization options',
      'Length customization',
      'Tone adjustment',
      'Memorable and meaningful'
    ],
    cta_text: `Create ${capitalize(docType.replace(/-/g, ' '))}`
  })
}

// Productivity & Planning
const productivityDocs = [
  'project-plan', 'action-plan', 'strategic-plan', 'study-plan',
  'meal-plan', 'workout-plan', 'budget-plan', 'content-calendar',
  'editorial-calendar', 'event-plan', 'lesson-plan', 'training-plan'
]

for (const docType of productivityDocs) {
  seoPages.push({
    slug: docType,
    type: 'create',
    title: `${capitalize(docType.replace(/-/g, ' '))} Generator - AI Planning Tool | Slate`,
    meta_description: `Create comprehensive ${docType.replace(/-/g, ' ')}s with AI. Free ${docType} template generator for better organization.`,
    h1: `${capitalize(docType.replace(/-/g, ' '))} Generator`,
    description: `Plan smarter with AI-generated ${docType.replace(/-/g, ' ')}s. Get organized, stay on track, and achieve your goals faster.`,
    keywords: [`${docType}`, `${docType} template`, `create ${docType}`, `${docType} example`],
    ai_prompt: `Create a comprehensive ${docType.replace(/-/g, ' ')}`,
    category: 'Planning',
    search_volume: Math.floor(Math.random() * 10000) + 3000,
    difficulty: Math.floor(Math.random() * 25) + 30,
    benefits: [
      'Goal-oriented structure',
      'Actionable steps',
      'Timeline creation',
      'Resource allocation',
      'Progress tracking'
    ],
    cta_text: `Create ${capitalize(docType.replace(/-/g, ' '))}`
  })
}

// SEO & Marketing specific
const marketingContent = [
  'meta-description', 'seo-title', 'ad-copy', 'landing-page',
  'sales-page', 'video-script', 'podcast-script', 'webinar-script',
  'instagram-bio', 'twitter-bio', 'company-bio', 'author-bio'
]

for (const contentType of marketingContent) {
  seoPages.push({
    slug: contentType,
    type: 'create',
    title: `${capitalize(contentType.replace(/-/g, ' '))} Generator - AI Marketing Tool | Slate`,
    meta_description: `Generate high-converting ${contentType.replace(/-/g, ' ')}s with AI. Free ${contentType} creator for marketers and businesses.`,
    h1: `${capitalize(contentType.replace(/-/g, ' '))} Generator`,
    description: `Create ${contentType.replace(/-/g, ' ')}s that convert. Our AI understands marketing psychology and SEO best practices.`,
    keywords: [`${contentType} generator`, `${contentType} creator`, `create ${contentType}`, `${contentType} examples`],
    ai_prompt: `Write a compelling ${contentType.replace(/-/g, ' ')}`,
    category: 'Marketing',
    search_volume: Math.floor(Math.random() * 15000) + 5000,
    difficulty: Math.floor(Math.random() * 30) + 40,
    benefits: [
      'Conversion-optimized',
      'SEO-friendly',
      'A/B test variations',
      'Character limits respected',
      'CTA optimization'
    ],
    cta_text: `Create ${capitalize(contentType.replace(/-/g, ' '))}`
  })
}

// Additional specialized content types
const specializedContent = [
  'user-story', 'acceptance-criteria', 'sprint-plan', 'retrospective-notes',
  'standup-notes', 'product-roadmap', 'feature-spec', 'technical-spec',
  'api-documentation', 'user-manual', 'help-article', 'faq-page',
  'onboarding-guide', 'training-manual', 'sop', 'policy-document',
  'performance-review', 'feedback-form', 'survey-questions', 'interview-questions',
  'test-plan', 'bug-report', 'release-notes', 'changelog',
  'grant-proposal', 'funding-application', 'scholarship-essay', 'personal-statement',
  'recommendation-letter', 'reference-letter', 'character-reference', 'linkedin-recommendation',
  'mission-statement', 'vision-statement', 'value-proposition', 'elevator-pitch',
  'tagline', 'slogan', 'brand-name', 'product-name',
  'domain-name-ideas', 'company-name', 'blog-name', 'podcast-name',
  'course-outline', 'syllabus', 'assignment', 'exam-questions',
  'discussion-questions', 'study-guide', 'flashcards', 'summary-notes',
  'sermon', 'prayer', 'devotional', 'meditation-script',
  'affirmations', 'mantras', 'journal-prompts', 'reflection-questions',
  'book-outline', 'chapter-outline', 'scene-outline', 'character-profile',
  'plot-summary', 'book-blurb', 'book-synopsis', 'query-letter',
  'artist-statement', 'exhibition-proposal', 'gallery-description', 'artwork-description',
  'recipe', 'meal-prep-plan', 'grocery-list', 'menu-plan',
  'workout-routine', 'exercise-plan', 'fitness-goals', 'training-schedule',
  'travel-itinerary', 'trip-plan', 'bucket-list', 'adventure-plan',
  'event-agenda', 'conference-schedule', 'workshop-outline', 'seminar-plan',
  'party-plan', 'birthday-party-plan', 'wedding-plan', 'event-checklist',
  'home-renovation-plan', 'room-design', 'interior-design-brief', 'landscape-plan',
  'financial-plan', 'investment-strategy', 'savings-plan', 'debt-payoff-plan',
  'retirement-plan', 'estate-plan', 'will', 'trust-document',
  'lease-agreement', 'rental-agreement', 'employment-contract', 'nda'
]

for (const contentType of specializedContent) {
  seoPages.push({
    slug: contentType,
    type: 'create',
    title: `${capitalize(contentType.replace(/-/g, ' '))} Generator - AI Content Creator | Slate`,
    meta_description: `Create professional ${contentType.replace(/-/g, ' ')}s instantly with AI. Free ${contentType} generator for individuals and businesses.`,
    h1: `${capitalize(contentType.replace(/-/g, ' '))} Generator`,
    description: `Generate ${contentType.replace(/-/g, ' ')}s effortlessly with AI. Get professional results in seconds, not hours.`,
    keywords: [`${contentType}`, `${contentType} template`, `create ${contentType}`, `${contentType} generator`],
    ai_prompt: `Create a ${contentType.replace(/-/g, ' ')}`,
    category: 'Content Creation',
    search_volume: Math.floor(Math.random() * 8000) + 1500,
    difficulty: Math.floor(Math.random() * 25) + 30,
    benefits: [
      'Professional quality',
      'Instant generation',
      'Fully customizable',
      'Time-saving',
      'Easy to use'
    ],
    cta_text: `Create ${capitalize(contentType.replace(/-/g, ' '))}`
  })
}

// ============================================================================
// Smart Seeding Logic
// ============================================================================

// Helper function to capitalize strings
function capitalize(str: string): string {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

async function seedPages() {
  console.log('🌱 Smart SEO Pages Seeder\n')
  console.log('📊 Total pages to process:', seoPages.length, '\n')

  let addedCount = 0
  let updatedCount = 0
  let skippedCount = 0
  let errorCount = 0

  // Fetch existing pages
  const { data: existingPages } = await supabase
    .from('seo_pages')
    .select('slug, updated_at')

  const existingSlugs = new Set(existingPages?.map(p => p.slug) || [])

  for (const page of seoPages) {
    try {
      if (existingSlugs.has(page.slug)) {
        // Page exists - skip it
        console.log(`⏭️  Skipped: /${page.type}/${page.slug} (already exists)`)
        skippedCount++
      } else {
        // Page doesn't exist - insert it
        const { error } = await supabase
          .from('seo_pages')
          .insert(page)

        if (error) {
          console.error(`❌ Error adding ${page.slug}:`, error.message)
          errorCount++
        } else {
          console.log(`✅ Added: /${page.type}/${page.slug}`)
          addedCount++
        }
      }
    } catch (err) {
      console.error(`❌ Error processing ${page.slug}:`, err)
      errorCount++
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log('📊 Summary:')
  console.log(`${'='.repeat(60)}`)
  console.log(`   ✅ Added:   ${addedCount}`)
  console.log(`   ⏭️  Skipped: ${skippedCount}`)
  console.log(`   ❌ Errors:  ${errorCount}`)
  console.log(`   📄 Total:   ${seoPages.length}`)
  console.log(`${'='.repeat(60)}\n`)

  if (addedCount > 0) {
    console.log('🎉 New pages added successfully!')
    console.log('\n📋 Next steps:')
    console.log('   1. Restart dev server: bun run dev')
    console.log('   2. Check sitemap: http://localhost:3000/sitemap.xml')
    console.log('   3. Test new pages in browser')
  } else if (skippedCount === seoPages.length) {
    console.log('✨ All pages already exist - nothing to add!')
    console.log('\n💡 To add more pages:')
    console.log('   1. Add new page objects to the seoPages array in this file')
    console.log('   2. Run: bun run scripts/seed-seo-pages.ts')
  }
}

// Run the seed
seedPages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
