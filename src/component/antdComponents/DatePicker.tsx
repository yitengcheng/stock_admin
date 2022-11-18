import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
