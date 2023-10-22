import type { RootState } from "../store";
import { call, put, select } from "typed-redux-saga";
import { createSlice } from "@reduxjs/toolkit";
import { isNil } from "lodash/fp";
import { userInfo } from "../../api/user-info";

export interface UserDetailsState {
  data: Awaited<ReturnType<typeof userInfo>> | null;
  error: unknown;
  loading: boolean;
}

const initialState: UserDetailsState = {
  data: null,
  error: null,
  loading: false,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfoRequest: (state) => {
      state.loading = true;
    },

    userInfoSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },

    userInfoFailure: (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { userInfoRequest, userInfoSuccess, userInfoFailure } =
  userInfoSlice.actions;

export interface userInfoRequestAction {
  type: "userInfo/userInfoRequest";
}

export function* userInfoRequestSaga() {
  try {
    const selectToken = (state: RootState) => {
      return state.session.data?.tokenAuth.token;
    };

    const token = yield* select(selectToken);

    if (isNil(token)) {
      throw new Error("No session token");
    }

    const response = yield* call(userInfo, token);

    yield* put(userInfoSlice.actions.userInfoSuccess(response));
  } catch (error) {
    yield* put(userInfoSlice.actions.userInfoFailure("error"));
  }
}

export default userInfoSlice.reducer;
