import { Button, Form, Modal, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import styles from './index.module.less';
import MyModal from '../../component/common/MyModal';
import OutboundOrderDetail from '../../component/popupComponent/OutboundOrderDetail';
import apis from '../../apis';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { initDepartment, initEmployeeOption, initOutboundTypeOption } from '../../utils/initOption';
import { showOption } from '../../utils';
import { OUTBOUNDORDER_TYPE } from '../../constant';
import { post } from '../../axios';
import OutboundOrderLook from '../../component/popupComponent/OutboundOrderLook';

export default (props: any) => {
  const [screenForm] = Form.useForm();
  const modalRef = useRef(0);
  const tableRef = useRef(0);
  const lookModalRef = useRef(0);
  const [outboundOrder, setOutboundOrder, outboundOrderRef] = useStateRef({});
  const [outboundTypeOption, setOutboundTypeOption] = useStateRef([]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);
  const [departmentOption, setDepartmentOption] = useStateRef([]);
  const [params, setParams] = useStateRef({});
  const [outboundOrderId, setOutboundOrderId] = useStateRef('');
  const [mode, setMode] = useStateRef(1);

  useEffect(async () => {
    setOutboundTypeOption(await initOutboundTypeOption());
    setEmployeeOption(await initEmployeeOption());
    setDepartmentOption(await initDepartment());
  }, []);

  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(lodash.pickBy(values));
    });
  };
  const invalidOutboundOrder = (id) => {
    Modal.error({
      content: '确认是否作废此出库单',
      onOk: () => {
        post(apis.invalidOutboundOrder, { id }).then((result) => {
          tableRef.current.refresh();
        });
      },
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')}>
      <TableScreen label="出库单">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormInput label="单据编号" required={false} name="orderNo" />
          <FormDateRangePicker label="出库时间" required={false} name="outboundTime" />
          <FormSelect label="出库类型" required={false} name="outboundType" options={outboundTypeOption} />
          <FormSelect label="领用部门" required={false} name="receiveDepartment" options={departmentOption} />
          <FormSelect label="领用人" required={false} name="receiveUser" options={employeeOption} />
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
        url={apis.outboundOrderTable}
        params={params}
        onAddBtn={() => {
          setOutboundOrder({});
          setMode(1);
          modalRef.current.openModal();
        }}
        columns={[
          { title: '出库单号', dataIndex: 'orderNo', width: 100 },
          {
            title: '物品名称',
            dataIndex: 'outboundItems',
            render: (obj) => <span>{lodash.map(lodash.map(obj, 'goodId'), 'name').join(',') || '暂无'}</span>,
          },
          { title: '数量合计', dataIndex: 'numberTotal', width: 80 },
          { title: '金额合计', dataIndex: 'amountTotal', width: 80 },
          {
            title: '出库类型',
            dataIndex: 'outboundType',
            width: 80,
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          {
            title: '出库时间',
            dataindex: 'outboundTime',
            width: 80,
            render: (obj) => (
              <span>{obj?.outboundTime ? dayjs(obj?.outboundTime).format('YYYY年MM月DD日') : '暂无'}</span>
            ),
          },
          {
            title: '状态',
            dataindex: 'status',
            width: 80,
            render: (obj) => <span>{obj?.status ? showOption(OUTBOUNDORDER_TYPE, obj?.status) : '暂无'}</span>,
          },
          { title: '备注', dataIndex: 'remark', width: 160 },
          {
            title: '操作',
            width: 140,
            fixed: 'right',
            render: (text, record) => (
              <Space>
                {record?.status <= 4 && (
                  <Button
                    size="small"
                    type="text"
                    danger
                    onClick={() => {
                      invalidOutboundOrder(record?._id);
                    }}
                  >
                    作废
                  </Button>
                )}
                {record?.status === 3 && (
                  <Button
                    size="small"
                    type="link"
                    onClick={() => {
                      setMode(3);
                      setOutboundOrder(record);
                      modalRef.current.openModal();
                    }}
                  >
                    领用
                  </Button>
                )}
                <Button
                  size="small"
                  type="text"
                  onClick={() => {
                    setOutboundOrderId(record._id);
                    lookModalRef.current.openModal();
                  }}
                >
                  查看出库单
                </Button>
              </Space>
            ),
          },
        ]}
      />
      <MyModal
        ref={modalRef}
        title="出库单"
        reset={() => {
          setOutboundOrder({});
        }}
        width={1200}
      >
        <OutboundOrderDetail
          refresh={() => {
            tableRef.current.refresh();
          }}
          closeModal={() => {
            modalRef.current.closeModal();
          }}
          outboundOrder={outboundOrderRef.current}
          mode={mode}
        />
      </MyModal>
      <MyModal ref={lookModalRef} title="出库单详情" width={1200}>
        <OutboundOrderLook
          closeModal={() => {
            lookModalRef.current.closeModal();
          }}
          id={outboundOrderId}
        />
      </MyModal>
    </div>
  );
};
