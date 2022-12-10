import { Button, Form, message, Space, Steps, Typography } from 'antd';
import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import apis from '../../apis';
import { post } from '../../axios';
import FormSelect from '../../component/form/FormSelect';
import { randomKey } from '../../utils';
import { initEmployeeOption } from '../../utils/initOption';
import styles from './index.module.less';

export default () => {
  const [current, setCurrent] = useStateRef(0);
  const [stepsList, setStepsList] = useStateRef([{ title: '审核人1', key: randomKey() }]);
  const [employeeOption, setEmployeeOption] = useStateRef([]);
  const [auditForm] = Form.useForm();
  const [auditUserList, setAuditUserList] = useStateRef([]);

  useEffect(async () => {
    setEmployeeOption(await initEmployeeOption());
    initData();
  }, []);

  const addAuditUser = () => {
    let result = auditForm.getFieldValue(`aduit${current}`);
    if (!result) {
      message.error('请先设置当前审核人');
      return;
    }
    let list = stepsList;
    list.push({ title: `审核人${stepsList.length + 1}`, key: randomKey() });
    auditUserList.push(result);
    setStepsList(list);
    setCurrent(current + 1);
  };
  const reduceAuditUser = () => {
    if (current !== 0) {
      let list = stepsList;
      list.pop();
      auditUserList.pop();
      setStepsList(list);
      setCurrent(current - 1);
    }
  };
  const saveAuditSetup = () => {
    auditForm.validateFields().then((values) => {
      auditUserList.push(values?.[`aduit${current}`]);
      post(apis.handleAuditUser, { auditUserList });
    });
  };
  const initData = () => {
    post(apis.lookAuditUser).then((res) => {
      const { auditUserList } = res;
      let result = [];
      auditUserList.map((auditUser, index) => {
        result.push({ title: `审核人${index + 1}`, key: randomKey() });
        auditForm.setFieldValue(`aduit${index}`, auditUser);
      });
      setStepsList(result);
      setCurrent(auditUserList?.length - 1);
    });
  };

  return (
    <div className={['baseContainer', 'baseBorder'].join(' ')}>
      <Typography.Title level={4} className={styles.titleContainer}>
        <div className="decoration" />
        审核设置
      </Typography.Title>
      <div className={styles.container}>
        <Steps current={current} items={stepsList} />
        <div className={styles.stepsContainer}>
          <Form form={auditForm}>
            <FormSelect name={`aduit${current}`} label={stepsList[current].title} options={employeeOption} />
          </Form>
        </div>
        <Space size="large">
          <Button
            type="primary"
            onClick={() => {
              addAuditUser();
            }}
          >
            添加审核人
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              reduceAuditUser();
            }}
          >
            减少审核人
          </Button>
          <Button
            type="primary"
            onClick={() => {
              saveAuditSetup();
            }}
          >
            保存设置
          </Button>
        </Space>
      </div>
    </div>
  );
};
