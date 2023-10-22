import { loginRequestSaga } from "./slices/session";
import { registerRequestSaga } from "./slices/user-add";
import { takeLatest } from "redux-saga/effects";
import { userInfoRequestSaga } from "./slices/user-details";

export default function* rootSaga() {
  yield takeLatest("session/loginRequest", loginRequestSaga);
  yield takeLatest("userAdd/registerRequest", registerRequestSaga);
  yield takeLatest("userInfo/userInfoRequest", userInfoRequestSaga);
}
