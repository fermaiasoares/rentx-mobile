import React from 'react';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { 
  Calendar as CustomCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { generateInterval } from './generateInterval';
import { ptBR } from './localeConfig';
import { useTheme } from 'styled-components';

LocaleConfig.locales['pt-BR'] = ptBR;
LocaleConfig.defaultLocale = 'pt-BR';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (day: DateData) => void;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      onDayPress={onDayPress}
      renderArrow={(direction) => 
        <Feather 
          size={24}
          color={theme.colors.text.default}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background.secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text.detail,
      }}

      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 10,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}

      firstDay={1}

      minDate={new Date().toDateString()}
      markingType='period'
      markedDates={markedDates}
    />
  );
}

export { Calendar, MarkedDateProps, DateData, generateInterval, getPlatformDate, format };