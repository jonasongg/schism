import { initialMessages } from '@/app/data';
import { OpenAI } from 'openai';
import { ChatCompletionAssistantMessageParam, ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';

const prompt =
  // "You are my Gen-Z friend who just texted me yesterday. Continue a text conversation over Telegram with me. \
  // Make it super casual, nonchalant, and natural. Include typos. Exclude punctuation and capital letters. \
  // Don't make the message too long; split it up into multiple messages if needed.";

  'you are my friend. continue conversation in a very informal, text-based way. do not use punctuation. keep your messages short.\
  the following messages will be labelled as "assistant" or "user" to indicate who is speaking. you are "assistant", and I am "user".';

// const initialMessages = Object.freeze([
//   'hey, wyd',
//   'just chilling, you?',
//   'same, lol',
//   'what are you up to',
//   'nothing much, just watching tv',
//   'cool, what are you watching',
//   'some show on netflix',
//   'nice, which one',
//   'the office',
//   'classic',
//   'yeah, lol',
//   'what about you',
//   'i am watching a movie',
//   'which one',
//   'inception',
//   'nice, i love that movie',
//   'yeah, it is really good',
//   'i know right',
//   'lol',
//   'lol',
// ]);

export const askChatGpt = async (
  userId: number,
  messageHistory: (ChatCompletionAssistantMessageParam | ChatCompletionUserMessageParam)[],
): Promise<string[]> => {
  const initialMessage = initialMessages.find((message) => message.userId === userId);

  if (messageHistory.length === 0) {
    return initialMessage?.initial ?? [''];
  }

  const openai = new OpenAI({ apiKey: import.meta.env.VITE_CHATGPT_TOKEN, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    messages: [
      { role: 'system', content: prompt },
      ...(initialMessage != null ? [{ role: 'system', content: initialMessage?.prompt } as const] : []),
      ...(initialMessage?.initial.map<ChatCompletionAssistantMessageParam>((message) => ({
        role: 'assistant',
        content: message,
      })) ?? []),
      ...messageHistory,
    ],
  });

  return [completion.choices[0].message.content ?? ''];
};
