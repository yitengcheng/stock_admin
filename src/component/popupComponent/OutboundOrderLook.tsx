import { Descriptions } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { randomKey, showOption } from '../../utils';
import { OUTBOUNDORDER_TYPE } from '../../constant';

export default (props: any) => {
  const { id } = props;
  const [outboundOrder, setOutboundOrder] = useStateRef([]);

  useEffect(async () => {
    setOutboundOrder(await post(apis.outboundOrder, { id }));
  }, [id]);

  return (
    <Descriptions title="" bordered layout="vertical" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <Descriptions.Item label="出库单号">{outboundOrder?.orderNo ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="出库时间">
        {outboundOrder?.outboundTime ? dayjs(outboundOrder?.outboundTime).format('YYYY年MM月DD日') : '暂无'}
      </Descriptions.Item>
      <Descriptions.Item label="领用人">{outboundOrder?.receiveUser?.name ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="制单人">{outboundOrder?.voucherUser?.name ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="数量合计">{outboundOrder?.numberTotal ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="金额合计">{outboundOrder?.amountTotal ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="状态">
        {outboundOrder?.status ? showOption(OUTBOUNDORDER_TYPE, outboundOrder?.status) : '暂无'}
      </Descriptions.Item>
      <Descriptions.Item label="备注">{outboundOrder?.remark ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="物品列表">
        {outboundOrder?.outboundItems?.map((outboundOrderItem) => {
          const good = outboundOrderItem?.goodId;
          return (
            <Descriptions title={good?.name ?? '暂无'} key={randomKey()}>
              <Descriptions.Item label="规格型号">{good?.models ?? '暂无'}</Descriptions.Item>
              <Descriptions.Item label="计量单位">{good?.unit?.name ?? '暂无'}</Descriptions.Item>
              <Descriptions.Item label="物品分类">{good?.classification?.name ?? '暂无'}</Descriptions.Item>
              <Descriptions.Item label="单价">{good?.price ?? '暂无'}</Descriptions.Item>
              <Descriptions.Item label="供应商">{good?.supplierId?.name ?? '暂无'}</Descriptions.Item>
              <Descriptions.Item label="备注">{good?.remark ?? '暂无'}</Descriptions.Item>
            </Descriptions>
          );
        })}
      </Descriptions.Item>
    </Descriptions>
  );
};
