import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { operation, userOperationState } from "store/user-slice";
import { UserType } from "types/user";

type UserDeleteModalProps = {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
  handleClick: () => Promise<void>;
};

export const UserDeleteModal = ({
  user,
  isOpen,
  onClose,
  handleClick,
}: UserDeleteModalProps) => {
  const { type, isLoading, status } = useAppSelector(userOperationState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === "delete" && !isLoading && status === "success") {
      dispatch(
        operation({
          operation: {
            type: "create",
            status: "initial",
            isLoading: false,
            error: null,
          },
        })
      );
      onClose();
    }
  }, [dispatch, isLoading, onClose, status, type]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{`Are you sure you want to delete the user ${user.name}?`}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="red"
            onClick={handleClick}
            isLoading={type === "delete" && isLoading}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
