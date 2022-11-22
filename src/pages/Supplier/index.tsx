import { Button, Form, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormInput from '../../component/form/FormInput';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import apis from '../../apis';
import MyModal from '../../component/common/MyModal';
import SupplierDetail from '../../component/popupComponent/SupplierDetail';
import { post } from '../../axios';

export default (props: any) => {
  const [screenForm] = Form.useForm();
  const modalRef = useRef(0);
  const tableRef = useRef(0);
  const [supplier, setSupplier, supplierRef] = useStateRef('');
  const [keyword, setKeyword] = useStateRef('');

  const search = () => {
    screenForm.validateFields().then((values) => {
      setKeyword(values.keyword);
    });
  };
  const delSupplier = (ids) => {
    Modal.confirm({
      content: '确认是否删除供应商',
      onOk: () => {
        post(apis.delSuppliers, { ids }).then((result) => {
          tableRef.current.refresh();
        });
      },
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <TableScreen label="供应商">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormInput label="关键字" required={false} name="keyword" />
          <Button type="primary" onClick={search}>
            查询
          </Button>
        </Form>
      </TableScreen>
      <MyTable
        ref={tableRef}
        keyword={keyword}
        url={apis.supplierTable}
        onAddBtn={() => {
          modalRef.current.openModal();
        }}
        onDelBtn={delSupplier}
        columns={[
          { title: '供应商名', dataIndex: 'name' },
          { title: '负责人姓名', dataIndex: 'headerUser' },
          { title: '联系电话', dataIndex: 'phone' },
          { title: '微信', dataIndex: 'wechat' },
          { title: '电子邮箱', dataIndex: 'email' },
          { title: '地址', dataIndex: 'address' },
          { title: '备注', dataIndex: 'remark' },
          {
            title: '操作',
            render: (text, record) => (
              <Space>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    setSupplier(record);
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
                    delSupplier([record.key]);
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
        title="供应商"
        reset={() => {
          setSupplier({});
        }}
      >
        <SupplierDetail
          refresh={() => {
            tableRef.current.refresh();
          }}
          closeModal={() => {
            modalRef.current.closeModal();
          }}
          supplier={supplierRef.current}
        />
      </MyModal>
    </div>
  );
};
