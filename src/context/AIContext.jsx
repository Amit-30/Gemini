import { createContext, useContext, useState, useEffect } from "react";
import run from "../config/gemini";

const AiContext = createContext();

const AiContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const delayPara = (i, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * i);
  };

  const newChat = () => {
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let res;
    if (prompt) {
      setRecentPrompt(prompt);
      res = await run(prompt);
    } else {
      setPrevPrompt((prev) => [input, ...prev]);
      setRecentPrompt(input);
      res = await run(input);
    }
    let resArr = res.split("**");
    let newRes = "";
    for (let i = 0; i < resArr.length; i++) {
      if (i % 2 === 0) {
        newRes += resArr[i];
      } else {
        newRes += "<b>" + resArr[i] + "</b>";
      }
    }
    let newRes2 = newRes.split("*").join("</br>");
    let newResArr = newRes2.split(" ");
    for (let i = 0; i < newResArr.length; i++) {
      const nextWord = newResArr[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    prevPrompt,
    showResult,
    loading,
    resultData,
    recentPrompt,
    setPrevPrompt,
    setRecentPrompt,
    setInput,
    onSent,
    newChat,
  };

  return (
    <AiContext.Provider value={contextValue}>{children}</AiContext.Provider>
  );
};

export default AiContextProvider;

export const useAiContext = () => {
  return useContext(AiContext);
};
