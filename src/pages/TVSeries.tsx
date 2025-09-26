import { Box, CircularProgress } from "@mui/material";
import MovieBanner from "../components/MovieBanner";
import SerieInfo from "../components/SerieInfo";
import SubMenu from "../components/SubMenu";
import PreviewThumbnail from "../components/PreviewThumbnail";
import full_logo from "../assets/images/iptv-full-logo.png";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import {
  getSerieDetail,
  getMovieHomeLayout,
  getNewArrivalSeries,
  // getTrendingSeries,
  getSuggestedSeries,
  getOriginSeries,
} from "../store/moviesSlice";

type LayoutContext = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  boolean
];

const TVSeries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [activeImage, setActiveImage, activeTab, setActiveTab, isMobileLandscape] =
    useOutletContext<LayoutContext>();
  const [hide, setHide] = useState(false);

  const sideBarMenuItems = [
    { name: "Trending", url: "/trending" },
    { name: "New Arrival", url: "/new-arrival" },
    { name: "Saved Movies", url: "/saved-movies" },
  ];

  const {
    suggested_series,
    new_arrival_series,
    serie_detail,
    origin_series,
    loading,
  } = useSelector((state: any) => state.movies);

  // Memoized values for renderPage
  const currentPageData = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return {
          isLoading: loading,
          state: suggested_series,
          fetchFn: getSuggestedSeries,
        };
      // case "/trending":
      //   return {
      //     isLoading: loading,
      //     state: trending_movies,
      //     fetchFn: getTrendingSeries,
      //   };
      case "/series/new-arrival":
        return {
          isLoading: loading,
          state: new_arrival_series,
          fetchFn: getNewArrivalSeries,
        };
      case "/series/origin":
        return {
          isLoading: loading,
          state: origin_series,
          fetchFn: getOriginSeries,
        };
      default:
        return {
          isLoading: loading,
          state: suggested_series,
          fetchFn: getSuggestedSeries,
        };
    }
  }, [
    location.pathname,
    suggested_series,
    new_arrival_series,
    origin_series,
    loading,
  ]);

  // Fetch movie list on location change
  useEffect(() => {
    dispatch(getMovieHomeLayout());
    dispatch(currentPageData.fetchFn({ limit: 10, page: 1 }));
  }, [dispatch, currentPageData.fetchFn]);

  // Fetch movie detail based on activeImage or first item
  useEffect(() => {
    if (activeImage !== 0) {
      dispatch(getSerieDetail(activeImage));
    } else if (currentPageData.state?.length > 0) {
      dispatch(getSerieDetail(currentPageData.state[0]?.id));
    }
  }, [dispatch, activeImage, currentPageData.state]);

  // Loading fallback
  if (Object.keys(serie_detail).length === 0) {
    return (
      <Box
        width='100%'
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <CircularProgress sx={{ color: "#A05070" }} size={50} />
      </Box>
    );
  }

  return (
    <Box
      width={isMobileLandscape ? 'calc(100vw - 140px)' : 'calc(100vw - 280px)'}
      position='relative'
    >
      <img
        src={full_logo}
        width={isMobileLandscape ? 80 : 128}
        style={{
          position: "absolute",
          top: isMobileLandscape ? 10 : 20,
          left: isMobileLandscape ? 20 : 41,
          zIndex: 2
        }}
      />
      <MovieBanner
        mainImage={
          serie_detail?.posters?.find((p: any) => p.poster_type === 1)
            ?.poster_cdn_url
        }
        serieDetail={serie_detail}
      />
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(12, 12, 43, 0) 0%, #0C0C2B 76.5%)",
          position: "absolute",
          zIndex: 1,
          bottom: "18%",
          width: "100%",
          height: "50%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        width={isMobileLandscape ? 'calc(100% - 20px)' : 'calc(100% - 26px)'}
        position='absolute'
        bottom={isMobileLandscape ? 60 : 100}
        left={isMobileLandscape ? 20 : 26}
        zIndex={2}>
        <SerieInfo
          serie_detail={serie_detail}
          hide={hide}
          setHide={setHide}
          onWatchedProgressSaved={() => { }}
          isMobileLandscape={isMobileLandscape}
        />
        {!hide && (
          <PreviewThumbnail
            activeImage={activeImage || currentPageData.state[0]?.id}
            setActiveImage={setActiveImage}
            suggestedItems={currentPageData.state}
          />
        )}
      </Box>
      <SubMenu
        sideBarMenuItems={sideBarMenuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileLandscape={isMobileLandscape}
      />
    </Box>
  );
};

export default TVSeries;
