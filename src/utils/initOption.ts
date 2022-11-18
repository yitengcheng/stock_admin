import apis from '../apis';
import { post } from '../axios';

// 生成员工Option
export const initStaffs = async (): any => {
  let staffOption = [];
  const res = await post(apis.staffs);
  res.map((item) => {
    staffOption.push({ label: `${item?.department?.name}-${item?.name}`, value: item?._id });
  });
  return staffOption;
};

// 生成部门Option
export const initDeparts = async (): any => {
  let departs = [];
  const res = await post(apis.departs);
  res.map((item) => {
    departs.push({ label: item?.name, value: item?._id });
  });
  return departs;
};

// 生成物流箱分类Option
export const initBoxClassifys = async (): any => {
  let boxClassifys = [];
  const res = await post(apis.boxClassifys);
  res.map((item) => {
    boxClassifys.push({ label: item?.name, value: item?._id });
  });
  return boxClassifys;
};

// 生成客户Option
export const initCustomers = async (): any => {
  let customers = [];
  const res = await post(apis.customers);
  res.map((item) => {
    customers.push({ label: item?.name, value: item?._id });
  });
  return customers;
};

// 生成客户Option含未分配箱子数
export const initCustomersByBox = async (): any => {
  let customers = [];
  const res = await post(apis.customersByBox);
  res.map((item) => {
    customers.push({ label: `${item?.name}有${item?.count}个箱子未分配`, value: item?._id });
  });
  return customers;
};

// 生成订单Option
export const initLeaseOrder = async (): any => {
  let leaseOrders = [];
  const res = await post(apis.leaseOrders);
  res.map((item) => {
    leaseOrders.push({ label: item?.leaseOrderNumber, value: item?._id });
  });
  return leaseOrders;
};

// 生成合同Option
export const initContract = async (): any => {
  let contracts = [];
  const res = await post(apis.contracts);
  res.map((item) => {
    contracts.push({ label: item?.contractNumber, value: item?._id });
  });
  return contracts;
};

// 根据客户查询箱子Option
export const initBoxOptionByCustomer = async (customerId: string): any => {
  let boxs = [];
  const res = await post(apis.boxsByCustomer, { customerId });
  res.map((item) => {
    boxs.push({ label: item?.boxCode, value: item?._id });
  });
  return boxs;
};
