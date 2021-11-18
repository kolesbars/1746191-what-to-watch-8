import {useEffect, useRef, useState} from 'react';
import {toast} from 'react-toastify';

const VIDEO_FAIL_MESSAGE = 'Не удалось загрузить видео';

type VideoPlayerProps = {
  src: string
  isPlaing: boolean
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {

  const {src, isPlaing} = props;

  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.onloadeddata = () => setIsLoading(false);
    }

    return () => {
      if (videoRef.current !== null) {
        videoRef.current.onloadeddata = null;
        videoRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current !== null && isPlaing && !isLoading) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .catch(() => toast.info(VIDEO_FAIL_MESSAGE));
      }
    }
  });

  return (
    <video src={src} ref={videoRef} muted></video>
  );
}

export default VideoPlayer;
