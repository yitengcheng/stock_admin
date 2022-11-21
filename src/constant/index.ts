export const DEFAULT_APPNAME = '库存管理系统';
export const GENDER_OPTION = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
  { label: '未知', value: 3 },
];
export const EMPLOYEE_TYPE = [
  { label: '管理者', value: 1 },
  { label: '普通员工', value: 2 },
];

const dev_url = 'http://localhost:3000';
const build_url = '';

export const API_URL = process.env.NODE_ENV == 'development' ? dev_url : build_url;
