import { Form, Typography } from 'antd';
import React from 'react';
import styles from './index.module.less';
import FormRadioGroup from '../../component/form/FormRadioGroup';
import FormDatePicker from '../../component/form/FormDatePicker';

export default (props: any) => {
  const [screenForm] = Form.useForm();
  return (
    <div className={['baseContainer', 'baseBorder'].join(' ')}>
      <div className={styles.titleBox}>
        <Typography.Title level={4}>领用分析图</Typography.Title>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.mainTitleContainer}>
          <Form form={screenForm} scrollToFirstError layout="inline" labelWrap>
            <FormRadioGroup
              label="显示方式"
              required={false}
              name="itemType"
              options={[
                { label: '柱状图', value: 1 },
                { label: '曲线图', value: 2 },
              ]}
            />
            <FormDatePicker label="年度" required={false} picker="year" />
          </Form>
        </div>
        <div className={styles.cartogramContainer} />
      </div>
    </div>
  );
};
