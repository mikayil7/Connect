import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export function totalSize(number) {
  return (Math.sqrt(height * height + width * width) * number) / 100;
}
