import { Box, Heading, useToast } from "@chakra-ui/react";
import { UserForm } from "components/form/user";
import { GeneralLayout } from "containers/general-layout";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { createUserAction } from "store/user-action";
import { userListStateDataLength, userOperationState } from "store/user-slice";
import { UserType } from "types/user";

export const AddUser = () => {
  const userListLength = useAppSelector(userListStateDataLength);
  const { type, isLoading } = useAppSelector(userOperationState);
  const dipsatch = useAppDispatch();
  const toast = useToast();

  const onSubmit = async (val: Partial<UserType>) => {
    val.username = val.name?.split(" ").join("");
    val.id = Number(userListLength + 1);
    dipsatch(createUserAction({ user: val, toast }));
  };
  return (
    <GeneralLayout>
      <Heading py="16">Add New User</Heading>
      <Box
        bg="white"
        py="16"
        px="80"
        rounded="full"
        borderRadius=".75rem"
        border="1px solid #DFDFDF"
      >
        <UserForm
          onSubmit={onSubmit}
          isLoading={type === "create" && isLoading}
        />
      </Box>
    </GeneralLayout>
  );
};
