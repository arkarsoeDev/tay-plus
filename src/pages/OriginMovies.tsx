import {
  Box,
  CircularProgress,
  MenuItem,
  MenuList,
  ListItemText,
  Typography,
} from "@mui/material";
import MovieBanner from "../components/MovieBanner";
import MovieInfo from "../components/MovieInfo";
import SerieInfo from "../components/SerieInfo";
import PreviewThumbnail from "../components/PreviewThumbnail";
import full_logo from "../assets/images/iptv-full-logo.png";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import {
  getMovieDetail,
  getSerieDetail,
  getOriginMovies,
  getOriginSeries,
} from "../store/moviesSlice";

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

const OriginMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [
    activeImage,
    setActiveImage,
    _activeTab,
    _setActiveTab,
    selectedParentOrigin,
    _setSelectedChildOrigin,
    _selectedChildOrigin,
    isMobileLandscape,
  ] = useOutletContext<LayoutContext>();

  const {
    origins_movies,
    origins_series,
    movie_detail,
    serie_detail,
    loading,
    movies_pagination,
    series_pagination,
  } = useSelector((state: any) => state.movies);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<
    "movie" | "series"
  >("movie");
  const [hide, setHide] = useState(false);

  // Infinite scroll state
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Function to load more data
  const loadMoreData = useCallback(async () => {
    if (!selectedParentOrigin?.id || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      // Check if we can load more movies
      if (movies_pagination.has_more) {
        await dispatch(
          getOriginMovies({
            limit: 10,
            page: movies_pagination.current_page + 1,
            origin_id: selectedParentOrigin.id,
          })
        );
      }

      // Check if we can load more series
      if (series_pagination.has_more) {
        await dispatch(
          getOriginSeries({
            limit: 10,
            page: series_pagination.current_page + 1,
            origin_id: selectedParentOrigin.id,
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
    selectedParentOrigin?.id,
    movies_pagination,
    series_pagination,
    isLoadingMore,
  ]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && !loading) {
          // Check if we have more data to load
          if (movies_pagination.has_more || series_pagination.has_more) {
            loadMoreData();
          }
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
  }, [
    loadMoreData,
    isLoadingMore,
    loading,
    movies_pagination.has_more,
    series_pagination.has_more,
  ]);

  useEffect(() => {
    if (selectedParentOrigin?.id) {
      // Reset selectedCategory when changing origins
      setSelectedCategory(null);

      // Fetch both movies and series for the same origin
      dispatch(
        getOriginMovies({
          limit: 10,
          page: 1,
          origin_id: selectedParentOrigin?.id,
        })
      );
      dispatch(
        getOriginSeries({
          limit: 10,
          page: 1,
          origin_id: selectedParentOrigin?.id,
        })
      );
    }
  }, [dispatch, selectedParentOrigin]);

  // Custom click handler for submenu items
  const handleSubMenuClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  // Extract movie category keys as submenu items
  const subMenuItems = useMemo<string[]>(() => {
    if (!origins_movies || typeof origins_movies !== "object") {
      return [];
    }

    // Check if we have actual movie data
    const hasMovieData =
      origins_movies.movies &&
      typeof origins_movies.movies === "object" &&
      Object.keys(origins_movies.movies).length > 0;
    const hasSeriesData =
      origins_series?.series &&
      typeof origins_series.series === "object" &&
      Object.keys(origins_series.series).length > 0;

    // If there's no data, return empty array (no submenu will be shown)
    if (!hasMovieData && !hasSeriesData) {
      return [];
    }

    // Extract movie categories from the movies object
    if (hasMovieData) {
      return Object.keys(origins_movies.movies);
    }

    return [];
  }, [origins_movies, origins_series, selectedParentOrigin]);

  // Create hybrid content by alternating movies and series
  const createHybridContent = (movies: any[], series: any[]) => {
    const hybrid = [];
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

  // Get all content from the selected category or all categories if none selected
  const filteredContent = useMemo(() => {
    if (
      !origins_movies ||
      !origins_series ||
      typeof origins_movies !== "object" ||
      typeof origins_series !== "object"
    ) {
      return [];
    }

    // Check if we have actual data
    const hasMovieData =
      origins_movies.movies &&
      typeof origins_movies.movies === "object" &&
      Object.keys(origins_movies.movies).length > 0;
    const hasSeriesData =
      origins_series.series &&
      typeof origins_series.series === "object" &&
      Object.keys(origins_series.series).length > 0;

    if (!hasMovieData && !hasSeriesData) {
      // Return empty array when there's no data
      return [];
    }

    // Extract actual movies and series data
    const movies = hasMovieData ? origins_movies.movies : {};
    const series = hasSeriesData ? origins_series.series : {};

    if (selectedCategory) {
      // Return hybrid content from the selected category
      const categoryMovies = movies[selectedCategory] || [];
      const categorySeries = series[selectedCategory] || [];
      return createHybridContent(categoryMovies, categorySeries);
    } else {
      // Return hybrid content from all categories
      const allMovies = Object.values(movies).flat();
      const allSeries = Object.values(series).flat();
      return createHybridContent(allMovies, allSeries);
    }
  }, [origins_movies, origins_series, selectedCategory]);

  useEffect(() => {
    if (
      activeImage !== null &&
      activeImage !== undefined &&
      !isNaN(Number(activeImage))
    ) {
      // Find the content item by ID to determine its type
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
      } else if (filteredContent.length > 0) {
        // If activeImage doesn't match any item, use the first item
        const firstItem = filteredContent[0];
        setSelectedContentType(firstItem.type);
        if (firstItem.type === "series") {
          dispatch(getSerieDetail(firstItem.id));
        } else {
          dispatch(getMovieDetail(firstItem.id));
        }
      }
    } else if (filteredContent.length > 0) {
      // Handle first item
      const firstItem = filteredContent[0];
      setSelectedContentType(firstItem.type);
      if (firstItem.type === "series") {
        dispatch(getSerieDetail(firstItem.id));
      } else {
        dispatch(getMovieDetail(firstItem.id));
      }
    } else {
      console.error("No filteredContent available");
    }
  }, [dispatch, filteredContent, activeImage]);

  const { originName } = useParams();

  useEffect(() => {
    if (originName) {
      document.title = `${originName[0].toUpperCase()}${originName.slice(
        1
      )} Movies & Series`;
    }
  }, [originName]);

  // Style function matching the original SubMenu component
  const getStyle = (active: boolean) => ({
    height: isMobileLandscape ? 24 : 40,
    px: isMobileLandscape ? "15px" : "30px",
    mr: isMobileLandscape ? "5px" : "10px",
    borderRadius: "6px",
    fontSize: isMobileLandscape ? 14 : 20,
    fontWeight: 400,
    backgroundColor: active ? "rgb(160 80 112)" : "rgba(51, 51, 102, 1)",
    color: "white",
    "&:hover": {
      backgroundColor: active
        ? "rgb(160 80 112 / 60%)"
        : "rgba(51, 51, 102, 0.6)",
      color: "white",
    },
  });

  // Check if we have any content loaded
  const hasContent = filteredContent.length > 0;
  const hasMovieDetail = Object.keys(movie_detail).length > 0;
  const hasSerieDetail = Object.keys(serie_detail).length > 0;
  const isFetchingData = loading || isLoadingMore; // Use global Redux loading state or infinite scroll loading

  // Check if we're in the "no data" state
  const hasMovieData =
    origins_movies?.movies &&
    typeof origins_movies.movies === "object" &&
    Object.keys(origins_movies.movies).length > 0;
  const hasSeriesData =
    origins_series?.series &&
    typeof origins_series.series === "object" &&
    Object.keys(origins_series.series).length > 0;
  const hasNoData = !hasMovieData && !hasSeriesData;

  // Only show "no content" if we're not loading AND we have a selectedParentOrigin but no content
  const hasNoContentAfterFetch =
    !isFetchingData && selectedParentOrigin?.id && hasNoData;

  if (hasNoContentAfterFetch) {
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
          There are no movies or series available for this origin.
        </Typography>
      </Box>
    );
  }

  // Show loading if we're fetching initial data OR if we have content but no details yet
  if (
    // (loading && !isLoadingMore) ||
    !hasContent ||
    (hasContent && !hasMovieDetail && !hasSerieDetail) ||
    (selectedParentOrigin?.id && !hasNoData && !hasContent && !isFetchingData)
  ) {
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

  // Get the appropriate detail and banner image
  // const currentDetail = selectedContentType === 'series' ? serie_detail : movie_detail;
  const bannerImage =
    selectedContentType === "series"
      ? serie_detail?.posters?.[1]?.poster_cdn_url
      : movie_detail?.posters?.[1]?.poster_cdn_url;

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
        width={isMobileLandscape ? 80 : 128}
        style={{
          position: "absolute",
          top: isMobileLandscape ? 10 : 20,
          left: isMobileLandscape ? 20 : 41,
          zIndex: 2,
        }}
      />
      <MovieBanner
        mainImage={bannerImage}
        movieDetail={selectedContentType === "movie" ? movie_detail : undefined}
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

      {/* Custom Submenu - matching original SubMenu design */}
      {!hasNoData && (
        <Box
          width='100%'
          zIndex={2}
          position='relative'
          sx={{ overflowX: "auto" }}>
          <MenuList
            sx={{
              display: "inline-flex",
              mt: isMobileLandscape ? "25px" : "90px",
            }}>
            <MenuItem
              onClick={() => setSelectedCategory(null)}
              sx={getStyle(selectedCategory === null)}>
              <ListItemText
                sx={{ span: { fontSize: isMobileLandscape ? 10 : 16 } }}>
                All
              </ListItemText>
            </MenuItem>
            {subMenuItems.map((category) => (
              <MenuItem
                key={category}
                onClick={() => handleSubMenuClick(category)}
                sx={getStyle(selectedCategory === category)}>
                <ListItemText
                  sx={{ span: { fontSize: isMobileLandscape ? 10 : 16 } }}>
                  {category}
                </ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      )}

      {/* Infinite Scroll Loading Indicator */}
      {(movies_pagination.has_more || series_pagination.has_more) &&
        !hasNoData && (
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
              <CircularProgress sx={{ color: "#A05070" }} size={30} />
            )}
          </Box>
        )}
    </Box>
  );
};

export default OriginMovies;
