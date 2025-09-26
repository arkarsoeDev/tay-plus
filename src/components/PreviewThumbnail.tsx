import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type SubMenuProps = {
  suggestedItems: any[];
  activeImage: number;
  setActiveImage: (index: number) => void;
  isMobileLandscape?: boolean
};

const PreviewThumbnail = ({
  activeImage,
  setActiveImage,
  suggestedItems,
  isMobileLandscape = false
}: SubMenuProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant='h6' component='h6' fontWeight={400} mb='10px' sx={{fontSize: isMobileLandscape ? "14px" : "16px"}}>
        {t(document.title)}
      </Typography>
      <Box width='100%' sx={{ overflowX: "auto" }}>
        <Box display='inline-flex' gap='20px'>
          {suggestedItems.map((item) => (
            <Box
              onClick={() => setActiveImage(item.id)}
              key={item.id}
              width={isMobileLandscape ? 58 : 116}
              height={isMobileLandscape ? 75 : 150}
              border={
                activeImage === item.id
                  ? "3px solid rgba(151, 71, 255, 1)"
                  : "3px solid rgba(151, 71, 255, 0)"
              }
              borderRadius='10px'
              overflow='hidden'
              sx={{ cursor: "pointer" }}>
              <img
                src={item.posters?.find((p: any) => p.poster_type === 1)?.thumbnail_cdn_url}
                width='100%'
                height='100%'
                style={{ objectFit: "cover" }}
                alt=''
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PreviewThumbnail;
