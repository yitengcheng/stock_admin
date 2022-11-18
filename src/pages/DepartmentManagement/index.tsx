import { Button, Modal, Result, Space, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import useStateRef from "react-usestateref";
import styles from "./index.module.less";
import * as echarts from "echarts";
import { post } from "../../axios";
import apis from "../../apis";
import MyModal from "../../component/common/MyModal";
import DepartDetail from "../../component/popupComponent/DepartDetail";
import DelDepartDetail from "../../component/popupComponent/DelDepartDetail";

export default (props: any) => {
  const [isModalOpen, setIsModalOpen] = useStateRef(false);
  const [parentId, setParentId, currentParentIdRef] = useStateRef("");
  const [departmentName, setDepartmentName, currentDepartmentNameRef] = useStateRef("");
  const [departmentId, setDepartmentId, currentDepartmentIdRef] = useStateRef("");
  const modalRef = useRef(0);
  const delModalRef = useRef(0);
  useEffect(() => {
    departmentTree();
  }, []);
  const departmentTree = async () => {
    const myChart = echarts.init(document.getElementById("departmentTree"));
    const data = await post(apis.departsTree);
    myChart.setOption({
      series: [
        {
          type: "tree",
          data: [data],
          left: "2%",
          right: "2%",
          top: "8%",
          bottom: "20%",
          symbolSize: 12,
          orient: "vertical",
          label: {
            fontSize: 14,
            position: "top",
            verticalAlign: "middle",
            align: "middle",
          },
          leaves: {
            label: {
              position: "bottom",
              verticalAlign: "middle",
              align: "middle",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: false,
          initialTreeDepth: 4,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    });
    myChart.on("click", (params) => {
      setDepartmentName(params?.data?.name);
      setParentId(params?.data?.parentId);
      setDepartmentId(params?.data?.id);
      modalRef.current.openModal();
    });
  };
  const showModal = () => {
    modalRef.current.openModal();
  };
  const showDelModal = () => {
    delModalRef.current.openModal();
  };

  return (
    <div className={["baseContainer", "baseBorder"].join(" ")}>
      <div className={styles.titleContainer}>
        <Typography.Title level={3}>部门管理</Typography.Title>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              showModal();
            }}
          >
            新增
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              showDelModal();
            }}
          >
            删除
          </Button>
        </Space>
      </div>
      <div className={styles.treeContainer}>
        <div id="departmentTree" className={styles.tree}></div>
      </div>
      <MyModal ref={modalRef} title="部门">
        <DepartDetail
          departmentName={currentDepartmentNameRef.current}
          parentId={currentParentIdRef.current}
          departmentId={currentDepartmentIdRef.current}
          refresh={() => {
            departmentTree();
          }}
          closeModal={() => {
            setDepartmentId("");
            setDepartmentName("");
            setParentId("");
            modalRef.current.closeModal();
          }}
        />
      </MyModal>
      <MyModal ref={delModalRef} title="部门">
        <DelDepartDetail
          refresh={() => {
            departmentTree();
          }}
          closeModal={() => {
            delModalRef.current.closeModal();
          }}
        />
      </MyModal>
    </div>
  );
};
