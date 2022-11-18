import dayjs, { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
