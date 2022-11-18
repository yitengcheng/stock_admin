import lodash from 'lodash';
import apis from '../apis';
import { post } from '../axios';

// 随机生成key
export const randomKey = () => {
  const key = lodash.random(1, 999999);
  return key;
};

// 判断字符串是否为json字符串
export const isJsonString = (str: string): boolean => {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (error) {}
  return false;
};

// 表单尺寸
export const formCol = (): any => {
  const span = 2;
  const wrapperSpan = 4;
  return {
    labelCol: {
      xs: { span: span },
      sm: { span: span * 2 },
      md: { span: span * 3 },
      lg: { span: span * 4 },
      xl: { span: span * 5 },
      xxl: { span: span * 6 },
    },
    wrapperCol: {
      xs: { span: wrapperSpan },
      sm: { span: wrapperSpan * 2 },
      md: { span: wrapperSpan * 3 },
      lg: { span: wrapperSpan * 4 },
      xl: { span: wrapperSpan * 5 },
      xxl: { span: wrapperSpan * 6 },
    },
  };
};

// 表格展示option字段
export const showOption = (option: [], value: number, place?: string): string => {
  const obj = lodash.find(option, (itme) => itme.value === value);
  let placeString = place ?? '暂无';
  return obj?.label ?? placeString;
};

// 回显图片
export const echoImage = (images: []): [] => {
  let result = [];
  images?.map((image) => {
    result.push({
      uid: randomKey(),
      name: image?.substring(image?.lastIndexOf('/') + 1), // custom error message to show
      url: image,
      response: { code: 200, data: image, msg: '' },
    });
  });
  return result;
};

// 判断文件是否为图片
export const isImageType = (file: string): boolean => {
  let str = file?.substring(file?.lastIndexOf('.') + 1);
  return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(str.toLowerCase()) !== -1;
};

// 计算租金
export const rentCalculation = async (infos: []): string => {
  let amount = 0;
  for (const info of infos) {
    if (info?.boxClassify && info?.rentalUnits && info?.rentalNumber && info?.boxNumber) {
      const res = await post(apis.boxClassifyById, { boxClassifyId: info?.boxClassify });
      const { rent } = res ?? {};
      const result = lodash.find(rent, (item) => item.type == info?.rentalUnits);
      amount += result?.rental * info?.boxNumber * info?.rentalNumber;
    }
  }
  return amount;
};

// 随机生成颜色(不包含透明度)
export const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};
