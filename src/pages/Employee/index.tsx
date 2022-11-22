import { Button, Form, message, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import DepartmentOption from '../../component/leftCommon/DepartmentOption';
import MyModal from '../../component/common/MyModal';
import EmployeeDetail from '../../component/popupComponent/EmployeeDetail';
import apis from '../../apis';
import { showOption } from '../../utils';
import { EMPLOYEE_TYPE } from '../../constant';
import { post } from '../../axios';

export default () => {
  const [screenForm] = Form.useForm();
  const modalRef = useRef(0);
  const tableRef = useRef(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [departmentId, setDepartmentId] = useStateRef();
  const [employee, setEmployee, employeeRef] = useStateRef('');
  const [searchParams, setSearchParams, searchParamsRef] = useStateRef('');

  const addEmployeeModal = () => {
    modalRef.current.openModal();
  };
  const selectDepart = (id) => {
    setDepartmentId(id);
  };
  const delEmployees = (ids) => {
    Modal.confirm({
      content: '确认是否删除员工',
      onOk: () => {
        post(apis.delEmployee, { ids }).then((result) => {
          tableRef.current.refresh();
        });
      },
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      {contextHolder}
      <DepartmentOption onClick={selectDepart} />
      <div className={styles.mainContainer}>
        <TableScreen label="员工管理">
          <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
            <FormSelect label="类型" required={false} name="type" options={EMPLOYEE_TYPE} />
            <FormInput label="姓名" required={false} name="name" />
            <FormInput label="联系电话" required={false} name="phone" />
            <Button
              type="primary"
              onClick={() => {
                screenForm.validateFields().then((values) => {
                  setSearchParams(values);
                });
              }}
            >
              查询
            </Button>
          </Form>
        </TableScreen>
        <MyTable
          ref={tableRef}
          url={apis.employeeTable}
          params={{ departmentId, ...searchParamsRef.current }}
          onAddBtn={addEmployeeModal}
          onDelBtn={delEmployees}
          columns={[
            { title: '部门', dataIndex: 'departmentId', render: (obj) => <span>{obj?.departmentName || '暂无'}</span> },
            { title: '姓名', dataIndex: 'name' },
            { title: '联系方式', dataIndex: 'phone' },
            { title: '员工类型', dataIndex: 'type', render: (obj) => <span>{showOption(EMPLOYEE_TYPE, obj)}</span> },
            { title: '备注', dataIndex: 'remark' },
            {
              title: '操作',
              render: (text, record) => (
                <Space>
                  <Button
                    size="small"
                    type="link"
                    onClick={() => {
                      delete record.departmentId;
                      delete record.password;
                      setEmployee(record);
                      modalRef.current.openModal();
                    }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => {
                      delEmployees([record.key]);
                    }}
                  >
                    删除
                  </Button>
                </Space>
              ),
            },
          ]}
        />
        <MyModal
          ref={modalRef}
          title="员工"
          reset={() => {
            setEmployee({});
          }}
        >
          <EmployeeDetail
            departmentId={departmentId}
            refresh={tableRef.current.refresh}
            closeModal={modalRef.current.closeModal}
            employee={employeeRef.current}
          />
        </MyModal>
      </div>
    </div>
  );
};
