import { useState, useEffect } from 'react';
import { getCurrentMonthHolidays } from '../api/fetch-holidays';
import { HolidayData } from '../types';
import { Paper } from '@mui/material';
import styles from './holiday-list.module.css';
import dayjs from 'dayjs';

const HolidayListPaper = {
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    boxShadow: 'none',
    background: 'var(--main-light-color)',
    border: '1px solid #E8F6F0'

}

export const HolidayList = () => {
  const [holidays, setHolidays] = useState<HolidayData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHolidays = await getCurrentMonthHolidays();
      setHolidays(fetchedHolidays);
    };

    fetchData();
  }, []);

  return (
    <Paper sx={HolidayListPaper}>
      <div className={styles['holiday-list__label']}>Праздники в этом месяце:</div>
      {holidays.length > 0 ? (
        <div className={styles['holiday-list__list']}>
          {holidays.map(holiday => (
            <div className={styles['holiday-list__holiday']} key={`${holiday.name}-${holiday.date}`}>
              <div className={styles['holiday-list__holiday-name']}>{holiday.name}</div>
              <div className={styles['holiday-list__holiday-date']}>{dayjs(holiday.date).format('DD.MM.YYYY')}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>В этом месяце нет праздников.</p>
      )}
    </Paper>
  );
};