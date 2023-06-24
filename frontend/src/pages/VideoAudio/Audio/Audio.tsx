import React from 'react';
import {Image} from 'native-base';
import {ItemDetailsActions} from 'src/Redux/reducers';

export type IAudioMapState = {
  itemDetails: ItemDetailsActions;
};
export interface IAudioProps {
  cover: string;
  filePath: string;
}

export const Audio: React.FC<IAudioProps> = React.memo(({cover, filePath}) => {
  return (
    <Image width={'100%'} height={220} source={{uri: cover}} alt={cover} />
  );
});
