import { Container, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="container.md" py={8} role="main">
      <Heading as="h2" size="xl" mb={4}>About Us</Heading>
      <Text fontSize="lg">This is the about page of the application.</Text>
    </Container>
  );
};

export default About;