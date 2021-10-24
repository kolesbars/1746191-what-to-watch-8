import {useEffect, useRef, useState} from 'react';

type VideoPlayerProps = {
  src: string
  isPlaing: boolean
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {

  const {src, isPlaing} = props;

  const [, setIsLoading] = useState(true);

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
  }, [src]);

  useEffect(() => {
    if (videoRef.current !== null && isPlaing) {
      videoRef.current.play();
    }
  });

  return (
    <video src={src} ref={videoRef} muted></video>
  );
}

export default VideoPlayer;
