import { Box, CircularProgress, Typography } from "@mui/material";
import MovieBanner from "../components/MovieBanner";
import MovieInfo from "../components/MovieInfo";
import SubMenu from "../components/SubMenu";
import PreviewThumbnail from "../components/PreviewThumbnail";
import full_logo from "../assets/images/iptv-full-logo.png";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import {
  getMovieDetail,
  getNewArrivalMovies,
  getSuggestedMovies,
  getTrendingMovies,
  getTrendingSeries,
  getRandomMovies,
  getNewArrivalSeries,
  getSuggestedSeries,
  getTvSeries,
  getSerieDetail,
  clearAllDetails,
} from "../store/moviesSlice";
import SerieInfo from "../components/SerieInfo";

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

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
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

  const sideBarMenuItems = [
    { name: "Trending", url: "/trending" },
    { name: "New Arrival", url: "/new-arrival" },
    { name: "Saved Movies", url: "/saved-movies" },
  ];

  const {
    random_movies,
    tv_series,
    suggested_movies,
    suggested_series,
    trending_movies,
    trending_series,
    new_arrival_movies,
    new_arrival_series,
    movie_detail,
    serie_detail,
    loading,
    // Pagination states
    trending_movies_pagination,
    trending_series_pagination,
    new_arrival_movies_pagination,
    suggested_movies_pagination,
    new_arrival_series_pagination,
    suggested_series_pagination,
    series_pagination,
  } = useSelector((state: any) => state.movies);

  const [hide, setHide] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<
    "movie" | "series"
  >("movie");

  // Pagination state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

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

  // Get current page data based on location
  const currentPageData = useMemo(() => {
    if (location.pathname === "/") {
      const fallbackToRandom = suggested_movies.length === 0;
      return {
        movies: fallbackToRandom ? random_movies : suggested_movies,
        series: fallbackToRandom ? tv_series : suggested_series,
        fetchMovies: fallbackToRandom ? getRandomMovies : getSuggestedMovies,
        fetchSeries: fallbackToRandom ? getTvSeries : getSuggestedSeries,
        moviesPagination: fallbackToRandom ? null : suggested_movies_pagination,
        seriesPagination: fallbackToRandom
          ? series_pagination
          : suggested_series_pagination,
      };
    }

    switch (location.pathname) {
      case "/trending":
        return {
          movies: trending_movies,
          series: trending_series, // Now includes trending series
          fetchMovies: getTrendingMovies,
          fetchSeries: getTrendingSeries,
          moviesPagination: trending_movies_pagination,
          seriesPagination: trending_series_pagination,
        };
      case "/new-arrival":
        return {
          movies: new_arrival_movies,
          series: new_arrival_series,
          fetchMovies: getNewArrivalMovies,
          fetchSeries: getNewArrivalSeries,
          moviesPagination: new_arrival_movies_pagination,
          seriesPagination: new_arrival_series_pagination,
        };
      default:
        return {
          movies: new_arrival_movies,
          series: new_arrival_series,
          fetchMovies: getNewArrivalMovies,
          fetchSeries: getNewArrivalSeries,
          moviesPagination: new_arrival_movies_pagination,
          seriesPagination: new_arrival_series_pagination,
        };
    }
  }, [
    location.pathname,
    random_movies,
    tv_series,
    suggested_movies,
    suggested_series,
    trending_movies,
    trending_series,
    new_arrival_movies,
    new_arrival_series,
    suggested_movies_pagination,
    suggested_series_pagination,
    trending_movies_pagination,
    trending_series_pagination,
    new_arrival_movies_pagination,
    new_arrival_series_pagination,
    series_pagination,
  ]);

  // Get all content (hybrid)
  const filteredContent = useMemo(() => {
    return createHybridContent(currentPageData.movies, currentPageData.series);
  }, [currentPageData.movies, currentPageData.series]);

  // Function to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      // Load more movies if there are more pages
      if (currentPageData.moviesPagination?.has_more) {
        await dispatch(
          currentPageData.fetchMovies({
            page: currentPageData.moviesPagination.current_page + 1,
            limit: 10,
          })
        );
      }

      // Load more series if there are more pages and fetchSeries exists
      if (
        currentPageData.seriesPagination?.has_more &&
        currentPageData.fetchSeries
      ) {
        await dispatch(
          currentPageData.fetchSeries({
            page: currentPageData.seriesPagination.current_page + 1,
            limit: 10,
          })
        );
      }
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [dispatch, isLoadingMore, currentPageData]);

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
    const fetchData = async () => {
      await dispatch(currentPageData.fetchMovies({ limit: 10, page: 1 }));

      if (currentPageData.fetchSeries) {
        await dispatch(currentPageData.fetchSeries({ limit: 10, page: 1 }));
      }

      // Fallback for home page if no suggested content
      if (location.pathname === "/") {
        const result = await dispatch(
          getSuggestedMovies({ limit: 10, page: 1 })
        );
        const result2 = await dispatch(
          getSuggestedSeries({ limit: 10, page: 1 })
        );

        if (
          result?.payload?.data?.suggest_movies?.length === 0 &&
          result2?.payload?.data?.suggest_series?.length === 0
        ) {
          dispatch(getRandomMovies({ limit: 10, page: 1 }));
          dispatch(getTvSeries({ limit: 10, page: 1 }));
        }
      }
    };

    fetchData();
  }, [dispatch, location.pathname]);

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
        // If the activeImage item is not found in filteredContent, reset to first available item
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

  // Clear detail data when content changes
  useEffect(() => {
    if (filteredContent.length === 0) {
      dispatch(clearAllDetails());
    }
  }, [filteredContent, dispatch]);

  // Check if we have any content
  const hasContent = filteredContent.length > 0;

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
          No Content Available
        </Typography>
        <Typography variant='body1'>
          No movies or series found for this category.
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
        }}
      // width={
      //   isMobileLandscape ? "calc(100vw - 140px)" : "calc(100vw - 280px)"
      // }
      // position='relative'>
      >
        <img
          src={full_logo}
          width={isMobileLandscape ? 80 : 128}
          style={{
            position: "absolute",
            top: isMobileLandscape ? 10 : 20,
            left: isMobileLandscape ? 20 : 41,
            zIndex: 2,
          }}
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
        {(currentPageData.moviesPagination?.has_more ||
          currentPageData.seriesPagination?.has_more) && (
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

export default Movies;
