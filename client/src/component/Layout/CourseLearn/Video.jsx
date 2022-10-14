import React from 'react';
import {
  BigPlayButton,
  ControlBar,
  PlaybackRateMenuButton,
  Player,
} from 'video-react';
import 'video-react/dist/video-react.css';
import { useDispatch } from 'react-redux';
import { addProccess } from '../../../redux/actions/ProccessAction';

// const url =
//   'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4';

const Video = (props) => {
  const { url, videoID } = props;
  const playerRef = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    playerRef.current.subscribeToStateChange(videoChange);
  }, []);

  const videoChange = () => {
    const { player } = playerRef.current.getState();
    if (player.isActive) {
      const { currentTime, duration } = player;
      const percentTime = (currentTime * 100) / duration;
      if (percentTime >= 90 && percentTime < 90.1) {
        dispatch(addProccess(videoID));
      }
    }
  };

  return (
    <Player src={url} ref={playerRef}>
      <BigPlayButton position="center" />
      <ControlBar autoHide>
        <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.25]} order={7.1} />
      </ControlBar>
    </Player>
  );
};

export default Video;
