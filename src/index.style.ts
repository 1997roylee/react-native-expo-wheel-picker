import { StyleSheet } from 'react-native';
import { itemHeight } from './constant';

const styles = StyleSheet.create({
  fixedTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 60,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 60,
  },
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: itemHeight,
    borderColor: '#eee',
  },
});

export default styles;
