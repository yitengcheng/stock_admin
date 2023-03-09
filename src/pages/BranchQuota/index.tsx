import { Button, Form, Modal, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import apis from '../../apis';
import { initDepartment, initGoodOption } from '../../utils/initOption';
import MyModal from '../../component/common/MyModal';
import BranchQuotaDetail from '../../component/popupComponent/BranchQuotaDetail';
import { post } from '../../axios';

export default () => {
  const [screenForm] = Form.useForm();
  const [departmentOption, setDepartmentOption] = useStateRef([]);
  const [goodOption, setGoodOption] = useStateRef([]);
  const [branchQuta, setBranchQuta, branchQutaRef] = useStateRef([]);
  const [params, setParams] = useStateRef('');
  const tableRef = useRef(0);
  const modalRef = useRef(0);

  useEffect(async () => {
    setDepartmentOption(await initDepartment());
    setGoodOption(await initGoodOption());
  }, []);

  const delBranchQuta = (ids) => {
    Modal.confirm({
      content: '确认是否删除此部门定额',
      onOk: () => {
        post(apis.delBranchQutas, { ids }).then(() => {
          tableRef.current.refresh();
        });
      },
    });
  };
  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(values);
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <TableScreen label="部门定额">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormSelect label="物品" required={false} name="goodId" options={goodOption} />
          <FormSelect label="部门" required={false} name="departmentId" options={departmentOption} />
          <Button
            type="primary"
            onClick={() => {
              search();
            }}
          >
            查询
          </Button>
        </Form>
      </TableScreen>
      <MyTable
        ref={tableRef}
        onAddBtn={() => {
          modalRef.current.openModal();
        }}
        params={params}
        onDelBtn={(ids) => {
          delBranchQuta(ids);
        }}
        url={apis.branchQutasTable}
        width={3000}
        columns={[
          {
            title: '部门',
            dataIndex: 'departmentId',
            render: (obj) => <span>{obj?.departmentName || '暂无'}</span>,
          },
          {
            title: '物品名称',
            dataIndex: 'goodId',
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          { title: '规格', dataIndex: 'goodId', render: (obj) => <span>{obj?.models || '暂无'}</span> },
          { title: '单位', dataIndex: 'goodId', render: (obj) => <span>{obj?.unit?.name || '暂无'}</span> },
          { title: '一月', dataIndex: 'jan' },
          { title: '二月', dataIndex: 'feb' },
          { title: '三月', dataIndex: 'mar' },
          { title: '四月', dataIndex: 'apr' },
          { title: '五月', dataIndex: 'may' },
          { title: '六月', dataIndex: 'jun' },
          { title: '七月', dataIndex: 'jul' },
          { title: '八月', dataIndex: 'aug' },
          { title: '九月', dataIndex: 'sep' },
          { title: '十月', dataIndex: 'oct' },
          { title: '十一月', dataIndex: 'nov' },
          { title: '十二月', dataIndex: 'dec' },
          { title: '全年定额合计' },
          {
            title: '操作',
            fixed: 'right',
            width: 140,
            render: (text, record) => (
              <Space>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    setBranchQuta(record);
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
                    delBranchQuta([record.key]);
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
        title="部门定额"
        reset={() => {
          setBranchQuta({});
        }}
        width={1000}
      >
        <BranchQuotaDetail
          refresh={() => {
            tableRef.current.refresh();
          }}
          closeModal={() => {
            modalRef.current.closeModal();
          }}
          branchQuta={branchQutaRef.current}
        />
      </MyModal>
    </div>
  );
};
