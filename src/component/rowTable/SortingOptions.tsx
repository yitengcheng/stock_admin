import { List, Typography } from "antd";
import React from "react";
import useStateRef from "react-usestateref";
import styles from "./index.module.less";

export default (props: any) => {
  const { data, level = 5, title, bordered = false, onClick } = props;

  const clickItem = (id) => {
    onClick && onClick(id);
  };

  return (
    <div className={styles.SortingOptionsContainer}>
      <List
        style={{ border: "none" }}
        header={<Typography.Title level={level}>{title}</Typography.Title>}
        footer={null}
        pagination={null}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              clickItem(item.id);
            }}
          >
            <Typography.Text>{item.text}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};
