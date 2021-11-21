import {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute} from '../../const';
import {getFilmData} from '../../store/selectors';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Spinner from './spinner';
import {fetchCurrentFilmAction} from '../../store/api-actions';

const VIDEO_FAIL_MESSAGE ='Не удалось загрузить видео';

dayjs.extend(duration);

function Player(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const currentId = +id;

  const filmData = useSelector(getFilmData);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const dispatch = useDispatch();

  const {videoLink} = filmData;

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaing, setIsPlaing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(dayjs.duration(0, 's').format('mm:ss'));

  const toglerValue = {
    left: `${progress}%`,
  };

  const getVideoTime = (): number => {
    if (videoRef.current !== null) {
      return videoRef.current.currentTime;
    }
    return 0;
  };

  const getVideoDuration = () => {
    if (videoRef.current !== null) {
      if (videoRef.current.duration > 3600) {
        return dayjs.duration(videoRef.current.duration - getVideoTime(), 's').format('HH:mm:ss');
      }
      return dayjs.duration(videoRef.current.duration - getVideoTime(), 's').format('mm:ss');
    }
    return dayjs.duration(0, 's').format('mm:ss');
  };

  const onloadeddata = async() => {
    setIsLoading(true);
    await dispatch(fetchCurrentFilmAction(currentId));
    setIsLoading(false);
  };

  useEffect(() => {
    onloadeddata();
  }, [currentId]);

  useEffect(() => {
    if (videoRef.current !== null && isPlaing) {
      const playPromise = videoRef.current.play();
      setIsPlaing(true);
      if (playPromise !== undefined) {
        playPromise
          .catch((error) => {
            toast.info(VIDEO_FAIL_MESSAGE);
          });
      }
    }
  }, [isPlaing]);

  useEffect(() => {
    if (videoRef.current !== null) {
      isPlaing ? videoRef.current.pause() : videoRef.current.play();
    }
  }, [isPlaing, isLoading]);

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current !== null) {
        setProgress(getVideoTime()/ videoRef.current.duration * 100);
        setVideoDuration(getVideoDuration());
      }}, 1000);
  }, [getVideoDuration(), progress, videoDuration, isPlaing]);

  return (
    <div className="player">
      {isLoading ? <Spinner/> :
        <video
          src={videoLink}
          className="player__video"
          ref={videoRef}
        >
        </video>}

      <button type="button" className="player__exit" onClick={() => history.push(AppRoute.Main)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={toglerValue}>Toggler</div>
          </div>
          <div className="player__time-value">{videoDuration}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={(evt) => {
              evt.preventDefault();
              setIsPlaing(!isPlaing);
            }}
          >
            {!isPlaing ?
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </> :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>}
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => {
              videoRef.current?.requestFullscreen();
            }}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
