import React, { useCallback, useState } from 'react';

import { View, Text, Modal } from 'react-native';
import WheelPicker from '../../src';

function createDemoSet(n: number) {
  const items = [];
  for (let i = 0; i < n; i++) {
    items.push({
      id: i,
      label: `Item ${i}`,
      value: i,
    });
  }
  return items;
}

const example = createDemoSet(2);

export default function App() {
  const [value] = useState(1);
  const handleChange = useCallback((index) => {
    console.log('change', index);
  }, []);

  return (
    <View>
      <Modal visible={true} presentationStyle="formSheet">
        <Text>Demo</Text>
        <WheelPicker
          numberOfVisibleRows={5}
          value={value}
          onChange={handleChange}
          items={example}
          labelAttribute="label"
          valueAttribute="value"
        />
      </Modal>
    </View>
  );
}
