import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
} from "@chakra-ui/react";

import { upperFirst } from 'lodash'

import DayPicker from 'react-day-picker';
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from 'react-day-picker/moment';

import moment from 'moment';
import 'moment/locale/es-us';

import styles from './DatePicker.module.scss';

const DatePicker = ({
  selectedDate = moment(),
  onDateSelected = () => { },
  disabledDays = [0, 6], //Array of day numbers of week,
  disableDaysBeforeToday = true,
  disableToday = false,
}) => {
  const modifiers = {
    all: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
  };
  const modifiersStyles = {
    selected: {
      backgroundColor: '#84ADAF',
    },
    all: {
      height: '1.5em',
      width: '1.5em',
      borderRadius: '30%',
    }
  };

  const getDisabledDays = () => {
    let disabledProp = disabledDays; 
    if (disableToday) {
      disabledProp = [...disabledProp, ...[moment().day()]];
    }
    const disabled = {
      daysOfWeek: disabledProp,
    };
    if (disableDaysBeforeToday) {
      disabled.before = new Date();
    }
    return disabled;
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Input
          key={selectedDate}
          focusBorderColor="teal.400"
          placeholder={upperFirst(moment(selectedDate).locale('es-us').format('dddd DD [de] MMMM [del] yyyy'))}
        />
      </PopoverTrigger>
      <PopoverContent m="1em">
        <DayPicker
          showWeekNumber
          localeUtils={MomentLocaleUtils}
          locale="es-us"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          disabledDays={getDisabledDays()}
          selectedDays={moment(selectedDate).toDate()}
          onDayClick={(newDate) => onDateSelected(newDate)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;