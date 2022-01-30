import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { UserType } from "types/user";

interface UserState {
  list: {
    data: UserType[];
    isLoading: boolean;
    error: any;
    status: "initial" | "fullfilled" | "rejected";
  };
  operation: {
    type: "create" | "update" | "delete";
    isLoading?: boolean;
    error?: any;
    status?: "initial" | "success" | "error";
  };
}

const initialState: UserState = {
  list: {
    data: [],
    isLoading: false,
    error: null,
    status: "initial",
  },
  operation: {
    type: "create",
    isLoading: false,
    error: null,
    status: "initial",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.list.error = null;
      state.list.isLoading = true;
      state.list.status = "initial";
    },
    fetchUsersSuccess: (state, action) => {
      state.list.isLoading = false;
      state.list.data = action.payload;
      state.list.error = null;
      state.list.status = "fullfilled";
    },
    fetchUsersFailure: (state, action: PayloadAction<any>) => {
      state.list.isLoading = false;
      state.list.error = action.payload;
      state.list.data = [];
      state.list.status = "rejected";
    },
    operation: (state, action: PayloadAction<Pick<UserState, "operation">>) => {
      state.operation.isLoading = action.payload.operation.isLoading;
      state.operation.type = action.payload.operation.type;
      state.operation.error = action.payload.operation.error;
      state.operation.status = action.payload.operation.status;
    },
    updateUser: (state, action) => {
      const newData = state.list.data.map((user) => {
        if (Number(user.id) === Number(action.payload.id)) {
          return Object.assign(user, action.payload);
        } else return user;
      });
      state.list.data = newData;
    },
    addUser: (state, action) => {
      state.list.data = [...state.list.data, action.payload];
    },
    removeUser: (state, action: PayloadAction<UserType>) => {
      const newData = state.list.data.filter(
        (user) => user.id !== action.payload.id
      );
      state.list.data = newData;
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUser,
  addUser,
  removeUser,
  operation,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userListState = (state: RootState) => state.user.list;
export const userListStateDataLength = (state: RootState) =>
  state.user.list.data.length;
export const userOperationState = (state: RootState) => state.user.operation;

export const { reducer } = userSlice;
