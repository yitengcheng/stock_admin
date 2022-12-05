import { Descriptions } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import lodash from 'lodash';
import { randomKey, showOption } from '../../utils';
import { AUDITSTATUS_TYPE, GODOWNENTRY_TYPE, OUTBOUNDORDER_TYPE } from '../../constant';

export default (props: any) => {
  const { closeModal, id } = props;
  const [auditStatusUser, setAuditStatusUser] = useStateRef([]);

  useEffect(async () => {
    setAuditStatusUser(await post(apis.lookAuditStatus, { id }));
  }, [id]);

  return (
    <div>
      {auditStatusUser?.auditStatusList?.map((item) => {
        return (
          <Descriptions key={randomKey()} bordered layout="vertical">
            <Descriptions.Item label="审核人">{item?.auditUser?.name ?? '暂无'}</Descriptions.Item>
            <Descriptions.Item label="审核状态">
              {item?.auditStatus ? showOption(AUDITSTATUS_TYPE, item?.auditStatus) : '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="审核时间">
              {item?.auditTime ? dayjs(item?.auditTime).format('YYYY年MM月DD日 HH:mm:ss') : '暂无'}
            </Descriptions.Item>
          </Descriptions>
        );
      })}
    </div>
  );
};
