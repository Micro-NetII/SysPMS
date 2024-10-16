import dayjs from 'dayjs';
import {
    generateDate,
    months,
    daysOfWeek,
  } from "@/app/util/tipologyPlan/week/weekcalendar";
  import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
  import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
  import isBetween from "dayjs/plugin/isBetween";
  // Configurando plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const goToPreviousWeek = (callback) => {
  const currentToday = dayjs();
  const newToday = currentToday.subtract(1, "week");
  const newWeeks = generateDate(newToday.month(), newToday.year());
  const newIndex = newWeeks.length - 1;

  callback(newToday, newWeeks, newIndex);
};

export const goToNextWeek = (callback) => {
  const currentToday = dayjs();
  const newToday = currentToday.add(1, "week");
  const newWeeks = generateDate(newToday.month(), newToday.year());
  const newIndex = 0;

  callback(newToday, newWeeks, newIndex);
};

export const goToCurrentWeek = (callback) => {
  const currentToday = dayjs();
  const newWeeks = generateDate(currentToday.month(), currentToday.year());

  // Calcula o índice da semana que contém o dia atual
  const startOfMonth = currentToday.startOf("month");
  const daysSinceStartOfMonth = currentToday.diff(startOfMonth, "day");
  const currentWeekIndex = Math.floor(daysSinceStartOfMonth / 7);

  // Encontre a semana que contém o dia de hoje
  const weekIndex = newWeeks.findIndex((week) =>
    week.some((day) => day.date.isSame(currentToday, "day"))
  );

  callback(currentToday, newWeeks, weekIndex);
};