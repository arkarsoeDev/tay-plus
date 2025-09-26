import { Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import {
  deleteSavedMovie,
  getMovieDetail,
  savedMovies,
  storeMovie,
  clearMovieDetail,
  storeWatchedMovie,
} from "../store/moviesSlice";
import { useTranslation } from "react-i18next";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";

const MovieInfo = ({ movie_detail, onWatchedProgressSaved, isMobileLandscape = false, watchingData }: any) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [watchedTime, setWatchedTime] = useState<number>(0);
  const [isWatching, setIsWatching] = useState<boolean>(false);

  // Function to start watching the movie from beginning
  const handleStartWatching = () => {
    setIsWatching(true);
    setWatchedTime(0);
    setOpen(true);
  };

  // Function to resume watching the movie from where left off
  const handleResumeWatching = () => {
    setIsWatching(true);
    setWatchedTime(watchingData?.watched_time || 0);
    setOpen(true);
  };

  // Function to handle video player close (when user stops watching)
  const handleVideoClose = async (videoWatchedTime: number = 0) => {
    // Use the watched time from video player if available, otherwise use local state
    const finalWatchedTime = videoWatchedTime > 0 ? videoWatchedTime : watchedTime;
    
    if (isWatching && finalWatchedTime > 0) {
      try {
        // Store the watched progress
        await dispatch(storeWatchedMovie({
          movie_id: movie_detail.id,
          watched_time: finalWatchedTime.toString()
        }));

        // Refresh watching data if callback is provided
        if (onWatchedProgressSaved) {
          onWatchedProgressSaved();
        }
      } catch (error) {
        console.error('Error saving watched progress:', error);
      }
    }
    
    // Reset watching state
    setIsWatching(false);
    setWatchedTime(0);
    setOpen(false);
  };

  return (
    <>
      <Typography
        variant='h4'
        component='h6'
        fontWeight={700}
        mb={isMobileLandscape ? '5px' : '10px'}
        fontSize={isMobileLandscape ? 18 : 32}>
        {lang === "en" ? movie_detail.title_en : movie_detail.title_my}
      </Typography>
      <Stack 
        direction='row' 
        alignItems='center' 
        gap={isMobileLandscape ? '5px' : '10px'} 
        mb={isMobileLandscape ? '15px' : '30px'}
      >
        {location.pathname !== "/continue-watching" ? (
          <>
            <Button
              onClick={handleStartWatching}
              variant='contained'
              sx={{
                width: isMobileLandscape ? 130 : 237,
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor: "rgba(192, 0, 0, 1)",
                color: "white",
                textTransform: "capitalize",
                outline: "none",
                minWidth: isMobileLandscape ? 120 : 237,
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  backgroundColor: "rgba(192, 0, 0, 0.6)",
                  color: "white",
                },
              }}>
              {t("Start Watching")}
            </Button>
            <Button
              onClick={() => {
                if (movie_detail.is_saved) {
                  dispatch(deleteSavedMovie(movie_detail.saved_movie_id));
                  dispatch(savedMovies({ page: 1, limit: 10 }));
                  dispatch(clearMovieDetail());
                } else {
                  dispatch(storeMovie({ movie_id: movie_detail.id }));
                  dispatch(getMovieDetail(movie_detail.id));
                }
              }}
              variant='contained'
              sx={{
                width: isMobileLandscape ? (movie_detail.is_saved ? 140 : 130) : (movie_detail.is_saved ? 250 : 237),
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: "white",
                textTransform: "capitalize",
                border: "1px solid rgba(255, 255, 255, 1)",
                minWidth: isMobileLandscape ? (movie_detail.is_saved ? 140 : 130) : (movie_detail.is_saved ? 250 : 237),
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  border: "1px solid rgba(255, 255, 255, 1)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  color: "white",
                },
              }}>
              {movie_detail.is_saved
                ? `${t("Remove from Saved")}`
                : `${t("Save for Later")}`}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleResumeWatching}
              variant='contained'
              sx={{
                width: isMobileLandscape ? 120 : 237,
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor: "rgba(192, 0, 0, 1)",
                color: "white",
                textTransform: "capitalize",
                outline: "none",
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  backgroundColor: "rgba(192, 0, 0, 0.6)",
                  color: "white",
                },
              }}>
              {t("Resume Playing")}
            </Button>
            <Button
              onClick={handleStartWatching}
              variant='contained'
              sx={{
                width: isMobileLandscape ? 165 : 305,
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor: "rgba(192, 0, 0, 1)",
                color: "white",
                textTransform: "capitalize",
                outline: "none",
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  backgroundColor: "rgba(192, 0, 0, 0.6)",
                  color: "white",
                },
              }}>
              {t("Start from the Beginning")}
            </Button>
          </>
        )}
      </Stack>

      {movie_detail?.videos?.length && (
        <VideoPlayer
          src={
            movie_detail.videos?.find((v: any) => v.video_status === 1)
              ?.streaming_url
          }
          autoPlay={true}
          poster={
            movie_detail.posters?.find((p: any) => p.poster_type === 1)
              ?.poster_cdn_url
          }
          open={open}
          setOpen={setOpen}
          startTime={watchedTime}
          onVideoStart={() => {
            setIsWatching(true);
          }}
          onVideoEnd={(watchedTime) => {
            setWatchedTime(watchedTime);
            handleVideoClose(watchedTime);
          }}
          onVideoClose={handleVideoClose}
        />
      )}
    </>
  );
};

export default MovieInfo;
