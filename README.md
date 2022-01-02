# react-native-expo-wheel-picker

picker

## Installation

```sh
npm install react-native-expo-wheel-picker
```

## Usage

```js
import React, { useCallback, useState } from 'react';

import { View, Text } from 'react-native';
import WheelPicker from 'react-native-expo-wheel-picker';

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
  const [value, _] = useState(10);
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
