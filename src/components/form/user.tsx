import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import { InputLayout } from "containers/input-layout";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-location";
import { UserType } from "types/user";

const validation = {
  name: {
    required: { value: true, message: "Name is requied!" },
    maxLength: {
      value: 60,
      message: "The entered value must be less than 60 characters",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email is required!",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "You need to enter valid email format!",
    },
  },
  address: {
    city: {
      required: {
        value: true,
        message: "City is requied!",
      },
    },
  },
};

type UserFormProps = {
  onSubmit: (
    val: Pick<UserType, "name" | "email" | "address">
  ) => Promise<void>;
  values?: UserType;
  isLoading?: boolean;
};

export const UserForm = ({ onSubmit, values, isLoading }: UserFormProps) => {
  const defaultValues: Pick<UserType, "name" | "email" | "address"> = {
    name: values ? values.name : "",
    email: values ? values.email : "",
    address: {
      city: values ? values.address.city : "",
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({
    defaultValues,
  });

  return (
    <VStack spacing="8">
      <InputLayout label="Name" name="name" error={errors.name}>
        <Input
          {...register("name", validation.name)}
          placeholder="Name Surname"
          size="lg"
          borderColor={errors.name ? "red.500" : "inherit"}
        />
      </InputLayout>
      <InputLayout label="Email" name="email" error={errors.email}>
        <Input
          {...register("email", validation.email)}
          placeholder="Email addess"
          size="lg"
          borderColor={errors.email ? "red.500" : "inherit"}
        />
      </InputLayout>
      <InputLayout
        label="City"
        name="address.city"
        error={errors.address?.city}
      >
        <Input
          {...register("address.city", validation.address.city)}
          placeholder="City"
          size="lg"
          borderColor={errors.address?.city ? "red.500" : "inherit"}
        />
      </InputLayout>
      <HStack justify="end" w="full">
        <Link to="/">
          <Button size="lg" colorScheme="red" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button
          onClick={handleSubmit(onSubmit)}
          size="lg"
          colorScheme="green"
          isLoading={isLoading}
        >
          Submit
        </Button>
      </HStack>
    </VStack>
  );
};
