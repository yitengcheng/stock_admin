import { Button, Space } from 'antd';
import React from 'react';
import { randomKey } from '../../utils';
import styles from './index.module.less';

export default (props: any) => {
  const { label, buttonList, children } = props;
  return (
    <div className={styles.screenContainer}>
      <div className={styles.screenTitleBox}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className="decoration" />
          <div className={styles.screenTitleText}>{label}</div>
        </div>
        <Space>
          {buttonList?.map((button) => {
            const {
              type = 'primary',
              disabled = false,
              danger = false,
              ghost = false,
              icon,
              shape = 'default',
              size = 'middle',
              onClick,
              name,
            } = button;
            return (
              <Button
                type={type}
                disabled={disabled}
                danger={danger}
                ghost={ghost}
                icon={icon}
                shape={shape}
                size={size}
                onClick={() => onClick()}
                key={randomKey()}
              >
                {name}
              </Button>
            );
          })}
        </Space>
      </div>
      <div className={styles.screenForm}>{children}</div>
    </div>
  );
};
