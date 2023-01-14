import React from 'react';
import useStateRef from 'react-usestateref';

export default (props: any) => {
  return (
    <iframe
      className={['baseContainer', 'baseHeight'].join(' ')}
      src="https://stock.qiantur.com/explain/库存管理系统用户手册.pdf"
    />
  );
};
