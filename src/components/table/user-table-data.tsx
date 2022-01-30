import {
  Button,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { UserDeleteModal } from "components/modal/user-delete";
import React, { useCallback } from "react";
import { Link } from "react-location";
import type { Column } from "react-table";
import { CellValue } from "react-table";
import { useAppDispatch } from "store/store";
import { deleteUserAction } from "store/user-action";
import { UserType } from "types/user";

export const UserColumn: Column[] = [
  {
    Header: "Id",
    accessor: "id",
    Cell: ({ value }: CellValue): JSX.Element => <Text>{value}</Text>,
    width: "8%",
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ value }: CellValue): JSX.Element => <Text>{value}</Text>,
  },
  {
    Header: "Username",
    accessor: "username",
    Cell: ({ value }: CellValue): JSX.Element => <Text>{value}</Text>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ value }: CellValue): JSX.Element => <Text>{value}</Text>,
  },
  {
    Header: "City",
    accessor: "address",
    Cell: ({ value, row }: CellValue): JSX.Element =>
      value && <Text>{row.original.address.city}</Text>,
    width: "10%",
  },
  {
    Header: " ",
    accessor: "phone",
    Cell: ({ value, row }: CellValue): JSX.Element => {
      const dispatch = useAppDispatch();
      const toast = useToast();
      const { isOpen, onOpen, onClose } = useDisclosure({
        id: row.original.id,
      });

      const onDelete = useCallback(
        async (data: UserType) => {
          dispatch(deleteUserAction({ user: data, toast }));
        },
        [dispatch, toast]
      );

      return (
        <>
          <HStack justifyContent="flex-end">
            <Link to={`user/edit/${row.original.id}`}>
              <Button variant="solid" colorScheme="orange">
                Edit
              </Button>
            </Link>
            <Button colorScheme="red" onClick={onOpen}>
              Delete
            </Button>
          </HStack>
          {isOpen && (
            <UserDeleteModal
              handleClick={() => onDelete(row.original)}
              isOpen={isOpen}
              onClose={onClose}
              user={row.original}
            />
          )}
        </>
      );
    },
  },
];
