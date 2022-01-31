import { Box, Container } from "@chakra-ui/react";
import React, { FC } from "react";

export const GeneralLayout: FC = ({ children }) => {
  return (
    <Box bgColor="gray.100" minHeight="100vh" pb="32">
      <Container maxW="1440px">{children}</Container>
    </Box>
  );
};
