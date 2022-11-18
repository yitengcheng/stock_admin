import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import { routers } from './routers';
import { RecoilRoot } from 'recoil';
import '@/assets/css/reset.css';

const validateMessages = {
  required: '${label} 是必选字段',
};

ReactDOM.render(
  <RecoilRoot>
    <ConfigProvider locale={zhCN} form={{ validateMessages }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}>
            {routers.map((item, index) => (
              <Route key={item.key} index={index === 0} path={index !== 0 && item.path} element={<item.element />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
