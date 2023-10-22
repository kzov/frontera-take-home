import { Button, Form, Input, Typography } from "antd";
import { isNil } from "lodash/fp";
import { loginFailure } from "../store/slices/session";
import {
  useAppDispatch,
  useAppSelector,
  useRedirectIfLoggedIn,
} from "../hooks";

type FieldType = {
  username?: string;
  password?: string;
};

function Login() {
  useRedirectIfLoggedIn();

  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.session);

  const login = (values: FieldType) => {
    dispatch({
      type: "session/loginRequest",
      payload: values,
    });
  };

  const onFailuer = () => {
    dispatch(loginFailure("error"));
  };

  return (
    <>
      {!isNil(error) && (
        <Typography.Paragraph>Login failed</Typography.Paragraph>
      )}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={login}
        onFinishFailed={onFailuer}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={loading} type="primary" htmlType="submit">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
