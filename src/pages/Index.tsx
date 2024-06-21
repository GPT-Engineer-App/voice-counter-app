import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Box, HStack, Select } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Index = () => {
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const words = transcript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === "containera") {
        newCounts.containerA += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "A", count: newCounts.containerA, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containerb") {
        newCounts.containerB += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "B", count: newCounts.containerB, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containerc") {
        newCounts.containerC += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "C", count: newCounts.containerC, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containerd") {
        newCounts.containerD += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "D", count: newCounts.containerD, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containere") {
        newCounts.containerE += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "E", count: newCounts.containerE, timestamp: new Date() }]);
      }
    });

    setCounts(newCounts);
    resetTranscript();
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const fetchData = async () => {
    try {
      const response = await fetch("https://example.com/api/data", {
        mode: "cors",
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
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
        <Box>
          <Text fontSize="xl">History</Text>
          {filteredHistory.map((entry, index) => (
            <Text key={index}>
              Container {entry.container} Count: {entry.count} at {entry.timestamp.toLocaleTimeString()}
            </Text>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;