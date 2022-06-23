import {
  Dimensions
} from 'react-native';

const { height } = Dimensions.get("window");

const Sizing = (number) => {
  let multiple;
  if (height >= 800) {
    multiple = number / 812;
  } else {
    multiple = number / 800;
  }
  return multiple * height;
};


export { Sizing };