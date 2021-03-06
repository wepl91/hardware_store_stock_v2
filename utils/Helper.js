import { deburr } from 'lodash'

const createKeyWord = (name) => {
  const arrName = [];
  let curName = '';
  name.split('').forEach((letter) => {
    curName += deburr(letter);
    arrName.push(curName);
  });
  return arrName;
};

export const generateKeyword = (names) => {
  const [name, lastName] = names;
  const keyWordsLeft = createKeyWord(`${name?.toLowerCase()} ${lastName?.toLowerCase()}`);
  const keyWordsRight = createKeyWord(`${lastName?.toLowerCase()} ${name?.toLowerCase()}`);

  return Array.from(new Set([
    '',
    ...keyWordsLeft,
    ...keyWordsRight,
  ]));
};

export const hashCode = function( str ) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};