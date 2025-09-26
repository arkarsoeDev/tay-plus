import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import {
  deleteSavedSerie,
  getSerieDetail,
  savedSeries,
  storeSerie,
  clearSerieDetail,
  getEpisodeDetail,
  storeWatchedSerie,
} from "../store/moviesSlice";
import { useTranslation } from "react-i18next";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";

const SerieInfo = ({
  serie_detail,
  hide,
  setHide,
  onWatchedProgressSaved,
  isMobileLandscape = false,
  watchingData,
}: any) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch<AppDispatch>();
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  const [currentWatchingEpisode, setCurrentWatchingEpisode] =
    useState<any>(null);
  const [videoWatchedTime, setVideoWatchedTime] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(
    serie_detail.seasons?.[0]?.id || null
  );
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(
    serie_detail.seasons?.[0]?.episodes?.[0]?.id || null
  );

  const selectedSeason = serie_detail?.seasons?.find(
    (season: any) => season.id === selectedSeasonId
  );

  const selectedEpisode = selectedSeason?.episodes?.find(
    (episode: any) => episode.id === selectedEpisodeId
  );
  // Function to start watching the selected episode
  const handleStartWatching = async () => {
    // Figure out episodeId to watch — use selectedEpisodeId OR first episode in selected season
    const episodeIdToWatch =
      selectedEpisodeId ||
      serie_detail?.seasons?.find(
        (season: any) => season.id === selectedSeasonId
      )?.episodes?.[0]?.id;

    if (!episodeIdToWatch) {
      return; // Exit if no episode ID is found
    }

    // Store selectedEpisodeId if it wasn't already set
    if (!selectedEpisodeId) {
      setSelectedEpisodeId(episodeIdToWatch);
    }

    try {
      const { payload }: any = await dispatch(
        getEpisodeDetail(episodeIdToWatch)
      );
      const episodeData = payload?.data?.episode;

      if (!episodeData) {
        // Optionally, you might want to show a user-friendly error message here.
        return; // Exit if episodeData is not valid to prevent setting null state and potential issues with VideoPlayer
      }

      // Update player-related states in one go
      setCurrentWatchingEpisode(episodeData);
      setVideoWatchedTime(0);
      setIsWatching(true);
      setVideoPlayerOpen(true);
    } catch (error) {
      console.error(
        "handleStartWatching: Error starting to watch episode:",
        error
      );
    }
  };

  // Function to resume watching the selected episode from where left off
  const handleResumeWatching = async () => {
    // For resume, use the episode and season from watching data if available
    let episodeIdToWatch = watchingData?.episode_id || selectedEpisodeId;
    // const seasonIdToUse = watchingData?.season_id || selectedSeasonId;

    if (!episodeIdToWatch) {
      // If no episode is selected, try to get the first episode of the current season
      const currentSeason = serie_detail?.seasons?.find(
        (season: any) => season.id === selectedSeasonId
      );
      const firstEpisode = currentSeason?.episodes?.[0];
      if (firstEpisode) {
        episodeIdToWatch = firstEpisode.id;
        setSelectedEpisodeId(firstEpisode.id);
      }
    }

    if (!episodeIdToWatch) {
      return;
    }

    // Update selected season and episode to match watching data
    if (watchingData?.season_id && watchingData?.episode_id) {
      setSelectedSeasonId(watchingData.season_id);
      setSelectedEpisodeId(watchingData.episode_id);
    }

    try {
      // Get episode details
      const episodeResponse: any = await dispatch(
        getEpisodeDetail(episodeIdToWatch)
      );
      const episodeData = episodeResponse.payload.data.episode;

      // Find the main video (video_status = 1, not trailer)
      const mainVideo = episodeData.videos?.find(
        (video: any) => video.video_status === 1
      );

      if (!mainVideo) {
        return;
      }

      setVideoPlayerOpen(true);
      setCurrentWatchingEpisode(episodeData);
      setVideoWatchedTime(watchingData?.watched_time || 0);
      setIsWatching(true);
    } catch (error) {
      console.error("Error resuming to watch episode:", error);
    }
  };

  // Function to handle video player close (when user stops watching)
  const handleVideoClose = async (videoWatchedTime: number = 0) => {
    // Use the watched time from video player
    const finalWatchedTime = videoWatchedTime;

    if (isWatching && currentWatchingEpisode && finalWatchedTime > 0) {
      try {
        // Store the watched progress with the correct episode and season information
        await dispatch(
          storeWatchedSerie({
            serie_id: serie_detail.id,
            season_id: selectedSeasonId,
            episode_id: currentWatchingEpisode.id, // Use the episode ID from the current watching episode
            watched_time: finalWatchedTime.toString(),
          })
        );

        // Refresh watching data if callback is provided
        if (onWatchedProgressSaved) {
          onWatchedProgressSaved();
        }
      } catch (error) {
        console.error("Error saving watched progress:", error);
      }
    }

    // Reset watching state
    setVideoPlayerOpen(false);
    setCurrentWatchingEpisode(null);
    setVideoWatchedTime(0);
    setIsWatching(false);
  };
  return (
    <>
      <Typography
        variant='h4'
        component='h6'
        fontWeight={700}
        mb={isMobileLandscape ? "5px" : "10px"}
        fontSize={isMobileLandscape ? 18 : 32}>
        {lang === "en" ? serie_detail.title_en : serie_detail.title_my}
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
        gap={isMobileLandscape ? "5px" : "10px"}
        mb={isMobileLandscape ? "15px" : "30px"}
        display={hide ? "none" : "flex"}>
        {location.pathname !== "/continue-watching" ? (
          <>
            <Button
              onClick={handleStartWatching}
              disabled={!selectedEpisodeId}
              variant='contained'
              sx={{
                width: isMobileLandscape ? 130 : 237,
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor: selectedEpisodeId
                  ? "rgba(192, 0, 0, 1)"
                  : "rgba(128, 128, 128, 0.5)",
                color: "white",
                textTransform: "capitalize",
                outline: "none",
                minWidth: isMobileLandscape ? 120 : 237,
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  backgroundColor: selectedEpisodeId
                    ? "rgba(192, 0, 0, 0.6)"
                    : "rgba(128, 128, 128, 0.5)",
                  color: "white",
                },
                "&:disabled": {
                  backgroundColor: "rgba(128, 128, 128, 0.5)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}>
              {t("Start Watching")}
            </Button>
            <Button
              onClick={() => {
                if (serie_detail.is_saved) {
                  dispatch(deleteSavedSerie(serie_detail.saved_serie_id));
                  dispatch(savedSeries({ page: 1, limit: 10 }));
                  dispatch(clearSerieDetail());
                } else {
                  dispatch(
                    storeSerie({
                      serie_id: serie_detail.id,
                    })
                  );
                  dispatch(getSerieDetail(serie_detail.id));
                }
              }}
              variant='contained'
              sx={{
                width: isMobileLandscape
                  ? serie_detail.is_saved
                    ? 140
                    : 130
                  : serie_detail.is_saved
                    ? 250
                    : 237,
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                color: "white",
                textTransform: "capitalize",
                border: "1px solid rgba(255, 255, 255, 1)",
                minWidth: isMobileLandscape
                  ? serie_detail.is_saved
                    ? 140
                    : 130
                  : serie_detail.is_saved
                    ? 250
                    : 237,
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  border: "1px solid rgba(255, 255, 255, 1)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  color: "white",
                },
              }}>
              {serie_detail.is_saved
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

      <Box width='100%' overflow='auto' display={hide ? "block" : "none"}>
        <Stack direction='row' alignItems='center' gap='10px' minWidth={800}>
          {serie_detail?.seasons?.map((season: any) => (
            <Button
              key={season.id}
              onClick={() => setSelectedSeasonId(season.id)}
              variant='outlined'
              sx={{
                width: isMobileLandscape ? 120 : 160,
                height: isMobileLandscape ? 24 : 40,
                borderRadius: "6px",
                fontSize: isMobileLandscape ? 10 : 20,
                fontWeight: 700,
                backgroundColor:
                  selectedSeasonId === season.id ? "#333366CC" : "transparent",
                border: "1px solid #ffffff",
                color: "white",
                textTransform: "capitalize",
                outline: "none",
                ":focus-visible, :focus": {
                  outline: "none",
                },
                "&:hover": {
                  backgroundColor: "#333366CC",
                  border: "1px solid #ffffff",
                  color: "white",
                },
              }}>
              {t(`Season 0${season?.season_name}`)}
            </Button>
          ))}
        </Stack>

        <Box maxHeight='calc(100vh - 420px)' overflow='auto'>
          {serie_detail?.seasons?.map(
            (season: any) =>
              selectedSeasonId === season.id &&
              season.episodes
                ?.slice()
                .sort((a: any, b: any) => {
                  const orderA = a.episode_order ?? a.id;
                  const orderB = b.episode_order ?? b.id;
                  return orderA - orderB;
                })
                ?.map((episode: any) => (
                  <Typography
                    onClick={() => {
                      setSelectedEpisodeId(episode.id);
                      setHide(false);
                    }}
                    key={episode.id}
                    variant='h4'
                    sx={{
                      fontSize: 24,
                      fontWeight: selectedEpisodeId === episode.id ? 600 : 400,
                      color:
                        selectedEpisodeId === episode.id ? "#A05070" : "white",
                      textTransform: "capitalize",
                      mt: 2,
                      cursor: "pointer",
                      "&:hover": {
                        color:
                          selectedEpisodeId === episode.id
                            ? "#A05070"
                            : "#cccccc",
                      },
                    }}>
                    {lang === "en"
                      ? `Episode ${episode.title_en}`
                      : `Episode ${episode.title_my}`}
                  </Typography>
                ))
          )}
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <IconButton
            onClick={() => {
              setHide(false);
              setSelectedSeasonId(serie_detail?.seasons?.[0]?.id || null);
            }}
            sx={{
              backgroundColor: "#333366CC",
              zIndex: 99,
              color: "white",
            }}>
            <KeyboardDoubleArrowDown
              sx={{ fontSize: isMobileLandscape ? 12 : 20 }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box display={hide ? "none" : "block"} mb={isMobileLandscape ? 1 : 2}>
        {(() => {
          const firstSeason = serie_detail?.seasons?.[0];
          const firstEpisode = firstSeason?.episodes?.[0];

          // const selectedSeason = serie_detail?.seasons?.find(
          //   (season: any) => season.id === selectedSeasonId
          // );
          // const selectedEpisode = serie_detail?.seasons
          //   ?.find((season: any) => season.id === selectedSeasonId)
          //   ?.episodes?.find(
          //     (episode: any) => episode.id === selectedEpisodeId
          //   );

          if (!firstSeason || !firstEpisode) return null;

          return (
            <Typography
              variant='h4'
              sx={{
                fontSize: isMobileLandscape ? 12 : 24,
                fontWeight: 400,
                color: "white",
                textTransform: "capitalize",
              }}>
              {selectedSeason && selectedEpisode
                ? lang === "en"
                  ? `Season ${selectedSeason.season_name} - Episode ${selectedEpisode.title_en}`
                  : `Season ${selectedSeason.season_name} - Episode ${selectedEpisode.title_my}`
                : lang === "en"
                  ? `Season ${firstSeason.season_name} - Episode ${firstEpisode.title_en}`
                  : `Season ${firstSeason.season_name} - Episode ${firstEpisode.title_my}`}
            </Typography>
          );
        })()}
        <Typography
          variant='h4'
          component={Button}
          onClick={() => {
            setHide(true);
          }}
          sx={{
            fontSize: isMobileLandscape ? 10 : 20,
            fontWeight: 700,
            color: "white",
            textTransform: "capitalize",
            mt: isMobileLandscape ? 1 : 2,
          }}>
          View All Episodes
        </Typography>
      </Box>

      {/* Episode video player */}
      {currentWatchingEpisode && videoPlayerOpen && (
        <>
          <VideoPlayer
            key={currentWatchingEpisode?.id}
            src={
              currentWatchingEpisode?.videos?.find(
                (v: any) => v.video_status === 1
              )?.streaming_url || ""
            }
            autoPlay={true}
            poster={
              currentWatchingEpisode?.posters?.find(
                (p: any) => p.poster_type === 1
              )?.poster_cdn_url || ""
            }
            open={videoPlayerOpen}
            setOpen={setVideoPlayerOpen}
            startTime={videoWatchedTime}
            onVideoStart={() => {
              setIsWatching(true);
            }}
            onVideoEnd={(watchedTime) => {
              setVideoWatchedTime(watchedTime);
              handleVideoClose(watchedTime);
            }}
            onVideoClose={handleVideoClose}
          />
        </>
      )}
    </>
  );
};

export default SerieInfo;
