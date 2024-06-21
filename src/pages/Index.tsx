import React, { useState, useEffect, useCallback } from "react";
import { Container, Text, VStack, Button, Box, HStack, Select, Input, FormControl, FormLabel, FormErrorMessage, Textarea, Checkbox, useToast } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Index = React.memo(() => {
  const toast = useToast();
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lockedContainers, setLockedContainers] = useState({ containerA: false, containerB: false, containerC: false, containerD: false, containerE: false });
  const [customKeywords, setCustomKeywords] = useState({ containerA: "containera", containerB: "containerb", containerC: "containerc", containerD: "containerd", containerE: "containere" });
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    const words = transcript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === customKeywords.containerA.toLowerCase() && !lockedContainers.containerA) {
        newCounts.containerA += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "A", count: newCounts.containerA, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container A recognized the word: ${customKeywords.containerA}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === customKeywords.containerB.toLowerCase() && !lockedContainers.containerB) {
        newCounts.containerB += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "B", count: newCounts.containerB, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container B recognized the word: ${customKeywords.containerB}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === customKeywords.containerC.toLowerCase() && !lockedContainers.containerC) {
        newCounts.containerC += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "C", count: newCounts.containerC, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container C recognized the word: ${customKeywords.containerC}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === customKeywords.containerD.toLowerCase() && !lockedContainers.containerD) {
        newCounts.containerD += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "D", count: newCounts.containerD, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container D recognized the word: ${customKeywords.containerD}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (word.toLowerCase() === customKeywords.containerE.toLowerCase() && !lockedContainers.containerE) {
        newCounts.containerE += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "E", count: newCounts.containerE, timestamp: new Date() }]);
        toast({
          title: "Word Recognized",
          description: `Container E recognized the word: ${customKeywords.containerE}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    setCounts(newCounts);
    resetTranscript();
  }, [transcript, lockedContainers, customKeywords, toast]);

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

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    if (e.target.value.length < 10) {
      setFeedbackError("Feedback must be at least 10 characters long.");
    } else {
      setFeedbackError("");
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.length >= 10) {
      console.log("Feedback submitted:", feedback);
      setFeedback("");
    }
  };

  const toggleLock = (container) => {
    setLockedContainers((prevLockedContainers) => ({
      ...prevLockedContainers,
      [container]: !prevLockedContainers[container],
    }));
  };

  const handleKeywordChange = (container, keyword) => {
    setCustomKeywords((prevKeywords) => ({
      ...prevKeywords,
      [container]: keyword,
    }));
  };

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
        <Box as="form" onSubmit={handleFeedbackSubmit} width="100%" px={4}>
          <FormControl isInvalid={feedbackError}>
            <FormLabel htmlFor="feedback">User Feedback</FormLabel>
            <Textarea id="feedback" value={feedback} onChange={handleFeedbackChange} />
            {feedbackError && <FormErrorMessage>{feedbackError}</FormErrorMessage>}
          </FormControl>
          <Button mt={4} type="submit" isDisabled={feedbackError}>
            Submit Feedback
          </Button>
        </Box>
        <Box width="100%" px={4}>
          <Text fontSize="xl">Lock Containers</Text>
          <Checkbox isChecked={lockedContainers.containerA} onChange={() => toggleLock("containerA")}>Lock Container A</Checkbox>
          <Checkbox isChecked={lockedContainers.containerB} onChange={() => toggleLock("containerB")}>Lock Container B</Checkbox>
          <Checkbox isChecked={lockedContainers.containerC} onChange={() => toggleLock("containerC")}>Lock Container C</Checkbox>
          <Checkbox isChecked={lockedContainers.containerD} onChange={() => toggleLock("containerD")}>Lock Container D</Checkbox>
          <Checkbox isChecked={lockedContainers.containerE} onChange={() => toggleLock("containerE")}>Lock Container E</Checkbox>
        </Box>
        <Box width="100%" px={4}>
          <Text fontSize="xl">Custom Keywords</Text>
          <FormControl>
            <FormLabel htmlFor="keywordA">Keyword for Container A</FormLabel>
            <Input id="keywordA" value={customKeywords.containerA} onChange={(e) => handleKeywordChange("containerA", e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="keywordB">Keyword for Container B</FormLabel>
            <Input id="keywordB" value={customKeywords.containerB} onChange={(e) => handleKeywordChange("containerB", e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="keywordC">Keyword for Container C</FormLabel>
            <Input id="keywordC" value={customKeywords.containerC} onChange={(e) => handleKeywordChange("containerC", e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="keywordD">Keyword for Container D</FormLabel>
            <Input id="keywordD" value={customKeywords.containerD} onChange={(e) => handleKeywordChange("containerD", e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="keywordE">Keyword for Container E</FormLabel>
            <Input id="keywordE" value={customKeywords.containerE} onChange={(e) => handleKeywordChange("containerE", e.target.value)} />
          </FormControl>
        </Box>
      </VStack>
    </Container>
  );
});

export default Index;