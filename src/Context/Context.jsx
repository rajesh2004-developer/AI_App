import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const onSend = async (prompt) => {
    if (!prevPrompts.includes(prompt)) {
      setPrevPrompts((prev) => [...prev, prompt]);
    }
    setResultData('');
    setLoading(true);
    setShowResult(true);

    setRecentPrompt(prompt);
    setInput('');

    const response = await run(prompt);
    if (response) {
      let responseArray = response.split('**');
      let formattedString = '';

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          formattedString += `<b>${responseArray[i]}</b>`;
        } else {
          formattedString += responseArray[i];
        }
      }

      formattedString = formattedString.replace(/\n/g, '<br>');

      let words = formattedString.split(' ');
      let finalText = '';

      words.forEach((word, index) => {
        setTimeout(() => {
          finalText += word + ' ';
          setResultData(finalText);
        }, 50 * index);
      });

      setLoading(false);
    }
  };

  // onSend();
  const ContextValue = {
    prevPrompts,
    setPrevPrompts,
    onSend,
    recentPrompt,
    setRecentPrompt,
    loading,
    resultData,
    input,
    setInput,
    showResult,
    setShowResult,
    setLoading,
  };

  return (
    <Context.Provider value={ContextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
