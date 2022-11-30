import apis from '../apis';
import { post } from '../axios';

// 生成部门Option
export const initDepartment = async (): any => {
  const res = await post(apis.departments);
  let option = [];
  res.map((o) => {
    option.push({ label: o.departmentName, value: o._id });
  });

  return option;
};

// 生成计量单位Option
export const initUnitOption = async () => {
  const res = await post(apis.options, { type: 3 });
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};

// 生成入库类型Option
export const initStorageTypeOption = async () => {
  const res = await post(apis.options, { type: 1 });
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};

// 生成出库类型Option
export const initOutboundTypeOption = async () => {
  const res = await post(apis.options, { type: 2 });
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};

// 生成物品分类Option
export const initClassificationOption = async () => {
  const res = await post(apis.options, { type: 4 });
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};

// 生成供应商Option
export const initSupplierOption = async () => {
  const res = await post(apis.suppliers);
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};

// 生成物品Option
export const initGoodOption = async (supplierId) => {
  const res = await post(apis.goods, { supplierId });
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};

// 生成员工Option
export const initEmployeeOption = async () => {
  const res = await post(apis.employees);
  let option = [];
  res.map((o) => {
    option.push({ label: o.name, value: o._id });
  });
  return option;
};
