import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { UserForm } from "components/form/user";
import { GeneralLayout } from "containers/general-layout";
import React, { memo } from "react";
import { Link, useMatch } from "react-location";
import { useAppDispatch, useAppSelector } from "store/store";
import { updateUserAction } from "store/user-action";
import { userListState, userOperationState } from "store/user-slice";
import { UserType } from "types/user";

export const EditUser = memo(() => {
  const dipsatch = useAppDispatch();
  const { params } = useMatch();
  const { data, error, isLoading } = useAppSelector(userListState);
  const { type, isLoading: operationLoading } =
    useAppSelector(userOperationState);
  const toast = useToast();

  const userData = data.find(
    (user) => Number(user.id) === Number(params.userId)
  );

  const onSubmit = async (val: Pick<UserType, "name" | "email">) => {
    if (userData) {
      let updatedUser = { ...userData, ...val };
      dipsatch(updateUserAction({ updatedUser, toast }));
    }
  };

  return (
    <GeneralLayout>
      <Heading py="16">Edit User</Heading>
      <Box
        bg="white"
        py="16"
        px="80"
        rounded="full"
        borderRadius=".75rem"
        border="1px solid #DFDFDF"
      >
        {userData && (
          <UserForm
            onSubmit={onSubmit}
            values={userData}
            isLoading={type === "update" && operationLoading}
          />
        )}
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {(!userData || error) && (
          <Center>
            <VStack spacing="8">
              <Text>User not exsist</Text>
              <Link to="/">
                <Button variant="outline" colorScheme="green">
                  Go to Dashboard
                </Button>
              </Link>
            </VStack>
          </Center>
        )}
      </Box>
    </GeneralLayout>
  );
});
