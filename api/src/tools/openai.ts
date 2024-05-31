import OpenAI from 'openai';

let openAiInstance: OpenAI | null = null;

function getOpenAi(): typeof openAiInstance {
  // If instanced just return
  if (openAiInstance) return openAiInstance;

  // If not executed, create a instance
  openAiInstance = new OpenAI();
  return openAiInstance;
}

export { getOpenAi };
