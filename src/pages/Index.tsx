import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Box } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Index = () => {
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0 });
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const words = transcript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === "containera") {
        newCounts.containerA += 1;
      } else if (word.toLowerCase() === "containerb") {
        newCounts.containerB += 1;
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

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Voice-Activated Counting</Text>
        <Button onClick={startListening}>Start Listening</Button>
        <Button onClick={stopListening}>Stop Listening</Button>
        <Box>
          <Text>Container A Count: {counts.containerA}</Text>
          <Text>Container B Count: {counts.containerB}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;