import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const LockScreen = () => {
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const words = transcript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === "containera") {
        newCounts.containerA += 1;
      } else if (word.toLowerCase() === "containerb") {
        newCounts.containerB += 1;
      } else if (word.toLowerCase() === "containerc") {
        newCounts.containerC += 1;
      } else if (word.toLowerCase() === "containerd") {
        newCounts.containerD += 1;
      } else if (word.toLowerCase() === "containere") {
        newCounts.containerE += 1;
      }
    });

    setCounts(newCounts);
    resetTranscript();
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="gray.800" color="white">
      <VStack spacing={4}>
        <Text fontSize="2xl">Lock Screen Display</Text>
        <Box>
          <Text>Container A Count: {counts.containerA}</Text>
          <Text>Container B Count: {counts.containerB}</Text>
          <Text>Container C Count: {counts.containerC}</Text>
          <Text>Container D Count: {counts.containerD}</Text>
          <Text>Container E Count: {counts.containerE}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default LockScreen;