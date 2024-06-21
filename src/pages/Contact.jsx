import { Container, Heading, Text } from "@chakra-ui/react";

const Contact = () => {
  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h2" size="xl" mb={4}>Contact Us</Heading>
      <Text fontSize="lg">This is the contact page of the application.</Text>
    </Container>
  );
};

export default Contact;