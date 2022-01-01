import React, { useCallback, useState } from 'react';

import { View, Text } from 'react-native';
import WheelPicker from '../../src';

function createDemoSet(n: number) {
  const items = [];
  for (let i = 0; i < n; i++) {
    items.push({
      id: i,
      name: `Item ${i}`,
      value: i,
    });
  }
  return items;
}

const example = createDemoSet(50);

export default function App() {
  const [value, setValue] = useState(10);
  const handleChange = useCallback((index) => {
    console.log('change', index);
  }, []);

  return (
    <View>
      <Text>Demo</Text>
      <WheelPicker
        numberOfVisibleRows={7}
        value={value}
        onChange={handleChange}
        items={example}
      />
    </View>
  );
}
