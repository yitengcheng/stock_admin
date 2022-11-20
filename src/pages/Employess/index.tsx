import { Form } from 'antd';
import React, { useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import SortingOptions from '../../component/rowTable/SortingOptions';
import MyModal from '../../component/common/MyModal';

export default () => {
  const [screenForm] = Form.useForm();
  const modalRef = useRef(0);
  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <SortingOptions title="所有部门" />
      <div className={styles.mainContainer}>
        <TableScreen label="员工管理">
          <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
            <FormSelect label="类型" required={false} name="outboundType" />
            <FormInput label="姓名" required={false} name="receiptNumber" />
            <FormInput label="联系电话" required={false} name="receiptNumber" />
          </Form>
        </TableScreen>
        <MyTable
          onAddBtn={() => {}}
          columns={[
            { title: '部门' },
            { title: '姓名' },
            { title: '联系方式' },
            { title: '员工类型' },
            { title: '备注' },
            { title: '操作' },
          ]}
        />
        <MyModal ref={modalRef} title="员工" />
      </div>
    </div>
  );
};
