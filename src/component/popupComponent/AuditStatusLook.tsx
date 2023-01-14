import { Descriptions, Space, Timeline, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import { randomKey, showOption } from '../../utils';
import { AUDITSTATUS_TYPE } from '../../constant';

export default (props: any) => {
  const { id } = props;
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
      <Descriptions bordered layout="vertical">
        <Descriptions.Item label="审核状态">
          <Timeline made="left">
            {auditStatusUser?.auditStatusList?.map((item) => (
              <Timeline.Item
                key={randomKey()}
                color={
                  item?.auditStatus === 1
                    ? 'blue'
                    : item?.auditStatus === 2
                    ? 'green'
                    : item?.auditStatus === 3
                    ? 'red'
                    : 'blue'
                }
              >
                <Space>
                  <span>
                    <Typography.Text strong>审核人：</Typography.Text>
                    <Typography.Text>{item?.auditUser?.name ?? '暂无'}</Typography.Text>
                  </span>
                  <span>
                    <Typography.Text strong>审核时间：</Typography.Text>
                    <Typography.Text>
                      {item?.auditTime ? dayjs(item?.auditTime).format('YYYY年MM月DD日 HH:mm:ss') : '暂无'}
                    </Typography.Text>
                  </span>
                </Space>
              </Timeline.Item>
            ))}
          </Timeline>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
