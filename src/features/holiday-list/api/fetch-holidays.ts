import axios from 'axios';
import dayjs from 'dayjs';
import { HolidayItem } from '../dto';
import { HolidayData } from '../types';

export const getCurrentMonthHolidays = async (): Promise<HolidayData[]> => {
  try {
    const now = dayjs();
    const currentYear = now.year();
    const currentMonth = 3;

    const response = await axios.get<HolidayItem[]>(
      `https://date.nager.at/api/v3/publicholidays/${currentYear}/RU`
    );

    const currentMonthHolidays = response.data.filter((item: HolidayItem) => {
      const holidayDate = dayjs(item.date);
      return holidayDate.month() + 1 === currentMonth;
    });
    
    const holidays = currentMonthHolidays.map((item: HolidayItem) => ({
      name: item.localName,
      date: item.date
    }));

    return holidays;
  } catch (err) {
    console.error('Ошибка при загрузке праздников:', err);
    return [];
  }
};