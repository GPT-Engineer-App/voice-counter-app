import React, { useState, useEffect, useCallback } from "react";
import { Button, Select, Checkbox, useToast } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import debounce from "lodash.debounce";

// Utility functions
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

// Custom hooks
const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(loadFromLocalStorage(key, defaultValue));
  useEffect(() => {
    saveToLocalStorage(key, state);
  }, [key, state]);
  return [state, setState];
};

const useFetchData = (url, options, toast) => {
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error: ", error);
      toast({
        title: "Fetch Error",
        description: "There was an error fetching data from the API.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [url, options, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

// Components
const CountDisplay = ({ customKeywords, counts }) => (
  <div>
    {Object.keys(customKeywords).map((key) => (
      <p key={key}>{customKeywords[key]} Count: {counts[key]}</p>
    ))}
  </div>
);

const HistoryDisplay = ({ filteredHistory }) => (
  <div className="w-full px-4">
    <p className="text-xl">History</p>
    {filteredHistory.map((entry, index) => (
      <p key={index}>
        {entry.container} Count: {entry.count} at {new Date(entry.timestamp).toLocaleTimeString()}
      </p>
    ))}
  </div>
);

const LockControls = ({ customKeywords, lockedContainers, toggleLock }) => (
  <div className="w-full px-4">
    <p className="text-xl">Lock Containers</p>
    {Object.keys(customKeywords).map((key) => (
      <Checkbox key={key} isChecked={lockedContainers[key]} onChange={() => toggleLock(key)}>
        Lock {customKeywords[key]}
      </Checkbox>
    ))}
  </div>
);

const Index = React.memo(() => {
  const toast = useToast();
  const [counts, setCounts] = useLocalStorageState("counts", { containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });
  const [history, setHistory] = useLocalStorageState("history", []);
  const [filter, setFilter] = useState("all");
  const [lockedContainers, setLockedContainers] = useState({ containerA: false, containerB: false, containerC: false, containerD: false, containerE: false });
  const [customKeywords, setCustomKeywords] = useLocalStorageState("customKeywords", { containerA: "CAN", containerB: "GLASS", containerC: "CART", containerD: "PET", containerE: "HDP" });

  const { transcript, resetTranscript, finalTranscript, listening } = useSpeechRecognition();
  const confidenceThreshold = 0.8;

  const processTranscript = useCallback(
    debounce((transcript) => {
      const words = transcript.split(" ");
      let newCounts = { ...counts };

      words.forEach((word) => {
        Object.keys(customKeywords).forEach((key) => {
          if (word.toLowerCase() === customKeywords[key].toLowerCase() && !lockedContainers[key]) {
            newCounts[key] += 1;
            setHistory((prevHistory) => [...prevHistory, { container: customKeywords[key], count: newCounts[key], timestamp: new Date() }]);
            toast({
              title: "Word Recognized",
              description: `${customKeywords[key]} recognized the word: ${customKeywords[key]}`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        });
      });

      setCounts(newCounts);
      resetTranscript();
    }, 500),
    [counts, customKeywords, lockedContainers, toast, resetTranscript]
  );

  useEffect(() => {
    if (finalTranscript && finalTranscript.confidence >= confidenceThreshold) {
      processTranscript(finalTranscript.transcript);
    }
  }, [finalTranscript, processTranscript]);

  useFetchData("https://example.com/api/data", { mode: "cors", credentials: "include", headers: { "Content-Type": "application/json" } }, toast);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    toast({
      title: "Listening Started",
      description: "The application is now listening for keywords.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    toast({
      title: "Listening Stopped",
      description: "The application has stopped listening for keywords.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const filteredHistory = history.filter((entry) => filter === "all" || entry.container === filter);

  const toggleLock = (container) => {
    setLockedContainers((prevLockedContainers) => ({
      ...prevLockedContainers,
      [container]: !prevLockedContainers[container],
    }));
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center px-4">
      <div className="space-y-4 md:space-y-6">
        <p className="text-2xl">Voice-Activated Counting</p>
        <Button onClick={startListening} isDisabled={listening}>Start Listening</Button>
        <Button onClick={stopListening} isDisabled={!listening}>Stop Listening</Button>
        <CountDisplay customKeywords={customKeywords} counts={counts} />
        <div className="flex space-x-4">
          <Button onClick={clearHistory}>Clear History</Button>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            {Object.keys(customKeywords).map((key) => (
              <option key={key} value={customKeywords[key]}>{customKeywords[key]}</option>
            ))}
          </Select>
        </div>
        <HistoryDisplay filteredHistory={filteredHistory} />
        <LockControls customKeywords={customKeywords} lockedContainers={lockedContainers} toggleLock={toggleLock} />
      </div>
    </div>
  );
});

export default Index;