import { Button, Card, Col, Descriptions, Divider, PageHeader, Row, Space, Statistic, Calendar } from "antd";
import React, { useState } from "react";
import styles from "./index.module.less";
import * as echarts from "echarts";
import IconFont from "../../component/IconFont";
import { randomColor } from "../../utils";
import apis from "../../apis";
import lodash from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import MenuGird from "./MenuGird";

export default () => {
  const selectDay = (date) => {
    console.log(date.format("YYYY-MM-DD"));
  };

  return (
    <div className={["baseContainer", "baseHeight"].join(" ")} style={{ flexDirection: "row" }}>
      <div className={styles.leftContainer}>
        <div className={styles.leftTopBox}>
          <div className={styles.leftTopLeftBox}>
            <div className={styles.boxTitle} style={{ borderBottom: "1px solid #f3f3f3" }}>
              <div className="decoration"></div>
              <div className={styles.boxTitleText}>常用功能</div>
            </div>
            <MenuGird />
          </div>
          <div className={styles.leftTopRightBox}>
            <div className={styles.leftTopRightTopBox}>
              <div className={styles.statisticalBox} style={{ marginRight: "0.5vw" }}>
                <div className={styles.statisticalTitle}>
                  <div className="decoration"></div>
                  <div>查询库存</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle} style={{ color: "#FB3C3C" }}>
                      3532
                    </span>
                    <span>件</span>
                  </div>
                  <img src="/src/assets/images/queryStock.png" className={styles.statisticalImage} />
                </div>
              </div>
              <div className={styles.statisticalBox} style={{ marginRight: "0.5vw" }}>
                <div className={styles.statisticalTitle}>
                  <div className="decoration"></div>
                  <div>出库单</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle} style={{ color: "#FFC300" }}>
                      3384
                    </span>
                    <span>件</span>
                  </div>
                  <img src="/src/assets/images/workOrder.png" className={styles.statisticalImage} />
                </div>
              </div>
              <div className={styles.statisticalBox}>
                <div className={styles.statisticalTitle}>
                  <div className="decoration"></div>
                  <div>入库单</div>
                </div>
                <div className={styles.statisticalMain}>
                  <div className={styles.statisticalText}>
                    <span className={styles.statisticalTextTitle} style={{ color: "#186CFF" }}>
                      623
                    </span>
                    <span>件</span>
                  </div>
                  <img src="/src/assets/images/putInStorageImage.png" className={styles.statisticalImage} />
                </div>
              </div>
            </div>
            <div className={styles.leftTopRightBottomBox}>
              <div className={styles.businessHandlingTitle}>
                <div className="decoration"></div>
                <div>查询库存</div>
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
        </div>
        <div className={styles.leftBottomBox}>
          <div className={styles.warningTitle}>
            <div className="decoration"></div>
            <div>库存预警趋势</div>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.boxTitle}>
          <div className="decoration"></div>
          <div className={styles.boxTitleText}>日历</div>
        </div>
        <div>
          <Calendar fullscreen={false} onSelect={selectDay} />
        </div>
        <div className={styles.scheduleTitle}>
          <div className={styles.scheduleTitleText}>今日事项</div>
          <Button size="small" type="primary" shape="circle" icon={<PlusOutlined style={{ color: "#fff" }} />}></Button>
        </div>
        <div className={styles.scheduleList}>
          <div>事项列表</div>
        </div>
      </div>
    </div>
  );
};
