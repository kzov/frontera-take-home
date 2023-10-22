import { Space, Button, Layout, Menu, theme } from "antd";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { isNil } from "lodash/fp";
import { logoutRequest } from "../store/slices/session";
import { useInitialRoute, useAppSelector, useAppDispatch } from "../hooks";

function Root() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.session);
  const location = useLocation();
  useInitialRoute();

  const isStaff = !isNil(data?.tokenAuth.user.staff);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => dispatch(logoutRequest());

  const loginParent = () => {
    dispatch({
      type: "session/loginRequest",
      payload: {
        username: "shubham.cogniable+parent1@gmail.com",
        password: "123456",
      },
    });
  };

  const loginAdmin = () => {
    dispatch({
      type: "session/loginRequest",
      payload: {
        username: "rinkalkhatrani123+bcba1@gmail.com",
        password: "123456",
      },
    });
  };

  const _items = [
    {
      key: "/login",
      label: isNil(data) ? (
        <NavLink to="/login">Login</NavLink>
      ) : (
        <NavLink to={"/login"} onClick={logout}>
          Log out
        </NavLink>
      ),
    },
    {
      key: "/dashboard",
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
    },
  ].concat(
    isStaff
      ? {
          key: "/register",
          label: <NavLink to="/register">Register</NavLink>,
        }
      : []
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Layout.Header>
        <Menu
          selectedKeys={[location.pathname]}
          theme="dark"
          mode="horizontal"
          items={_items}
        />
      </Layout.Header>

      <Layout.Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </Layout.Content>

      <Layout.Footer>
        <Space wrap>
          <Button type="dashed" htmlType="button" onClick={loginParent}>
            Parent
          </Button>

          <Button type="dashed" htmlType="button" onClick={loginAdmin}>
            Admin
          </Button>
        </Space>
      </Layout.Footer>
    </Layout>
  );
}

export default Root;
