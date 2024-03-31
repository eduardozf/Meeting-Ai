import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

const getOpenai = () => {
  // If instanced just return
  if (openaiInstance) return openaiInstance;

  // If not executed, create a instance
  openaiInstance = new OpenAI();
  return openaiInstance;
};

export { getOpenai };
