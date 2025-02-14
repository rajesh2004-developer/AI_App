import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = 'AIzaSyDLMntjx66f3uNFagqqn4rOoO_McY4BeX8';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error in AI response:', error);
  }

  // const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());
}

export default run;
