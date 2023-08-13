export function hasFlag<T extends unknown>(oldValue: T, hasFlagValue: number) {
  //@ts-ignore
  if (oldValue & hasFlagValue) {
    return true;
  }
  return false;
}

export function setFlag(oldValue: number, newValue: number) {
  let newFlag = oldValue;
  if (hasFlag(oldValue, newValue)) {
    newFlag &= ~newValue;
  } else {
    newFlag |= newValue;
  }
  return newFlag;
}

export function toBitMask(value: number, length: number = 3): string {
  return Number(value).toString(2).padStart(length, '0');
}

export function toFlipMask<T extends unknown>(value: number, enumA: T): string {
  //@ts-ignore
  return Object.keys(enumA)
    .filter(Number)
    .map(Number)
    .reduce((mask: string, element: number) => {
      if (hasFlag(value, element)) {
        return `${mask}1`;
      }
      return `${mask}0`;
    }, '');
}
