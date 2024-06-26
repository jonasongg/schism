import { initialMessages } from '@/app/data';
import { OpenAI } from 'openai';
import { ChatCompletionAssistantMessageParam, ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';

const prompt =
  "You are texting me. Continue conversation in a way that is appropriate for who you are.\
  The next message will give you context on how you are related to me and how you should reply.\
  The following messages will be labelled as 'assistant' or 'user' to indicate who is speaking. You are 'assistant', and I am 'user'.\
  If my response seems nonsensical or inappropriate--for example, if my reply doesn't make sense for the context of who you are\
  and the conversation--do not simply ignore it. Instead, question me about it.\
  If the conversation seems to end abruptly, ask me a question to keep it going.";

const autoCorrectPrompt =
  "The following messages will be labelled as 'assistant' or 'user' to indicate who is speaking. \
  Send a message to continue the conversation as the 'user'. Keep the message short.";

export const askChatGpt = async (
  userId: number,
  messageHistory: (ChatCompletionAssistantMessageParam | ChatCompletionUserMessageParam)[],
  autoComplete: boolean = false,
  signal?: AbortSignal,
): Promise<string[]> => {
  const initialMessage = initialMessages.find((message) => message.userId === userId);

  if (messageHistory.length === 0) {
    return initialMessage?.initial ?? [''];
  }

  const openai = new OpenAI({ apiKey: import.meta.env.VITE_CHATGPT_TOKEN, dangerouslyAllowBrowser: true });

  const completion = await openai.chat.completions.create(
    {
      model: 'gpt-3.5-turbo',
      messages: autoComplete
        ? [{ role: 'system', content: autoCorrectPrompt }, ...messageHistory]
        : [
            { role: 'system', content: prompt },
            ...(initialMessage != null ? [{ role: 'system', content: initialMessage?.prompt } as const] : []),
            ...messageHistory,
          ],
    },
    { signal },
  );

  if (autoComplete) return [completion.choices[0].message.content ?? ''];

  return completion.choices[0].message.content == null
    ? ['']
    : [1, 3, 6, 7].includes(userId)
      ? completion.choices[0].message.content
          .split('.')
          .map((message) => message.trim())
          .filter(Boolean)
      : [completion.choices[0].message.content];
};
