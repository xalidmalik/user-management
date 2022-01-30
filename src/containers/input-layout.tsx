import { Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { FieldError } from "react-hook-form";

type InputLayoutProps<T> = {
  label: string;
  name: T;
  error: FieldError | undefined;
};

export const InputLayout: FC<
  InputLayoutProps<"name" | "email" | "phone" | "address.city">
> = ({ children, error, label }) => {
  return (
    <VStack w="100%" align="start">
      <Text width="20%" fontWeight="semibold" fontSize="large">
        {label}
      </Text>
      {children}
      {error && (
        <Text textColor="red.500" fontWeight="medium">
          {error.message}
        </Text>
      )}
    </VStack>
  );
};
