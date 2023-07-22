import {ItemDetailsActions} from "src/Redux/reducers";
import React from "react";
import VideoPlayer from "react-native-video";
import {width} from "src/assets";

export type IVideoMapState = {
  itemDetails: ItemDetailsActions;
};

export interface IVideoProps {
  filePath: string;
  cover: string;
}

export const Video: React.FC<IVideoProps> = React.memo(({filePath, cover}) => {
  return (
    <VideoPlayer
      repeat
      controls
      pictureInPicture
      playInBackground
      source={{uri: filePath}}
      style={{height: 350, width: width}}
      onVideoEnd={() => {
        /** should update the "watched" field in database */
      }}
    />
  );
});
