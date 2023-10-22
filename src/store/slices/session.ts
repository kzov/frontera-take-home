import { call, put } from "typed-redux-saga";
import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/login";

export interface SessionState {
  data: Awaited<ReturnType<typeof login>> | null;
  error: unknown;
  loading: boolean;
}

const initialState: SessionState = {
  data: null,
  error: null,
  loading: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logoutRequest: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },

    loginRequest: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },

    loginFailure: (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest } =
  sessionSlice.actions;

export interface loginRequestAction {
  type: "session/loginRequest";
  payload: { username: string; password: string };
}

export function* loginRequestSaga({ payload }: loginRequestAction) {
  try {
    const response = yield* call(login, payload.username, payload.password);

    yield* put(sessionSlice.actions.loginSuccess(response));
  } catch (error) {
    yield* put(sessionSlice.actions.loginFailure("error"));
  }
}

export default sessionSlice.reducer;
