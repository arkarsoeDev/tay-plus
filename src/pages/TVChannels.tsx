import {
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { getTvChannels } from "../store/moviesSlice";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VideoPlayer from "../components/VideoPlayer";
import { useOutletContext } from "react-router-dom";

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

const TVChannels = () => {
  const [
    _activeImage,
    _setActiveImage,
    _activeTab,
    _setActiveTab,
    _selectedParentOrigin,
    _setSelectedChildOrigin,
    _selectedChildOrigin,
    isMobileLandscape,
  ] = useOutletContext<LayoutContext>();

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { tv_channels, loading } = useSelector((state: any) => state.movies);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    dispatch(getTvChannels({ limit: 12, page: currentPage })).then((res) => {
      // Extract pagination info from response
      if (res.payload?.data?.total) {
        const total = res.payload.data.total;
        const limit = 12;
        const calculatedTotalPages = Math.ceil(total / limit);
        setTotalPages(calculatedTotalPages);
        setTotalItems(total);
      }
    });
  }, [dispatch, currentPage]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box
      mt='30px'
      //  width='100%' height={"calc(100vh - 30px)"} overflow='auto'
      sx={{
        aspectRatio: isMobileLandscape ? "auto" : "16/9",
        width: isMobileLandscape
          ? "calc(100vw - 140px)"
          : "calc(100vw - 280px)",
        height: isMobileLandscape ? "100vh" : "auto", // optional fix
        position: "relative",
        // overflow: "hidden", // ensures no scrollbars
      }}>
      <Typography
        variant='h5'
        component='h3'
        fontSize={isMobileLandscape ? 20 : 32}
        fontWeight={700}
        mb={isMobileLandscape ? "15px" : "30px"}>
        {t("TV Channels")}
      </Typography>

      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='400px'>
          <CircularProgress sx={{ color: "#A05070" }} size={50} />
        </Box>
      ) : (
        <>
          <Grid container mt={isMobileLandscape ? "15px" : "30px"} spacing={3}>
            {tv_channels.map((tv_channel: any) => (
              <Grid
                size={4}
                bgcolor='rgba(0, 0, 0, 1)'
                p='25px'
                onClick={() => {
                  setOpen(true);
                  setSelected(tv_channel);
                }}>
                {/* <Link to={`/channels/${tv_channel.id}`}> */}
                <Box
                  width={92}
                  height={92}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  borderRadius='10px'
                  overflow='hidden'
                  mb='12px'
                  p={1}
                  border='1px solid #ccc'>
                  <img
                    src={`https://api.fliks.com.mm/${tv_channel.channel_image}`}
                    alt={tv_channel.channel_name}
                    width='100%'
                    height='100%'
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant='h3'
                  component='h3'
                  fontSize={isMobileLandscape ? 16 : 24}
                  fontWeight={700}
                  color='rgba(255, 255, 255, 1)'
                  mb='12px'
                  sx={{ wordBreak: "break-all" }}>
                  {tv_channel.channel_name}
                </Typography>
                {/* </Link> */}
                <Typography
                  variant='h4'
                  component='h4'
                  fontSize={isMobileLandscape ? 14 : 20}
                  fontWeight={700}
                  color='#C06080'
                  mb='12px'>
                  {t("Program Schedules")}
                </Typography>
                <Typography
                  variant='h5'
                  component='h5'
                  fontSize={isMobileLandscape ? 12 : 16}
                  fontWeight={400}
                  color='rgba(151, 151, 151, 1)'>
                  {tv_channel.schedule}
                  {/* 07:00 AM - 01:00 PM <br />
            03:00 AM - 11:00 PM */}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display='flex' justifyContent='center' mt={4} mb={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                size='large'
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#A05070",
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(160, 80, 112, 0.3)",
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      <VideoPlayer
        open={open}
        setOpen={setOpen}
        poster={selected.channel_image}
        src={selected.streaming_url}
      />
    </Box>
  );
};

export default TVChannels;
