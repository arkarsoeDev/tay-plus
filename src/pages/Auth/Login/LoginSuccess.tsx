import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";

const LoginSuccess = () => {
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
          mb={18.5}>
          Login Success
        </Typography>

        <Box width={360} mx='auto'>
          <Button
            component={Link}
            to='/home'
            fullWidth
            variant='contained'
            sx={{
              px: 3,
              bgcolor: "#ed2148",
              height: 48,
              textTransform: "capitalize",
              fontWeight: 700,
            }}>
            Start Watching Movies
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSuccess;
