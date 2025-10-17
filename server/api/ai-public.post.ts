import OpenAI from 'openai';
import { useRuntimeConfig, defineEventHandler, readBody, createError } from '#imports';
import { formatTipTapHtml } from '@/server/utils/formats';

// Define type for system prompts
interface SystemPrompts {
  grammar: string;
  linkedin: string;
  bullets: string;
  checklist: string;
  plan: string;
  survey: string;
  numbered: string;
  blogoutline: string;
  meetingnotes: string;
  [key: string]: string;
}

// System prompts for different scenarios
const SYSTEM_PROMPTS: SystemPrompts = {
  grammar: "You are a professional editor. Fix grammar and improve clarity while maintaining the original meaning. Format your response with proper paragraphs.",
  linkedin: "You are a LinkedIn content expert. Make the text more professional and engaging for a LinkedIn audience. Use proper paragraphs and formatting.",
  bullets: "Convert the text into well-organized bullet points. Start each bullet point with '•' on a new line.",
  checklist: "Create a comprehensive checklist. Start each item with a checkbox on a new line and organize items logically.",
  plan: "Create a detailed plan. Use '# ' for main headings, '## ' for subheadings, and '•' for bullet points.",
  survey: "Create a well-structured survey. Use '## ' for sections and numbered items (1., 2., etc.) for questions.",
  numbered: "Convert the text into well-organized numbered items.",
  blogoutline: "Create a detailed blog post outline with introduction, main sections with H2 headings, subsections with H3 headings, and a conclusion. Make it SEO-friendly and comprehensive.",
  meetingnotes: "Create well-structured meeting notes with sections for attendees, key decisions, action items, and next steps. Use checkboxes for action items."
};

/**
 * Gets the appropriate system prompt based on the user's request
 */
function getSystemPrompt(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  if (promptLower.includes('grammar')) return SYSTEM_PROMPTS.grammar;
  if (promptLower.includes('linkedin')) return SYSTEM_PROMPTS.linkedin;
  if (promptLower.includes('bullet')) return SYSTEM_PROMPTS.bullets;
  if (promptLower.includes('numbered')) return SYSTEM_PROMPTS.numbered;
  if (promptLower.includes('checklist')) return SYSTEM_PROMPTS.checklist;
  if (promptLower.includes('plan')) return SYSTEM_PROMPTS.plan;
  if (promptLower.includes('survey')) return SYSTEM_PROMPTS.survey;
  if (promptLower.includes('blog') && promptLower.includes('outline')) return SYSTEM_PROMPTS.blogoutline;
  if (promptLower.includes('meeting') && promptLower.includes('notes')) return SYSTEM_PROMPTS.meetingnotes;
  return "You are a helpful writing assistant. Format your response in proper markdown with appropriate headings, lists, and emphasis where needed.";
}

// Define types for request and response
interface AiRequest {
  prompt: string;
  content: string;
}

interface AiResponse {
  content?: string;
  success?: boolean;
  message?: string;
}

/**
 * Public AI endpoint for SEO pages
 * No authentication required - rate limited on client side
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { prompt, content } = await readBody<AiRequest>(event);

  try {
    const apiKey = config.openaiApiKey || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.log('API Key not found in either config or env');
      throw createError({
        statusCode: 500,
        message: 'OpenAI API key is not configured'
      });
    }

    // Generate example content if no content provided
    const contentToProcess = content || 'Generate a professional example based on the prompt';

    const openai = new OpenAI({
      apiKey: apiKey
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: getSystemPrompt(prompt)
        },
        {
          role: "user",
          content: `Content: ${contentToProcess}\n\nPrompt: ${prompt}\n\nModify the content according to the prompt. Use proper formatting as per markdown, where applicable, for headings, bullets, numbering and even checkboxes and blockquotes. Make it professional and engaging.`
        }
      ],
    });

    const formattedResponse = formatTipTapHtml(completion.choices[0].message.content || '');

    return {
      success: true,
      content: formattedResponse
    } as AiResponse;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to process AI request'
    });
  }
});
