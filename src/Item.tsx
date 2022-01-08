// src/Item.tsx

import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface IItemProps {
  index: number;
  offset: Animated.SharedValue<number>;
  itemHeight: number;
  label: string;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: TextStyle;
}

function Item(props: IItemProps) {
  const {
    index,
    itemHeight,
    offset,
    label,
    activeColor = '#1CAF8D',
    inactiveColor = 'rgba(0, 0, 0, 0.3)',
    labelStyle = {
      fontSize: 17,
    },
  } = props;
  const itemOffset = index * itemHeight;

  const udv = useDerivedValue(() => {
    if (
      offset.value >= (index - 3) * itemHeight &&
      offset.value <= (index + 3) * itemHeight
    ) {
      return offset.value;
    } else if (offset.value < (index - 3) * itemHeight) {
      return 0;
    } else if (offset.value > (index + 3) * itemHeight) {
      return 0;
    }

    return 0;
  });

  const animatedColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      udv.value,
      [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight],
      [inactiveColor, activeColor, inactiveColor]
    );
    return { color };
  }, [itemHeight]);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: itemHeight,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatedText style={[animatedColorStyle, labelStyle]}>
        {label}
      </AnimatedText>
    </View>
  );
}

export default React.memo(Item);
