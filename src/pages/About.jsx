import { Container, Heading, Text, FormControl, FormLabel, Textarea, FormErrorMessage, Button, Box } from "@chakra-ui/react";
import { useState } from "react";

const About = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

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

  return (
    <Container maxW="container.md" py={8} role="main" px={4}>
      <Heading as="h2" size="xl" mb={4}>About Us</Heading>
      <Text fontSize="lg">This is the about page of the application.</Text>
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
    </Container>
  );
};

export default About;