import React, { useState } from "react";
import { Container, Heading, FormControl, FormLabel, Input, Switch, Button, Box, VStack } from "@chakra-ui/react";

const Settings = () => {
  const [voiceControl, setVoiceControl] = useState(true);
  const [historyTracking, setHistoryTracking] = useState(true);
  const [customKeywords, setCustomKeywords] = useState({
    containerA: "containera",
    containerB: "containerb",
    containerC: "containerc",
    containerD: "containerd",
    containerE: "containere",
  });

  const handleKeywordChange = (container, keyword) => {
    setCustomKeywords((prevKeywords) => ({
      ...prevKeywords,
      [container]: keyword,
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", { voiceControl, historyTracking, customKeywords });
  };

  return (
    <Container maxW="container.md" py={8} role="main">
      <Heading as="h2" size="xl" mb={4}>Settings</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="voice-control" mb="0">
            Voice Control
          </FormLabel>
          <Switch id="voice-control" isChecked={voiceControl} onChange={() => setVoiceControl(!voiceControl)} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="history-tracking" mb="0">
            History Tracking
          </FormLabel>
          <Switch id="history-tracking" isChecked={historyTracking} onChange={() => setHistoryTracking(!historyTracking)} />
        </FormControl>
        <Box>
          <Heading as="h3" size="md" mb={2}>Custom Keywords</Heading>
          {Object.keys(customKeywords).map((container) => (
            <FormControl key={container} mb={2}>
              <FormLabel htmlFor={container}>{`Keyword for ${container}`}</FormLabel>
              <Input
                id={container}
                value={customKeywords[container]}
                onChange={(e) => handleKeywordChange(container, e.target.value)}
              />
            </FormControl>
          ))}
        </Box>
        <Button colorScheme="blue" onClick={handleSaveSettings}>Save Settings</Button>
      </VStack>
    </Container>
  );
};

export default Settings;