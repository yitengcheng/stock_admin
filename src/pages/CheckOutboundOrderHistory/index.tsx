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
import { Button, Space } from 'antd';
import OutboundOrderLook from '../../component/popupComponent/OutboundOrderLook';
import AuditStatusLook from '../../component/popupComponent/AuditStatusLook';

export default () => {
  const tableRef = useRef(0);
  const lookModalRef = useRef(0);
  const lookStatusModalRef = useRef(0);
  const [outboundOrderId, setOutboundOrderId] = useStateRef('');

  return (
    <div className="mainContainer">
      <MyTable
        ref={tableRef}
        params={{
          type: 2,
        }}
        url={apis.checkOutboundOrderTable}
        name="审批历史列表"
        columns={[
          { title: '出库单号', dataIndex: 'orderNo' },
          {
            title: '物品名称',
            dataIndex: 'outboundItems',
            render: (obj) => <span>{lodash.map(lodash.map(obj, 'goodId'), 'name').join(',') || '暂无'}</span>,
          },
          { title: '数量合计', dataIndex: 'numberTotal' },
          // { title: '金额合计', dataIndex: 'amountTotal', width: 80 },
          {
            title: '出库类型',
            dataIndex: 'outboundType',
            render: (obj) => <span>{obj?.name || '暂无'}</span>,
          },
          {
            title: '出库时间',
            dataindex: 'outboundTime',
            render: (obj) => (
              <span>{obj?.outboundTime ? dayjs(obj?.outboundTime).format('YYYY年MM月DD日') : '暂无'}</span>
            ),
          },
          {
            title: '申领时间',
            dataindex: 'applyTime',
            render: (obj) => <span>{obj?.applyTime ? dayjs(obj?.applyTime).format('YYYY年MM月DD日') : '暂无'}</span>,
          },
          {
            title: '状态',
            dataindex: 'status',
            render: (obj) => <span>{obj?.status ? showOption(OUTBOUNDORDER_TYPE, obj?.status) : '暂无'}</span>,
          },
          { title: '备注', dataIndex: 'remark' },
          {
            title: '操作',
            fixed: 'right',
            render: (text, record) => (
              <Space size="small">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setOutboundOrderId(record?._id);
                    lookModalRef.current.openModal();
                  }}
                >
                  查看申领单
                </Button>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setOutboundOrderId(record?._id);
                    lookStatusModalRef.current.openModal();
                  }}
                >
                  查看审核状态
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
