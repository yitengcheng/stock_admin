import { Button, Form, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormInput from '../../component/form/FormInput';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import apis from '../../apis';
import MyModal from '../../component/common/MyModal';
import OptionDetail from '../../component/popupComponent/OptionDetail';
import { post } from '../../axios';
import FormSelect from '../../component/form/FormSelect';
import { OPTION_TYPE } from '../../constant';
import { showOption } from '../../utils';

export default (props: any) => {
  const [screenForm] = Form.useForm();
  const modalRef = useRef(0);
  const tableRef = useRef(0);
  const [option, setOption, optionRef] = useStateRef('');
  const [params, setParams] = useStateRef('');

  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };
  const delOption = (ids) => {
    Modal.confirm({
      content: '确认是否删除此选项',
      onOk: () => {
        post(apis.delOption, { ids }).then((result) => {
          tableRef.current.refresh();
        });
      },
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <TableScreen label="选项">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormSelect label="选项类型" required={false} name="type" options={OPTION_TYPE} />
          <Button type="primary" onClick={search}>
            查询
          </Button>
        </Form>
      </TableScreen>
      <MyTable
        ref={tableRef}
        params={params}
        url={apis.optionTable}
        onAddBtn={() => {
          modalRef.current.openModal();
        }}
        onDelBtn={delOption}
        columns={[
          { title: '选项类型', dataIndex: 'type', render: (obj) => <span>{showOption(OPTION_TYPE, obj)}</span> },
          { title: '选项名', dataIndex: 'name' },
          { title: '备注', dataIndex: 'remark' },
          {
            title: '操作',
            render: (text, record) => (
              <Space>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    setOption(record);
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
                    delOption([record.key]);
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
          setOption({});
        }}
      >
        <OptionDetail
          refresh={() => {
            tableRef.current.refresh();
          }}
          closeModal={() => {
            modalRef.current.closeModal();
          }}
          option={optionRef.current}
        />
      </MyModal>
    </div>
  );
};
