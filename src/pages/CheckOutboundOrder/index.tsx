import dayjs from 'dayjs';
import React, { useRef } from 'react';
import useStateRef from 'react-usestateref';
import MyTable from '../../component/columnTable/MyTable';
import { showOption } from '../../utils';
import lodash from 'lodash';
import MyModal from '../../component/common/MyModal';
import apis from '../../apis';
import { getStorage } from '../../localStorage';
import { OUTBOUNDORDER_TYPE } from '../../constant';
import { Button, Modal, Space } from 'antd';
import { post } from '../../axios';
import OutboundOrderLook from '../../component/popupComponent/OutboundOrderLook';
import AuditStatusLook from '../../component/popupComponent/AuditStatusLook';
import { ExclamationCircleFilled } from '@ant-design/icons';

export default () => {
  const tableRef = useRef(0);
  const lookModalRef = useRef(0);
  const lookStatusModalRef = useRef(0);
  const [outboundOrderId, setOutboundOrderId] = useStateRef('');

  const checkOrder = (id) => {
    Modal.confirm({
      title: '是否同意该申请单',
      icon: <ExclamationCircleFilled />,
      onOk() {
        post(apis.checkOutboundOrder, { id, auditStatus: 2 }).then(() => {
          tableRef.current.refresh();
        });
      },
      onCancel() {
        post(apis.checkOutboundOrder, { id, auditStatus: 3 }).then(() => {
          tableRef.current.refresh();
        });
      },
    });
  };

  return (
    <div className="mainContainer">
      <MyTable
        ref={tableRef}
        params={{
          type: 1,
        }}
        url={apis.checkOutboundOrderTable}
        name="审批列表"
        width={2200}
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
            width: 100,
            render: (obj) => (
              <span>{obj?.outboundTime ? dayjs(obj?.outboundTime).format('YYYY年MM月DD日') : '暂无'}</span>
            ),
          },
          {
            title: '申领时间',
            dataindex: 'applyTime',
            width: 100,
            render: (obj) => <span>{obj?.applyTime ? dayjs(obj?.applyTime).format('YYYY年MM月DD日') : '暂无'}</span>,
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
              <Space size="small">
                <Button
                  size="small"
                  type="text"
                  onClick={() => {
                    checkOrder(record?._id);
                  }}
                >
                  审核
                </Button>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    setOutboundOrderId(record?._id);
                    lookStatusModalRef.current.openModal();
                  }}
                >
                  查看审核状态
                </Button>
                <Button
                  size="small"
                  type="text"
                  danger
                  onClick={() => {
                    setOutboundOrderId(record?._id);
                    lookModalRef.current.openModal();
                  }}
                >
                  查看申领单
                </Button>
              </Space>
            ),
          },
        ]}
      />
      <MyModal ref={lookModalRef} title="出库单详情" width={1200}>
        <OutboundOrderLook
          closeModal={() => {
            lookModalRef.current.closeModal();
          }}
          id={outboundOrderId}
        />
      </MyModal>
      <MyModal ref={lookStatusModalRef} title="审核详情" width={1200}>
        <AuditStatusLook
          closeModal={() => {
            lookStatusModalRef.current.closeModal();
          }}
          id={outboundOrderId}
        />
      </MyModal>
    </div>
  );
};
