import React, { useState } from "react";
import { Container, Heading, VStack, FormControl, FormLabel, Input, Checkbox, Box, Text } from "@chakra-ui/react";

const Settings = () => {
  const [customKeywords, setCustomKeywords] = useState(loadFromLocalStorage("customKeywords", { containerA: "containera", containerB: "containerb", containerC: "containerc", containerD: "containerd", containerE: "containere" }));
  const [lockedContainers, setLockedContainers] = useState({ containerA: false, containerB: false, containerC: false, containerD: false, containerE: false });

  const handleKeywordChange = (container, keyword) => {
    setCustomKeywords((prevKeywords) => ({
      ...prevKeywords,
      [container]: keyword,
    }));
  };

  const toggleLock = (container) => {
    setLockedContainers((prevLockedContainers) => ({
      ...prevLockedContainers,
      [container]: !prevLockedContainers[container],
    }));
  };

  return (
    <Container maxW="container.md" py={8} role="main" px={4}>
      <Heading as="h2" size="xl" mb={4}>Settings</Heading>
      <VStack spacing={{ base: 4, md: 6 }} align="stretch">
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
        <Box width="100%" px={4}>
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
};

export default Settings;