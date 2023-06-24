import React from 'react';
import {Image} from 'native-base';
import {ItemDetailsActions} from 'src/Redux/reducers';

export type IVideoMapState = {
  itemDetails: ItemDetailsActions;
};

export interface IVideoProps {
  filePath: string;
  cover: string
}

export const Video: React.FC<IVideoProps> = React.memo(({filePath, cover}) => {
  return <Image width={'100%'} height={220} source={{uri: cover}} alt={cover} />;
});
