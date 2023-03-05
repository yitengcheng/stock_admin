import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import { routers } from './routers';
import { RecoilRoot } from 'recoil';
import '@/assets/css/reset.css';
import { theme } from './assets/theme/theme';
import 'babel-polyfill';

dayjs.locale('zh-cn');

const validateMessages = {
  required: '${label} 是必选字段',
};

ReactDOM.render(
  <RecoilRoot>
    <ConfigProvider locale={locale} form={{ validateMessages }} theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            {routers.map((item, index) => (
              <Route key={item.key} index={index === 0} path={index !== 0 && item.path} element={<item.element />} />
            ))}
          </Route>
        </Routes>
      </HashRouter>
    </ConfigProvider>
  </RecoilRoot>,
  document.getElementById('root'),
);
