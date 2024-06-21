import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import debounce from 'lodash.debounce';

const customKeywords = {
  containerA: "CAN",
  containerB: "GLASS",
  containerC: "CART",
  containerD: "PET",
  containerE: "HDP"
};

const confidenceThreshold = 0.8;

const useSpeechProcessor = (counts, setCounts) => {
  const { finalTranscript, resetTranscript } = useSpeechRecognition();

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
  }, [finalTranscript, processTranscript]);

  return { processTranscript };
};

const useSpeechRecognitionSetup = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return { browserSupportsSpeechRecognition };
};

const CountDisplay = ({ counts }) => (
  <div>
    <p>{customKeywords.containerA} Count: {counts.containerA}</p>
    <p>{customKeywords.containerB} Count: {counts.containerB}</p>
    <p>{customKeywords.containerC} Count: {counts.containerC}</p>
    <p>{customKeywords.containerD} Count: {counts.containerD}</p>
    <p>{customKeywords.containerE} Count: {counts.containerE}</p>
  </div>
);

const LockScreen = () => {
  const [counts, setCounts] = useState({ containerA: 0, containerB: 0, containerC: 0, containerD: 0, containerE: 0 });

  useSpeechProcessor(counts, setCounts);
  const { browserSupportsSpeechRecognition } = useSpeechRecognitionSetup();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 text-white px-4" role="none">
      <div className="space-y-4">
        <p className="text-2xl">Lock Screen Display</p>
        <CountDisplay counts={counts} />
      </div>
    </div>
  );
};

export default LockScreen;