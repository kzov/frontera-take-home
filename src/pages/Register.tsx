import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { Button, Form, Input } from "antd";
import { DatePicker } from "antd";
import { isNil } from "lodash/fp";
import { registerFailure } from "../store/slices/user-add";
import {
  useRedirectIfNotStaff,
  useAppDispatch,
  useAppSelector,
} from "../hooks";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

type FieldType = {
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

function Register() {
  useRedirectIfNotStaff();

  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.userAdd);

  const register = (values: FieldType) => {
    const dob = dayjs(values.dob, dateFormat).format("YYYY-MM-DD");

    dispatch({
      type: "userAdd/registerRequest",
      payload: {
        ...values,
        dob,
      },
    });
  };

  const onFailure = () => {
    dispatch(registerFailure("error"));
  };

  return (
    <>
      {!isNil(error) && <p>Login failed</p>}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={register}
        onFinishFailed={onFailure}
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: "Please provide an email." }]}
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

        <Form.Item<FieldType>
          label="Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: "Please provide a first name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: "Please provide a last name." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please provide a gender." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Date of birth"
          name="dob"
          rules={[
            { required: true, message: "Please provide a date of birth." },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Parent First Name"
          name="parentFirstname"
          rules={[
            { required: true, message: "Please provide a parent first name." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Parent Last Name"
          name="parentLastname"
          rules={[
            { required: true, message: "Please provide a parent last name." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Register;
