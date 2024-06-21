import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import debounce from 'lodash.debounce';

const customKeywords = {
  containerA: "Alpha",
  containerB: "Bravo",
  containerC: "Charlie",
  containerD: "Delta",
  containerE: "Echo"
};

const confidenceThreshold = 0.8;

const LockScreen = () => {
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });
  const { transcript, resetTranscript, finalTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const processTranscript = debounce(() => {
    const words = finalTranscript.split(" ");
    let newCounts = { ...counts };

    words.forEach((word) => {
      if (word.toLowerCase() === customKeywords.containerA.toLowerCase()) {
        newCounts.containerA += 1;
      } else if (word.toLowerCase() === customKeywords.containerB.toLowerCase()) {
        newCounts.containerB += 1;
      } else if (word.toLowerCase() === customKeywords.containerC.toLowerCase()) {
        newCounts.containerC += 1;
      } else if (word.toLowerCase() === customKeywords.containerD.toLowerCase()) {
        newCounts.containerD += 1;
      } else if (word.toLowerCase() === customKeywords.containerE.toLowerCase()) {
        newCounts.containerE += 1;
      }
    });

    setCounts(newCounts);
    resetTranscript();
  }, 500);

  useEffect(() => {
    if (finalTranscript && finalTranscript.length > 0) {
      processTranscript();
    }
  }, [finalTranscript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="gray.800" color="white" px={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Lock Screen Display</Text>
        <Box>
          <Text>{customKeywords.containerA} Count: {counts.containerA}</Text>
          <Text>{customKeywords.containerB} Count: {counts.containerB}</Text>
          <Text>{customKeywords.containerC} Count: {counts.containerC}</Text>
          <Text>{customKeywords.containerD} Count: {counts.containerD}</Text>
          <Text>{customKeywords.containerE} Count: {counts.containerE}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default LockScreen;