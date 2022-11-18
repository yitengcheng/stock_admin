import { Form, Row } from "antd";
import React from "react";
import useStateRef from "react-usestateref";
import FormDateRangePicker from "../../component/form/FormDateRangePicker";
import FormInput from "../../component/form/FormInput";
import FormSelect from "../../component/form/FormSelect";
import MyTable from "../../component/columnTable/MyTable";
import TableScreen from "../../component/columnTable/TableScreen";
import { formCol } from "../../utils";
import styles from "./index.module.less";

export default (props: any) => {
  const [screenForm] = Form.useForm();
  return (
    <div className={["baseContainer", "baseHeight"].join(" ")}>
      <TableScreen label="部门定额">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormInput label="物品关键字" required={false} name="receiptNumber" />
          <FormSelect label="选择部门" required={false} name="outboundType" />
        </Form>
      </TableScreen>
      <MyTable
        onAddBtn={() => {}}
        onDelBtn={() => {}}
        columns={[
          { title: "物品编号" },
          { title: "物品名称" },
          { title: "规格" },
          { title: "单位" },
          { title: "1月" },
          { title: "2月" },
          { title: "3月" },
          { title: "4月" },
          { title: "5月" },
          { title: "6月" },
          { title: "7月" },
          { title: "8月" },
          { title: "9月" },
          { title: "10月" },
          { title: "11月" },
          { title: "12月" },
          { title: "全年定额合计" },
        ]}
      />
    </div>
  );
};
