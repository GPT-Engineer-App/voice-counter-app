import React, { useState, useEffect } from "react";
import { Container, Heading, VStack, FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";

const Settings = () => {
  const defaultKeywords = {
    containerA: "containera",
    containerB: "containerb",
    containerC: "containerc",
    containerD: "containerd",
    containerE: "containere",
  };

  const [customKeywords, setCustomKeywords] = useState(defaultKeywords);

  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem("customKeywords")) || defaultKeywords;
    setCustomKeywords(storedKeywords);
  }, []);

  useEffect(() => {
    localStorage.setItem("customKeywords", JSON.stringify(customKeywords));
  }, [customKeywords]);

  const handleKeywordChange = (container, keyword) => {
    setCustomKeywords((prevKeywords) => ({
      ...prevKeywords,
      [container]: keyword,
    }));
  };

  const handleReset = () => {
    setCustomKeywords(defaultKeywords);
  };

  const handleSave = () => {
    localStorage.setItem("customKeywords", JSON.stringify(customKeywords));
  };

  return (
    <Container maxW="container.md" py={8} role="main" px={4}>
      <Heading as="h2" size="xl" mb={4}>Settings</Heading>
      <VStack spacing={{ base: 4, md: 6 }} align="stretch">
        <Box>
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
        <Button mt={4} onClick={handleReset}>Reset to Default</Button>
        <Button mt={4} onClick={handleSave}>Save Keywords</Button>
      </VStack>
    </Container>
  );
};

export default Settings;