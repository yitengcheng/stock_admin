import { Descriptions } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { showOption } from '../../utils';
import { GODOWNENTRY_TYPE } from '../../constant';

export default (props: any) => {
  const { id } = props;
  const [godownEntry, setGodownEntry] = useStateRef([]);

  useEffect(async () => {
    setGodownEntry(await post(apis.godownEntry, { id }));
  }, [id]);

  return (
    <Descriptions title="入库单详情" bordered layout="vertical" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <Descriptions.Item label="入库单号">{godownEntry?.orderNo ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="入库时间">
        {godownEntry?.storageTime ? dayjs(godownEntry?.storageTime).format('YYYY年MM月DD日') : '暂无'}
      </Descriptions.Item>
      <Descriptions.Item label="供应商">{godownEntry?.supplierId?.name ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="经手人">{godownEntry?.handleUser?.name ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="制单人">{godownEntry?.voucherUser?.name ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="数量合计">{godownEntry?.numberTotal ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="金额合计">{godownEntry?.amountTotal ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="状态">
        {godownEntry?.status ? showOption(GODOWNENTRY_TYPE, godownEntry?.status) : '暂无'}
      </Descriptions.Item>
      <Descriptions.Item label="备注">{godownEntry?.remark ?? '暂无'}</Descriptions.Item>
      <Descriptions.Item label="物品列表">
        {godownEntry?.godownEntryIds?.map((godownEntryItem) => {
          const good = godownEntryItem?.goodId;
          return (
            <Descriptions title={good?.name ?? '暂无'}>
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
