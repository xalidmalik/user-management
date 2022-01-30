import { Box, Container } from "@chakra-ui/react";
import React, { FC } from "react";

export const GeneralLayout: FC = ({ children }) => {
  return (
    <Box bgColor="gray.100" height="100vh">
      <Container maxW="1440px">{children}</Container>
    </Box>
  );
};
