import { location } from "App";
import { UserType } from "types/user";
import { AppDispatch, persistor } from "./store";
import {
  addUser,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  operation,
  removeUser,
  updateUser,
} from "./user-slice";

export const getUsersAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUsers());

  return await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/"
  )
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchUsersSuccess(data));
    })
    .catch((error) => dispatch(fetchUsersFailure(error)));
};

export const updateUserAction =
  ({ updatedUser, toast }: { updatedUser: UserType; toast: any }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      operation({
        operation: {
          type: "update",
          status: "initial",
          isLoading: true,
          error: null,
        },
      })
    );

    return fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${updatedUser.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Contetnt-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateUser(updatedUser));
          dispatch(
            operation({
              operation: {
                type: "update",
                status: "success",
                error: null,
                isLoading: false,
              },
            })
          );
          location.history.push("/");
          toast({
            title: `User ${updatedUser.name} updated`,
            status: "success",
            variant: "solid",
          });
        } else {
          dispatch(
            operation({
              operation: {
                type: "update",
                status: "error",
                error: response.statusText,
                isLoading: false,
              },
            })
          );
          toast({
            title: `Somethin went wrong!`,
            status: "error",
            variant: "solid",
          });
        }
      })
      .catch((error) => {
        dispatch(
          operation({
            operation: {
              type: "update",
              status: "error",
              error: error,
              isLoading: false,
            },
          })
        );
        toast({
          title: `Somethin went wrong!`,
          status: "error",
          variant: "solid",
        });
      });
  };

export const createUserAction =
  ({ user, toast }: { user: Partial<UserType>; toast: any }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      operation({
        operation: {
          type: "create",
          status: "initial",
          isLoading: true,
          error: null,
        },
      })
    );

    return fetch(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Contetnt-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          dispatch(addUser(user));
          dispatch(
            operation({
              operation: {
                type: "create",
                status: "success",
                error: null,
                isLoading: false,
              },
            })
          );
          location.history.push("/");
          toast({
            title: `User ${user.name} added`,
            status: "success",
            variant: "solid",
          });
        }
      })
      .catch((error) => {
        dispatch(
          operation({
            operation: {
              type: "create",
              status: "error",
              error: error,
              isLoading: false,
            },
          })
        );
        toast({
          title: `Somethin went wrong!`,
          status: "error",
          variant: "solid",
        });
      });
  };

export const deleteUserAction =
  ({ user, toast }: { user: UserType; toast: any }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      operation({
        operation: {
          type: "delete",
          status: "initial",
          isLoading: true,
          error: null,
        },
      })
    );

    return await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${user.id}`,
      {
        method: "DELETE",
        body: JSON.stringify(user),
        headers: {
          "Contetnt-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          dispatch(removeUser(user));
          dispatch(
            operation({
              operation: {
                type: "delete",
                status: "success",
                isLoading: false,
                error: null,
              },
            })
          );
          toast({
            title: `User ${user.name} deleted`,
            status: "success",
            variant: "solid",
          });
        }
      })
      .catch((error) => {
        dispatch(
          operation({
            operation: {
              type: "delete",
              status: "error",
              error: error,
              isLoading: false,
            },
          })
        );
        toast({
          title: `Somethin went wrong!`,
          status: "error",
          variant: "solid",
        });
      });
  };

export const purgeState = () => async (dispatch: AppDispatch) => {
  persistor.purge();
  window.location.reload();
};
