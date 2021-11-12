/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";
import {
  __,
  andThen,
  allPass,
  assoc,
  concat,
  compose,
  equals,
  gt,
  head,
  ifElse,
  length,
  lt,
  modulo,
  not,
  otherwise,
  prop,
  tap,
  test,
} from "ramda";
import { round, toNumber, toString } from "lodash";

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const lessThan10 = lt(__, 10);
  const greaterThan2 = gt(__, 2);
  const equalsMinus = equals("-");
  const hasLengthLessThan10 = compose(lessThan10, length);
  const hasLengthMoreThan2 = compose(greaterThan2, length);
  const isNotNegative = compose(not, equalsMinus, head);
  const matchesNumberPattern = test(/^[0-9]+(\.[0-9]+)?$/);
  const handleValidationError = () => handleError("ValidationError");
  const handlePromiseError = (e) => handleError(e);
  const changeBaseApi = api.get("https://api.tech/numbers/base");
  const getRandomAnimalApi = api.get(__, {});
  const createUrl = concat("https://animals.tech/");
  const getResult = prop("result");
  const square = (number) => number * number;
  const mod3 = modulo(__, 3);

  const setParams = assoc("number", __, { from: "10", to: "2" });

  const isValidNumber = allPass([
    hasLengthMoreThan2,
    hasLengthLessThan10,
    isNotNegative,
    matchesNumberPattern,
  ]);

  const logAnimal = compose(handleSuccess, getResult);

  const generateAnimal = compose(
    andThen(logAnimal),
    getRandomAnimalApi,
    createUrl
  );

  const computeBinary = compose(
    generateAnimal,
    toString,
    tap(writeLog),
    mod3,
    tap(writeLog),
    square,
    tap(writeLog),
    length,
    tap(writeLog),
    getResult
  );
  const computeNumber = compose(
    andThen(computeBinary),
    changeBaseApi,
    setParams,
    toString,
    tap(writeLog),
    round,
    toNumber
  );

  const validateNumber = ifElse(
    isValidNumber,
    computeNumber,
    handleValidationError
  );

  const app = compose(
    otherwise(handlePromiseError),
    validateNumber,
    tap(writeLog)
  );

  app(value);
};

export default processSequence;
