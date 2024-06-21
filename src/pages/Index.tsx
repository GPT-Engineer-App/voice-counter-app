import React, { useState, useEffect, useCallback } from "react";
import { Container, Text, VStack, Button, Box, HStack, Select, Input, FormControl, FormLabel, FormErrorMessage, Textarea, Checkbox } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Index = React.memo(() => {
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lockedContainers, setLockedContainers] = useState({ containerA: false, containerB: false, containerC: false, containerD: false, containerE: false });
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    const words = transcript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === "containera" && !lockedContainers.containerA) {
        newCounts.containerA += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "A", count: newCounts.containerA, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containerb" && !lockedContainers.containerB) {
        newCounts.containerB += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "B", count: newCounts.containerB, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containerc" && !lockedContainers.containerC) {
        newCounts.containerC += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "C", count: newCounts.containerC, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containerd" && !lockedContainers.containerD) {
        newCounts.containerD += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "D", count: newCounts.containerD, timestamp: new Date() }]);
      } else if (word.toLowerCase() === "containere" && !lockedContainers.containerE) {
        newCounts.containerE += 1;
        setHistory((prevHistory) => [...prevHistory, { container: "E", count: newCounts.containerE, timestamp: new Date() }]);
      }
    });

    setCounts(newCounts);
    resetTranscript();
  }, [transcript, lockedContainers]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

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

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" role="main">
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
        <Box aria-live="polite">
          <Text fontSize="xl">History</Text>
          {filteredHistory.map((entry, index) => (
            <Text key={index}>
              Container {entry.container} Count: {entry.count} at {entry.timestamp.toLocaleTimeString()}
            </Text>
          ))}
        </Box>
        <Box as="form" onSubmit={handleFeedbackSubmit}>
          <FormControl isInvalid={feedbackError}>
            <FormLabel htmlFor="feedback">User Feedback</FormLabel>
            <Textarea id="feedback" value={feedback} onChange={handleFeedbackChange} />
            {feedbackError && <FormErrorMessage>{feedbackError}</FormErrorMessage>}
          </FormControl>
          <Button mt={4} type="submit" isDisabled={feedbackError}>
            Submit Feedback
          </Button>
        </Box>
        <Box>
          <Text fontSize="xl">Lock Containers</Text>
          <Checkbox isChecked={lockedContainers.containerA} onChange={() => toggleLock("containerA")}>Lock Container A</Checkbox>
          <Checkbox isChecked={lockedContainers.containerB} onChange={() => toggleLock("containerB")}>Lock Container B</Checkbox>
          <Checkbox isChecked={lockedContainers.containerC} onChange={() => toggleLock("containerC")}>Lock Container C</Checkbox>
          <Checkbox isChecked={lockedContainers.containerD} onChange={() => toggleLock("containerD")}>Lock Container D</Checkbox>
          <Checkbox isChecked={lockedContainers.containerE} onChange={() => toggleLock("containerE")}>Lock Container E</Checkbox>
        </Box>
      </VStack>
    </Container>
  );
});

export default Index;