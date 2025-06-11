import { Paper } from "@mui/material";
import React from "react";
import styles from './not-found-page.module.css';
import { NOT_FOUND_PAGE_ERROR_DESCRIPTION, NOT_FOUND_PAGE_ERROR_NAME } from "../lib/constants";

const NoFoundPagePaperStyles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  borderRadius: 5,
  padding: 5,
  background: '#002F19',
  flexDirection: 'column',
  gap: 5,
  position: 'relative',
}

export const NotFoundPage = (): React.ReactElement => {
  return (
    <div className={styles['not-found-page']}>
      <div className={styles['not-found-page__paper']}>
        <Paper sx={NoFoundPagePaperStyles}>
          <div className={styles['not-found-page__header-text']}>Страница <br/> не cуществует</div>
          <div className={styles['not-found-page__description-text']}>{NOT_FOUND_PAGE_ERROR_DESCRIPTION}</div>
          <div className={styles['not-found-page__error-name']}>{NOT_FOUND_PAGE_ERROR_NAME}</div>
        </Paper>
      </div>
    </div>
  )
};