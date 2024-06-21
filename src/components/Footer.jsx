import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="brand.800" color="white" py={4} mt="auto">
      <Text textAlign="center">© {new Date().getFullYear()} My Application. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;