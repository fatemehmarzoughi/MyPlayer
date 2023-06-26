import AudioPlayer from "react-native-video";
import {ItemDetailsActions} from "src/Redux/reducers";
import React from "react";
import {width} from "src/assets";

export type IAudioMapState = {
  itemDetails: ItemDetailsActions;
};
export interface IAudioProps {
  cover: string;
  filePath: string;
}

export const Audio: React.FC<IAudioProps> = React.memo(({cover, filePath}) => {
  return (
    <AudioPlayer
      repeat
      controls
      audioOnly
      pictureInPicture
      accessibilityLanguage="en"
      source={{uri: filePath}}
      style={{height: 350, width: width}}
      onVideoEnd={() => {
        /** should update the "watched" field in database */
      }}
    />
  );
});
