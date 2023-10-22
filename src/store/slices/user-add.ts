import { call, put } from "typed-redux-saga";
import { createSlice } from "@reduxjs/toolkit";
import { register } from "../../api/register";

export interface RegisterState {
  data: Awaited<ReturnType<typeof register>> | null;
  error: unknown;
  loading: boolean;
}

const initialState: RegisterState = {
  data: null,
  error: null,
  loading: false,
};

export const registerSlice = createSlice({
  name: "userAdd",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },

    registerSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },

    registerFailure: (state, action) => {
      state.data = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { registerRequest, registerSuccess, registerFailure } =
  registerSlice.actions;

export interface userInfoRequestAction {
  type: "userAdd/registerRequest";
}

export interface registerRequestAction {
  type: "userAdd/registerRequest";
  payload: {
    confirmPassword: string;
    dob: string;
    email: string;
    firstname: string;
    gender: string;
    lastname: string;
    parentFirstname: string;
    parentLastname: string;
    password: string;
  };
}

export function* registerRequestSaga({ payload }: registerRequestAction) {
  try {
    const response = yield* call(register, payload);

    yield* put(registerSlice.actions.registerSuccess(response));
  } catch (error) {
    yield* put(registerSlice.actions.registerFailure("error"));
  }
}

export default registerSlice.reducer;
