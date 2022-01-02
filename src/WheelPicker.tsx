// src/WheelPicker.tsx
import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { View, FlatList, Platform, Dimensions, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
// import { LinearGradient } from 'expo-linear-gradient';
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
  numberOfVisibleRows: number;
  value: any;
}

function WheelPicker(props: IWheelPickerProps) {
  const scrollView = useRef<Animated.ScrollView>();
  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((e) => {
    offset.value = e.contentOffset.y;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    items: propItems,
    numberOfVisibleRows = 5,
    value,
    onChange = () => {},
  } = props;

  const { items, defaultIndex, height } = usePresenter({
    initialValue: value,
    items: propItems,
    valueAttribute: 'value',
    labelAttribute: 'name',
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
    onChange(currentIndex);
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
      // paddingTop: (maxDisplaysOnViewport / 2 - 1) * itemHeight,
      // paddingBottom: (maxDisplaysOnViewport / 2 - 1) * itemHeight,
    }),
    [height]
  );

  const onValueChange = useCallback(
    (event) =>
      setCurrentIndex(
        Math.floor(event.nativeEvent.contentOffset.y / itemHeight)
      ),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      scrollToOffset(defaultIndex, true);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultIndex]);

  const scrollToOffset = (index: number, animated: boolean) => {
    if (isFunction((scrollView.current as any).scrollToOffset)) {
      (scrollView.current as any).scrollToOffset({
        offset: index * itemHeight,
        animated,
      });
    } else {
      (scrollView.current?.getNode() as any).scrollToOffset({
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
        // onLayout={getLayout}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={100}
        initialNumToRender={8}
        onScroll={scrollHandler}
        pagingEnabled
        renderItem={renderItem}
        snapToOffsets={snapToOffsets}
        keyExtractor={(_, index) => `Item_${index}`}
        // initialScrollIndex={10}
        contentContainerStyle={contentContainerStyle}
        snapToInterval={itemHeight}
        decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.98}
        onMomentumScrollEnd={onValueChange}
      />
      {/* <LinearGradient
        // Background Linear Gradient
        colors={['rgba(255,255,255,0.8)', 'rgba(255, 255, 255, 0)']}
        style={Styles.fixedTop}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255,255,255,.8)']}
        style={Styles.fixedBottom}
      /> */}
      {separators}
    </View>
  );
}

export default React.memo(WheelPicker);
