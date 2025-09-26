import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useTranslation } from "react-i18next";

const ResetSuccess = () => {
  const { t } = useTranslation();
  return (
    <Box m='auto'>
      <Box p={4} mx='auto' width={390} textAlign='center' zIndex={1}>
        <img src={logoImg} height={128} alt='' />

        <Typography
          variant='body2'
          color='#fff'
          fontSize={20}
          fontWeight={600}
          mt={6}
          mb={8.5}>
          {t("PIN has successfully reset")}
        </Typography>

        <Typography
          variant='body2'
          color='#fff'
          fontSize={16}
          fontWeight={400}
          mb={4}>
          {t("Now, you can enjoy watching movies.")}
        </Typography>

        <Box width={360} mx='auto' textAlign='left'>
          <Button
            component={Link}
            to='/login'
            fullWidth
            variant='contained'
            sx={{
              px: 6,
              bgcolor: "#A05070",
              height: 48,
              textTransform: "capitalize",
              fontWeight: 700,
            }}>
            {t("OK")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetSuccess;
