import React, { useState, useEffect, useCallback } from "react";
import { Container, Text, VStack, Button, Box, HStack, Select, useToast } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Link } from "react-router-dom";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const Index = React.memo(() => {
  const toast = useToast();
  const [counts, setCounts] = useState(loadFromLocalStorage("counts", { containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 }));
  const [history, setHistory] = useState(loadFromLocalStorage("history", []));
  const [filter, setFilter] = useState("all");
  const [lockedContainers, setLockedContainers] = useState({ containerA: false, containerB: false, containerC: false, containerD: false, containerE: false });
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const words = transcript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === "containera" && !lockedContainers.containerA) {
        newCounts.containerA += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "A", count: newCounts.containerA, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container A recognized the word: containera`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === "containerb" && !lockedContainers.containerB) {
        newCounts.containerB += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "B", count: newCounts.containerB, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container B recognized the word: containerb`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === "containerc" && !lockedContainers.containerC) {
        newCounts.containerC += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "C", count: newCounts.containerC, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container C recognized the word: containerc`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === "containerd" && !lockedContainers.containerD) {
        newCounts.containerD += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "D", count: newCounts.containerD, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container D recognized the word: containerd`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === "containere" && !lockedContainers.containerE) {
        newCounts.containerE += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "E", count: newCounts.containerE, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container E recognized the word: containere`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    setCounts(newCounts);
    resetTranscript();
  }, [transcript, lockedContainers, toast]);

  useEffect(() => {
    saveToLocalStorage("counts", counts);
  }, [counts]);

  useEffect(() => {
    saveToLocalStorage("history", history);
  }, [history]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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

  const fetchData = async () => {
    try {
      const response = await fetch("https://example.com/api/data", {
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearHistory = () => {
    setHistory([]);
  };

  const filteredHistory = history.filter((entry) => filter === "all" || entry.container === filter);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" role="main" px={4}>
      <VStack spacing={{ base: 4, md: 6 }}>
        <Text fontSize="2xl">Voice-Activated Counting</Text>
        <Button onClick={startListening}>Start Listening</Button>
        <Button onClick={stopListening}>Stop Listening</Button>
        <Box>
          <Text>Container A Count: {counts.containerA}</Text>
          <Text>Container B Count: {counts.containerB}</Text>
          <Text>Container C Count: {counts.containerC}</Text>
          <Text>Container D Count: {counts.containerD}</Text>
          <Text>Container E Count: {counts.containerE}</Text>
        </Box>
        <HStack spacing={4}>
          <Button onClick={clearHistory}>Clear History</Button>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="A">Container A</option>
            <option value="B">Container B</option>
            <option value="C">Container C</option>
            <option value="D">Container D</option>
            <option value="E">Container E</option>
          </Select>
        </HStack>
        <Box aria-live="polite" width="100%" px={4}>
          <Text fontSize="xl">History</Text>
          {filteredHistory.map((entry, index) => (
            <Text key={index}>
              Container {entry.container} Count: {entry.count} at {entry.timestamp.toLocaleTimeString()}
            </Text>
          ))}
        </Box>
        <Button as={Link} to="/history" mt={4}>
          View Full History
        </Button>
      </VStack>
    </Container>
  );
});

export default Index;