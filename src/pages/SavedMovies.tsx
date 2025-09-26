import { Box, CircularProgress, Typography } from "@mui/material";
import MovieBanner from "../components/MovieBanner";
import MovieInfo from "../components/MovieInfo";
import SubMenu from "../components/SubMenu";
import PreviewThumbnail from "../components/PreviewThumbnail";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
  getMovieDetail,
  getSerieDetail,
  savedMovies,
  savedSeries,
  clearAllDetails,
} from "../store/moviesSlice";
import full_logo from "../assets/images/iptv-full-logo.png";
import SerieInfo from "../components/SerieInfo";

// type SideBarItem = {
//   name: string;
//   url: string;
// };

type LayoutContext = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  any, // selectedParentOrigin is of type any, not SubMenuItem
  any, // selectedParentOrigin is of type any, not SubMenuItem
  any, // selectedParentOrigin is of type any, not SubMenuItem
  boolean // isMobileLandscape
];
const SavedMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    saved_movies,
    movie_detail,
    saved_series,
    serie_detail,
    loading,
    saved_movies_pagination,
    saved_series_pagination,
  } = useSelector((state: any) => state.movies);
  const [
    activeImage,
    setActiveImage,
    activeTab,
    setActiveTab,
    _selectedParentOrigin,
    _setSelectedChildOrigin,
    _selectedChildOrigin,
    isMobileLandscape,] =
    useOutletContext<LayoutContext>();

  // Define the menu items for SavedMovies page
  const sideBarMenuItems = [
    { name: "Trending", url: "/trending" },
    { name: "New Arrival", url: "/new-arrival" },
    { name: "Saved Movies", url: "/saved-movies" },
  ];

  const [hide, setHide] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<
    "movie" | "series"
  >("movie");

  // Pagination state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Function to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      // Load more saved movies if there are more pages
      if (saved_movies_pagination.has_more) {
        await dispatch(
          savedMovies({
            page: saved_movies_pagination.current_page + 1,
            limit: 10,
          })
        );
      }

      // Load more saved series if there are more pages
      if (saved_series_pagination.has_more) {
        await dispatch(
          savedSeries({
            page: saved_series_pagination.current_page + 1,
            limit: 10,
          })
        );
      }
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    dispatch,
    isLoadingMore,
    saved_movies_pagination,
    saved_series_pagination,
  ]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && !loading) {
          loadMoreData();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreData, isLoadingMore, loading]);

  // Initial data fetch
  useEffect(() => {
    dispatch(savedMovies({ page: 1, limit: 10 }));
    dispatch(savedSeries({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Create hybrid content by alternating movies and series
  const createHybridContent = (movies: any[], series: any[]) => {
    const hybrid: any[] = [];
    const maxLength = Math.max(movies.length, series.length);

    for (let i = 0; i < maxLength; i++) {
      // Add movie if available
      if (movies[i]) {
        hybrid.push({
          ...movies[i],
          type: "movie",
        });
      }
      // Add series if available
      if (series[i]) {
        hybrid.push({
          ...series[i],
          type: "series",
        });
      }
    }

    return hybrid;
  };

  // Get all content (hybrid)
  const filteredContent = useMemo(() => {
    return createHybridContent(saved_movies, saved_series);
  }, [saved_movies, saved_series]);

  // Clear detail data when content changes (e.g., when items are removed)
  useEffect(() => {
    // If there's no content, clear the detail data
    if (filteredContent.length === 0) {
      dispatch(clearAllDetails());
    }
  }, [filteredContent, dispatch]);

  // Fetch detail when content changes
  useEffect(() => {
    if (
      activeImage !== null &&
      activeImage !== undefined &&
      !isNaN(Number(activeImage))
    ) {
      const contentItem = filteredContent.find(
        (item) => item.id === Number(activeImage)
      );
      if (contentItem) {
        setSelectedContentType(contentItem.type);
        if (contentItem.type === "series") {
          dispatch(getSerieDetail(contentItem.id));
        } else {
          dispatch(getMovieDetail(contentItem.id));
        }
      } else {
        // If the activeImage item is not found in filteredContent (was removed),
        // reset to first available item
        if (filteredContent.length > 0) {
          const firstItem = filteredContent[0];
          setActiveImage(firstItem.id);
          setSelectedContentType(firstItem.type);
          if (firstItem.type === "series") {
            dispatch(getSerieDetail(firstItem.id));
          } else {
            dispatch(getMovieDetail(firstItem.id));
          }
        } else {
          // No content left, clear the activeImage
          setActiveImage(0);
        }
      }
    } else if (filteredContent.length > 0) {
      const firstItem = filteredContent[0];
      setActiveImage(firstItem.id);
      setSelectedContentType(firstItem.type);
      if (firstItem.type === "series") {
        dispatch(getSerieDetail(firstItem.id));
      } else {
        dispatch(getMovieDetail(firstItem.id));
      }
    }
  }, [dispatch, filteredContent, activeImage, setActiveImage]);

  // Check if we have any content
  const hasContent = filteredContent.length > 0;
  // const hasMovieDetail = Object.keys(movie_detail).length > 0;
  // const hasSerieDetail = Object.keys(serie_detail).length > 0;
  // const isFetchingData = loading || isLoadingMore;

  // Loading fallback - only show when fetching and no content
  if (loading && !hasContent) {
    return (
      <Box
        width='100%'
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <CircularProgress sx={{ color: "#ed2148" }} size={50} />
      </Box>
    );
  }

  // No content fallback - only show when not loading and no content
  if (!loading && !hasContent) {
    return (
      <Box
        width='100%'
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        sx={{ color: "white" }}>
        <Typography variant='h4' component='h1' gutterBottom>
          No Saved Content
        </Typography>
        <Typography variant='body1'>
          You haven't saved any movies or series yet.
        </Typography>
      </Box>
    );
  }

  // Show content even if details are still loading
  if (hasContent) {
    return (
      <Box
        sx={{
          aspectRatio: isMobileLandscape ? "auto" : "16/9",
          width: isMobileLandscape
            ? "calc(100vw - 140px)"
            : "calc(100vw - 280px)",
          height: isMobileLandscape ? "100vh" : "auto", // optional fix
          position: "relative",
          overflow: "hidden", // ensures no scrollbars
        }}>
        <img
          src={full_logo}
          width={128}
          style={{ position: "absolute", top: 20, left: 41, zIndex: 2 }}
        />
        <MovieBanner
          mainImage={
            selectedContentType === "series"
              ? serie_detail?.posters?.[1]?.poster_cdn_url
              : movie_detail?.posters?.[1]?.poster_cdn_url
          }
          movieDetail={
            selectedContentType === "movie" ? movie_detail : undefined
          }
          serieDetail={
            selectedContentType === "series" ? serie_detail : undefined
          }
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
          width={isMobileLandscape ? "calc(100% - 20px)" : "calc(100% - 26px)"}
          position='absolute'
          bottom={isMobileLandscape ? 60 : 100}
          left={isMobileLandscape ? 20 : 26}
          zIndex={9}>
          {selectedContentType === "series" ? (
            <SerieInfo
              serie_detail={serie_detail}
              hide={hide}
              setHide={setHide}
              onWatchedProgressSaved={() => { }}
              isMobileLandscape={isMobileLandscape}
            />
          ) : (
            <MovieInfo
              movie_detail={movie_detail}
              onWatchedProgressSaved={() => { }}
              isMobileLandscape={isMobileLandscape}
            />
          )}

          {!hide && (
            <PreviewThumbnail
              activeImage={activeImage || filteredContent[0]?.id}
              setActiveImage={setActiveImage}
              suggestedItems={filteredContent}
              isMobileLandscape={isMobileLandscape}
            />
          )}
        </Box>

        <SubMenu
          sideBarMenuItems={sideBarMenuItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileLandscape={isMobileLandscape}
        />

        {/* Infinite Scroll Loading Indicator */}
        {(saved_movies_pagination.has_more ||
          saved_series_pagination.has_more) && (
            <Box
              ref={loadingRef}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                marginTop: "20px",
              }}>
              {isLoadingMore && (
                <CircularProgress sx={{ color: "#ed2148" }} size={30} />
              )}
            </Box>
          )}
      </Box>
    );
  }

  // Fallback - should never reach here
  return (
    <Box
      width='100%'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <CircularProgress sx={{ color: "#ed2148" }} size={50} />
    </Box>
  );
};

export default SavedMovies;
