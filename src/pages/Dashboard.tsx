import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { List, Typography } from "antd";
import { isNil } from "lodash/fp";
import { useEffect } from "react";

import {
  useRedirectIfNotLoggedIn,
  useAppSelector,
  useAppDispatch,
} from "../hooks";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

function Dashboard() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.session);
  useRedirectIfNotLoggedIn();

  useEffect(() => {
    if (isNil(data)) {
      dispatch({ type: "userInfo/userInfoRequest" });
    }
  }, [data, dispatch]);

  const userInfo = data?.tokenAuth.user;

  if (!isNil(userInfo)) {
    const _user = [
      {
        label: "Username",
        value: userInfo.username,
      },
      {
        label: "Email",
        value: userInfo.email,
      },
      {
        label: "Last Login",
        value: dayjs(userInfo.lastLogin, dateFormat).format("YYYY-MM-DD"),
      },
    ];

    return (
      <>
        <div className="dashboard">
          <div className="user-info">
            <Typography.Title>
              {isNil(userInfo.staff) ? "Parent" : "Staff"} -{" "}
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </Typography.Title>

            <List
              itemLayout="horizontal"
              dataSource={_user}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Typography.Text>{item.label}</Typography.Text>}
                    description={
                      <Typography.Text>{item.value}</Typography.Text>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          {!isNil(userInfo.students) && (
            <div className="student-info">
              <Typography.Title>Students</Typography.Title>
              <List
                itemLayout="horizontal"
                dataSource={[userInfo.students]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Typography.Text>
                          {item.firstname} {item.lastname}
                        </Typography.Text>
                      }
                      description={
                        <Typography.Text>
                          Parent: {item.parentFirstname} {item.parentLastname}
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>

        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </>
    );
  }
}

export default Dashboard;
