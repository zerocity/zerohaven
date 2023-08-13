import { useCallback, useState } from 'react';

export type Flag = number; // { bitmask: string, value: number }
export type SetFlag<T> = (setFlag: T) => void;
export type HasFlag<T> = (hasFlag: T) => boolean;

export type UseBitmaskReturn<T extends number> = {
  flag: Flag; //
  setFlag: SetFlag<T>; //
  hasFlag: HasFlag<T>; //
};

//
// enum typeing problem
// https://github.com/microsoft/TypeScript/issues/30611
//

const getValueFromEnum = (
  key: number | string,
  e: Record<string | number, number>
) => {
  let possibleString = e[key];
  let value;
  if (typeof possibleString === 'string') {
    value = e[possibleString];
  } else {
    value = key;
  }
  if (typeof value !== 'number') {
    console.error(value);
  }
  return value;
};

export function useBitmask<T extends number>(
  enumA: T | unknown,
  defaultValue: number = 0
): UseBitmaskReturn<T> {
  //@ts-ignore
  const [value, set] = useState<number>(getValueFromEnum(defaultValue, enumA));
  const hasFlag = useCallback(
    (p: T) => {
      if (value & p) {
        return true;
      }
      return false;
    },
    [value]
  );

  const setFlag = useCallback(
    (newValue: T) => {
      console.log(newValue);

      //@ts-ignore
      let newFlag = value; // isString(value) ? enumA[value] : value;
      if (hasFlag(newValue)) {
        newFlag &= ~newValue;
      } else {
        newFlag |= newValue;
      }

      set(newFlag);
    },
    [hasFlag, value]
  );
  return {
    flag: value,
    setFlag,
    hasFlag,
  };
}
