import {useEffect, useContext} from 'react';
import {Dimensions} from 'react-native';
import Context from 'src/context/context';

export default function IsRotate() {
  const context = useContext(Context);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width > height) {
        // context.changeIsRotateToTrue();
        console.log('is rotate ');
      } else {
        // context.changeIsRotateToFalse();
      }
    });
  }, []);
}
