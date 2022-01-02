// src/usePresenter.ts
import findIndex from 'lodash/findIndex';
import isUndefined from 'lodash/isUndefined';
import { itemHeight } from './constant';

interface IProps {
  initialValue: any | undefined;
  items: any[];
  valueAttribute: string;
  labelAttribute: string;
  numberOfVisibleRows: number;
}

export default function usePresenter({
  initialValue,
  items: propItems,
  valueAttribute,
  labelAttribute,
  numberOfVisibleRows,
}: IProps) {
  // const value = isUndefined(selectedValue) ? initialValue : selectedValue;

  const items = propItems.map((item: any) => {
    return {
      value: item[valueAttribute],
      label: item[labelAttribute],
    };
  });

  const getRowItemByIndex = (index: number) => {
    return items[index];
  };

  return {
    items,
    defaultIndex: isUndefined(initialValue)
      ? 0
      : findIndex(items, { value: initialValue }),
    getRowItemByIndex,
    height: numberOfVisibleRows * itemHeight,
  };
}
