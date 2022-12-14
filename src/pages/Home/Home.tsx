import { Button, Calendar, Form, Modal, Statistic, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.module.less';
import { PlusOutlined } from '@ant-design/icons';
import MenuGird from './MenuGird';
import useStateRef from 'react-usestateref';
import { post } from '../../axios';
import apis from '../../apis';
import { useNavigate } from 'react-router-dom';
import * as echarts from 'echarts';
import lodash from 'lodash';
import FormTextArea from '../../component/form/FormTextArea';
import FormDatePicker from '../../component/form/FormDatePicker';
import dayjs from 'dayjs';
import { getStorage } from '../../localStorage';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import queryStock from '../../assets/images/queryStock.png';
import workOrder from '../../assets/images/workOrder.png';
import putInStorageImage from '../../assets/images/putInStorageImage.png';

const { Title } = Typography;

export default () => {
  const navigator = useNavigate();
  const [numberTotal, setNumberTotal] = useStateRef({});
  const [tableData, setTableData] = useStateRef([]);
  const [matterForm] = Form.useForm();
  const [currentDate, setCurrentDate] = useStateRef(dayjs());
  const [matterList, setMatterList] = useStateRef([]);
  const userInfo = getStorage('userInfo');

  const stateAnimation = {
    duration: 300,
    easing: 'cubicOut',
  };

  useEffect(async () => {
    setNumberTotal(await post(apis.stockStatisticalNumber));
    initWarringGoodsEcharts();
    initTableData();
    matterForm.setFieldValue('recordTime', dayjs());
    userInfo?.type === 2 && navigator('applyForGoods', { replace: true });
  }, []);

  useEffect(() => {
    initMattersList();
  }, [currentDate]);

  const selectDay = (date) => {
    setCurrentDate(date);
    matterForm.setFieldValue('recordTime', date);
  };
  const initWarringGoodsEcharts = () => {
    post(apis.stockWarringStatistical).then((res) => {
      const myChart = echarts.init(document.getElementById('warringGoods'));
      const xAxisData = lodash.map(res, 'name');
      let data = [];
      const borderRadius = [8, 8, 0, 0];
      res.map((item) => {
        if (item?.inventoryMax && item?.inventoryNumber > item?.inventoryMax) {
          data.push({
            value: item?.inventoryNumber,
            itemStyle: {
              color: '#00ae1c',
              borderRadius,
            },
          });
        } else if (item?.inventoryMin && item?.inventoryNumber < item?.inventoryMin) {
          data.push({
            value: item?.inventoryNumber,
            itemStyle: {
              color: '#ff9502',
              borderRadius,
            },
          });
        } else {
          data.push({
            value: item?.inventoryNumber,
            itemStyle: {
              color: '#3662ec',
              borderRadius,
            },
          });
        }
      });
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        label: {
          show: true,
          position: 'top',
        },
        series: [
          {
            data,
            type: 'bar',
            barWidth: '10%',
          },
        ],
        stateAnimation,
      });
    });
  };
  const initTableData = () => {
    post(apis.goods).then((res) => {
      let result = [];
      res?.map((item) => {
        result.push({ key: item._id ?? randomKey(), ...item });
      });
      setTableData(result);
    });
  };
  const modalMatters = () => {
    Modal.confirm({
      title: '????????????',
      content: (
        <Form form={matterForm}>
          <FormDatePicker name="recordTime" label="??????" required={false} />
          <FormTextArea label="??????" name="content" required={false} />
        </Form>
      ),
      onOk: () => {
        matterForm.validateFields().then((res) => {
          post(apis.addMatters, res).then(() => {
            matterForm.setFieldValue('content', '');
            initMattersList();
          });
        });
      },
    });
  };
  const initMattersList = () => {
    post(apis.mattersList, { recordTime: currentDate }).then((res) => {
      setMatterList(res);
    });
  };

  return (
    <div className={['baseContainer', 'baseHeight'].join(' ')} style={{ flexDirection: 'row' }}>
      <div className={styles.leftContainer}>
        <div className={styles.leftTopBox}>
          <div className={styles.leftTopLeftBox}>
            <div className={styles.boxTitle} style={{ borderBottom: '1px solid #f3f3f3' }}>
              <div className="decoration" />
              <div className={styles.boxTitleText}>????????????</div>
            </div>
            <MenuGird />
          </div>
          <div className={styles.leftTopRightBox}>
            <div className={styles.leftTopRightTopBox}>
              <div
                className={styles.statisticalBox}
                style={{ marginRight: '0.5vw' }}
                onClick={() => {
                  navigator('inventory');
                }}
              >
                <div className={styles.statisticalTitle}>
                  <div className="decoration" />
                  <div>????????????</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle}>
                      <Statistic
                        title=""
                        value={numberTotal?.goodTotal}
                        valueStyle={{ color: '#FB3C3C', fontSize: '200%' }}
                      />
                    </span>
                    <span>???</span>
                  </div>
                  <img src={queryStock} className={styles.statisticalImage} />
                </div>
              </div>
              <div
                className={styles.statisticalBox}
                style={{ marginRight: '0.5vw' }}
                onClick={() => {
                  navigator('outboundOrder');
                }}
              >
                <div className={styles.statisticalTitle}>
                  <div className="decoration" />
                  <div>?????????</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle}>
                      <Statistic
                        title=""
                        value={numberTotal?.outboundOrderTotal}
                        valueStyle={{ color: '#FFC300', fontSize: '200%' }}
                      />
                    </span>
                    <span>???</span>
                  </div>
                  <img src={workOrder} className={styles.statisticalImage} />
                </div>
              </div>
              <div
                className={styles.statisticalBox}
                onClick={() => {
                  navigator('godownEntry');
                }}
              >
                <div className={styles.statisticalTitle}>
                  <div className="decoration" />
                  <div>?????????</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle}>
                      <Statistic
                        title=""
                        value={numberTotal?.godownEntryTotal}
                        valueStyle={{ color: '#186CFF', fontSize: '200%' }}
                      />
                    </span>
                    <span>???</span>
                  </div>
                  <img src={putInStorageImage} className={styles.statisticalImage} />
                </div>
              </div>
            </div>
            <div className={styles.leftTopRightBottomBox}>
              <div className={styles.businessHandlingTitle}>
                <div className="decoration" />
                <div>????????????</div>
              </div>
              <div>
                <Table
                  dataSource={tableData}
                  size="small"
                  bordered
                  pagination={false}
                  scroll={{
                    y: '10vh',
                  }}
                  columns={[
                    { title: '????????????', dataIndex: 'name', align: 'center' },
                    {
                      title: '????????????',
                      dataIndex: 'classification',
                      align: 'center',
                      render: (obj) => <span>{obj?.name || '??????'}</span>,
                    },
                    { title: '????????????', dataIndex: 'models', align: 'center' },
                    {
                      title: '??????',
                      dataIndex: 'unit',
                      align: 'center',
                      render: (obj) => <span>{obj?.name || '??????'}</span>,
                    },
                    { title: '??????', dataIndex: 'price', align: 'center' },
                    { title: '????????????', dataIndex: 'inventoryNumber', align: 'center' },
                    { title: '????????????', dataIndex: 'inventoryMax', align: 'center' },
                    { title: '????????????', dataIndex: 'inventoryMin', align: 'center' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.leftBottomBox}>
          <div className={styles.warningTitle}>
            <div className="decoration" />
            <div>??????????????????</div>
          </div>
          <div id="warringGoods" style={{ width: '77vw', height: '38vh', margin: '1vh 1vw' }} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.boxTitle}>
          <div className="decoration" />
          <div className={styles.boxTitleText}>??????</div>
        </div>
        <div>
          <Calendar locale={locale} fullscreen={false} onSelect={selectDay} />
        </div>
        <div className={styles.scheduleTitle}>
          <div className={styles.scheduleTitleText}>????????????</div>
          <Button
            size="small"
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ color: '#fff' }} />}
            onClick={() => {
              modalMatters();
            }}
          />
        </div>
        <div className={styles.scheduleList}>
          <div>????????????</div>
          {matterList.map((matter) => (
            <Title
              key={matter?._id}
              style={{ marginTop: '0.5vh' }}
              level={3}
              type={matter?.type === 1 ? 'success' : 'warning'}
            >
              {matter?.content}
            </Title>
          ))}
        </div>
      </div>
    </div>
  );
};
