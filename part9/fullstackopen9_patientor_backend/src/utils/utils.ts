export const isString = (text: unknown): text is string  => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date:string):boolean => {
  return Boolean(Date.parse(date));
};

export const isNumber = (number: unknown): number is number => {
  return typeof number === 'number';
};

export const parseString = (str: unknown, field: string):string => {
  if(!str || !isString(str)){
    throw new Error(`Incorrect or missing ${field}`);
  }
  return str;
};

export const parseDate = (date: unknown,  field: string): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error(`Incorrect or missing ${field}`);
  }
  return date;
};

export const parseStrignArrayOrUndef = (arr: unknown, field: string): string[] | undefined => {
  if(!arr)
    return undefined;
  if(!(arr instanceof Array) || !arr.every(el => isString(el))){
    throw new Error(`Incorrerct or missing ${field}`);
  }
  return arr as string[];
};