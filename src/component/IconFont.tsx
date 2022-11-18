import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { API_URL } from '../constant';

export default ({ type, onClick, size = 24 }: any) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: `${API_URL}/js/iconfont.js`,
  });
  return onClick ? (
    <div
      onClick={() => {
        onClick && onClick();
      }}
    >
      <IconFont style={{ fontSize: size }} type={type} />
    </div>
  ) : (
    <IconFont style={{ fontSize: size }} type={type} />
  );
};
