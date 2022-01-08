// src/WheelPicker.tsx
import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { View, FlatList, Dimensions, ViewStyle, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Item from './Item';
import usePresenter from './usePresenter';
import Styles from './index.style';
import isFunction from 'lodash/isFunction';
import { itemHeight } from './constant';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { width } = Dimensions.get('window');

interface IWheelPickerProps {
  items: any[];
  onChange: (index: number) => void;
  numberOfVisibleRows?: number;
  value: any;
  labelAttribute?: string;
  valueAttribute?: string;
}

function WheelPicker(props: IWheelPickerProps) {
  const scrollView = useRef<Animated.ScrollView>();
  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((e) => {
    offset.value = e.contentOffset.y;
  });

  const {
    items: propItems,
    numberOfVisibleRows = 5,
    value,
    onChange = () => {},
    valueAttribute = 'value',
    labelAttribute = 'name',
  } = props;

  const { items, defaultIndex, height, currentIndex, onValueChange } =
    usePresenter({
      initialValue: value,
      items: propItems,
      valueAttribute,
      labelAttribute,
      numberOfVisibleRows,
    });

  const renderItem = useCallback(
    ({ item, index }) => (
      <Item
        index={index}
        offset={offset}
        itemHeight={itemHeight}
        label={item.label}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (currentIndex !== defaultIndex) onChange(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const snapToOffsets = useMemo(
    () =>
      Array(items.length)
        .fill(0)
        .map((_, index) => index * 46),
    [items]
  );

  const separators = useMemo(() => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          justifyContent: 'center',
          width,
          height,
        }}
        pointerEvents="none"
      >
        <View style={Styles.separators} />
      </View>
    );
  }, [height]);

  const contentContainerStyle: ViewStyle = useMemo(
    () => ({
      width,
      alignItems: 'center',
      paddingVertical: height / 2 - itemHeight / 2,
    }),
    [height]
  );

  const onMomentumScrollEndAndroid = (index: number) => {
    if (Platform.OS === 'android' && currentIndex !== index) {
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // console.log(defaultIndex);
      onMomentumScrollEndAndroid(defaultIndex);
      scrollToOffset(defaultIndex, true);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultIndex]);

  const scrollToOffset = (index: number, animated: boolean) => {
    if (isFunction((scrollView.current as any)?.scrollToOffset)) {
      (scrollView.current as any)?.scrollToOffset({
        offset: index * itemHeight,
        animated,
      });
    } else {
      (scrollView.current?.getNode() as any)?.scrollToOffset({
        offset: index * itemHeight,
        animated,
      });
    }
  };

  return (
    <View style={{ height }}>
      <AnimatedFlatList
        // @ts-ignore
        ref={scrollView}
        height={height}
        data={items}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={100}
        initialNumToRender={numberOfVisibleRows}
        onScroll={scrollHandler}
        pagingEnabled
        renderItem={renderItem}
        snapToOffsets={snapToOffsets}
        keyExtractor={(_, index) => `Item_${index}`}
        contentContainerStyle={contentContainerStyle}
        snapToInterval={itemHeight}
        decelerationRate={0.99}
        onMomentumScrollEnd={onValueChange}
      />
      {separators}
    </View>
  );
}

export default React.memo(WheelPicker);
