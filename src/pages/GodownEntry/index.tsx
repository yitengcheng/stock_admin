import { Button, Form, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';
import FormDateRangePicker from '../../component/form/FormDateRangePicker';
import FormInput from '../../component/form/FormInput';
import FormSelect from '../../component/form/FormSelect';
import MyTable from '../../component/columnTable/MyTable';
import TableScreen from '../../component/columnTable/TableScreen';
import MyModal from '../../component/common/MyModal';
import GodownEntryDetail from '../../component/popupComponent/GodownEntryDetail';
import apis from '../../apis';
import lodash from 'lodash';
import dayjs from 'dayjs';
import { showOption } from '../../utils';
import { GODOWNENTRY_TYPE } from '../../constant';
import { post } from '../../axios';
import GodownEntryLook from '../../component/popupComponent/GodownEntryLook';
import { initEmployeeOption, initStorageTypeOption, initSupplierOption } from '../../utils/initOption';

export default () => {
  const [screenForm] = Form.useForm();
  const tableRef = useRef(0);
  const modalRef = useRef(0);
  const detailModalRef = useRef(0);
  const [godownEntry, setGodownEntry, godownEntryRef] = useStateRef({});
  const [godownEntryId, setGodownEntryId, godownEntryIdRef] = useStateRef({});
  const [params, setParams] = useStateRef({});
  const [storageTypeOption, setStorageTypeOption] = useStateRef([]);
  const [supplierOption, setSupplierOption] = useStateRef([]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);

  useEffect(async () => {
    setStorageTypeOption(await initStorageTypeOption());
    setSupplierOption(await initSupplierOption());
    setEmployeeOption(await initEmployeeOption());
  }, []);

  const invalidGodownEntry = (id) => {
    Modal.error({
      content: '确认是否作废此入库单',
      onOk: () => {
        post(apis.invalidGodownEntry, { id }).then(() => {
          tableRef.current.refresh();
        });
      },
    });
  };
  const search = () => {
    screenForm.validateFields().then((values) => {
      setParams(lodash.pickBy(values));
    });
  };

  return (
    <div className="mainContainer">
      <TableScreen label="入库单">
        <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
          <FormInput label="单据编号" required={false} name="orderNo" />
          <FormDateRangePicker label="入库时间" required={false} name="storageTime" />
          <FormSelect label="入库类型" required={false} name="storageType" options={storageTypeOption} />
          <FormSelect label="供应商" required={false} name="supplierId" options={supplierOption} />
          <FormSelect label="经手人" required={false} name="handleUser" options={employeeOption} />
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
        url={apis.godownEntryTable}
        params={params}
        onAddBtn={() => {
          modalRef.current.openModal();
        }}
        onClickRow={(id) => {
          setGodownEntryId(id);
          detailModalRef.current.openModal();
        }}
        width={1800}
        columns={[
          { title: '入库单号', dataIndex: 'orderNo' },
          {
            title: '物品名称',
            dataIndex: 'godownEntryIds',
            render: (obj) => <span>{lodash.map(lodash.map(obj, 'goodId'), 'name').join(',') || '暂无'}</span>,
          },
          { title: '数量合计', dataIndex: 'numberTotal' },
          { title: '金额合计', dataIndex: 'amountTotal' },
          {
            title: '入库类型',
            dataIndex: 'storageType',
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          {
            title: '入库时间',
            dataindex: 'storageTime',
            render: (obj) => (
              <span>{obj?.storageTime ? dayjs(obj?.storageTime).format('YYYY年MM月DD日') : '暂无'}</span>
            ),
          },
          {
            title: '状态',
            dataindex: 'status',
            render: (obj) => <span>{obj?.status ? showOption(GODOWNENTRY_TYPE, obj?.status) : '暂无'}</span>,
          },
          { title: '备注', dataIndex: 'remark', width: 160 },
          {
            title: '操作',
            fixed: 'right',
            render: (text, record) => {
              if (record?.status === 1) {
                return (
                  <Button
                    size="small"
                    type="link"
                    danger
                    onClick={() => {
                      invalidGodownEntry(record?._id);
                    }}
                  >
                    作废
                  </Button>
                );
              }
            },
          },
        ]}
      />
      <MyModal
        ref={modalRef}
        title="入库单"
        reset={() => {
          setGodownEntry({});
        }}
        width={1200}
      >
        <GodownEntryDetail
          refresh={() => {
            tableRef.current.refresh();
          }}
          closeModal={() => {
            modalRef.current.closeModal();
          }}
          godownEntry={godownEntryRef.current}
        />
      </MyModal>
      <MyModal ref={detailModalRef} title="" width={900}>
        <GodownEntryLook
          id={godownEntryIdRef.current}
          closeModal={() => {
            detailModalRef.current.closeModal();
          }}
        />
      </MyModal>
    </div>
  );
};
