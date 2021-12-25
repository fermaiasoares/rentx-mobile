import { eachDayOfInterval, format } from 'date-fns';

import theme from '../../styles/theme';
import { MarkedDateProps, DateData } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate';

export function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDateProps = {}

  eachDayOfInterval({ 
    start: new Date(start.timestamp), 
    end: new Date(end.timestamp) }
  ).forEach((item) => {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');

    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date 
          ? theme.colors.main.default : theme.colors.main.ligth,

        textColor: start.dateString === date || end.dateString === date 
        ? theme.colors.main.ligth : theme.colors.main.default
      }
    };
  });

  return interval;
}