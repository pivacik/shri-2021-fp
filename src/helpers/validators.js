/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.

import {
  allPass,
  toString,
  anyPass,
  compose,
  equals,
  not,
  length,
  filter,
  values,
  includes,
  gte,
  prop,
  __,
  converge,
  countBy,
} from "ramda";

/**
 * Гетеры
 */
const getTriangle = prop("triangle");
const getCircle = prop("circle");
const getStar = prop("star");
const getSquare = prop("square");

const isGreen = equals("green");
const isRed = equals("red");
const isBlue = equals("blue");
const isOrange = equals("orange");
const isWhite = equals("white");
const isNotWhite = compose(not, isWhite);
const gteTwo = gte(__, 2);
const isEqualTwo = equals(2);
const isEqualTo4 = equals(4);
const isEqualTo1 = equals(1);

const has3 = includes(3);
const has4 = includes(4);
const countUniqueColors = countBy(toString);
const getNotWhiteColors = compose(filter(isNotWhite), values);
const getUniqueColorsCount = compose(values, countUniqueColors);

const atLeastTwoGreen = compose(gteTwo, length, filter(isGreen), values);

const countGreenFigures = compose(length, filter(isGreen), values);
const countOrangeFigures = compose(length, filter(isOrange), values);
const countBlueFigures = compose(length, filter(isBlue), values);
const countRedFigures = compose(length, filter(isRed), values);

const starIsNotWhiteOrRed = allPass([
  compose(isNotWhite, getStar),
  compose(not, isRed, getStar),
]);

const allFiguresAreGreen = compose(isEqualTo4, countGreenFigures);
const allFiguresAreOrange = compose(isEqualTo4, countOrangeFigures);
const isTriangleGreen = compose(isGreen, getTriangle);
const hasOneRedFigure = compose(isEqualTo1, countRedFigures);

const isConditionN1 = allPass([
  compose(isWhite, getTriangle),
  compose(isWhite, getCircle),
  compose(isRed, getStar),
  compose(isGreen, getSquare),
]);

const amountRedEqualsBlue = converge(equals, [
  countRedFigures,
  countBlueFigures,
]);
const isConditionN4 = allPass([
  compose(isBlue, getCircle),
  compose(isRed, getStar),
  compose(isOrange, getSquare),
]);

const isConditionN5 = anyPass([
  compose(has4, getUniqueColorsCount, getNotWhiteColors),
  compose(has3, getUniqueColorsCount, getNotWhiteColors),
]);

const isConditionN10 = allPass([
  converge(equals, [getTriangle, getSquare]),
  compose(isNotWhite, getTriangle),
  compose(isNotWhite, getSquare),
]);

const hasTwoGreenAnyRed = allPass([
  isTriangleGreen,
  hasOneRedFigure,
  compose(isEqualTwo, countGreenFigures),
]);

// 1. Красная звезда, зеленый квадрат, все остальные белые
export const validateFieldN1 = (figures) => isConditionN1(figures);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => atLeastTwoGreen(figures);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => amountRedEqualsBlue(figures);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (figures) => isConditionN4(figures);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => isConditionN5(figures);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => hasTwoGreenAnyRed(figures);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => allFiguresAreOrange(figures);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (figures) => starIsNotWhiteOrRed(figures);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => allFiguresAreGreen(figures);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (figures) => isConditionN10(figures);
