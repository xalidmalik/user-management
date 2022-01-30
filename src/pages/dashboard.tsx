import {
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Table } from "components/table/table";
import { UserColumn } from "components/table/user-table-data";
import { GeneralLayout } from "containers/general-layout";
import React, { memo, useEffect, useMemo } from "react";
import { Link } from "react-location";
import { useAppDispatch, useAppSelector } from "store/store";
import { getUsersAction, purgeState } from "store/user-action";
import { userListState } from "store/user-slice";

export const Dashboard = memo(() => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading, status } = useAppSelector(userListState);

  useEffect(() => {
    if (status !== "fullfilled") {
      dispatch(getUsersAction());
    }
  }, [dispatch, status]);

  const UserColumnMemo = useMemo(() => UserColumn, []);
  return (
    <GeneralLayout>
      <HStack justify="space-between">
        <Heading py="16">Dashboard</Heading>
        <HStack>
          <Button
            onClick={() => {
              dispatch(purgeState());
            }}
            variant="solid"
            colorScheme="green"
            size="lg"
          >
            Purge Data
          </Button>
          <Link to="user/add">
            <Button colorScheme="blue" size="lg">
              Add New
            </Button>
          </Link>
        </HStack>
      </HStack>

      {data && !isLoading && <Table columns={UserColumnMemo} data={data} />}
      {error && <Text>Somthing Went Wrong</Text>}
      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
    </GeneralLayout>
  );
});
