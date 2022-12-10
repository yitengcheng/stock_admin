import { Form } from 'antd';
import React from 'react';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import FormSwitch from '../../component/form/FormSwitch';
import DepartmentOption from '../../component/leftCommon/DepartmentOption';

export default () => {
  const [screenForm] = Form.useForm();
  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <DepartmentOption />
      <div className={styles.mainContainer}>
        <TableScreen label="库存查询">
          <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
            <FormSelect label="类型" required={false} name="outboundType" />
            <FormInput label="查询值" required={false} name="receiptNumber" />
            <FormSwitch label="包含零件库" required={false} name="zero" options={['包含', '不包含']} />
            <FormSwitch label="照片预览框" required={false} name="photo" />
          </Form>
        </TableScreen>
        <MyTable
          columns={[
            { title: '物品编号' },
            { title: '物品名称' },
            { title: '物品分类' },
            { title: '规格' },
            { title: '单位' },
            { title: '单价' },
            { title: '库存数量' },
            { title: '库存上限' },
            { title: '库存下限' },
            { title: '预警状态' },
            { title: '备注' },
          ]}
        />
      </div>
    </div>
  );
};
