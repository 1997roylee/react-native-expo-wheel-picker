// src/usePresenter.ts
import { useCallback, useState } from 'react';
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
  const items = propItems.map((item: any) => {
    return {
      value: item[valueAttribute],
      label: item[labelAttribute],
    };
  });

  const defaultIndex = isUndefined(initialValue)
    ? 0
    : findIndex(items, { value: initialValue });

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const onValueChange = useCallback(
    (event) =>
      setCurrentIndex(
        Math.floor(event.nativeEvent.contentOffset.y / itemHeight)
      ),
    []
  );

  const getRowItemByIndex = (index: number) => {
    return items[index];
  };

  return {
    items,
    onValueChange,
    currentIndex,
    defaultIndex,
    getRowItemByIndex,
    height: numberOfVisibleRows * itemHeight,
  };
}
