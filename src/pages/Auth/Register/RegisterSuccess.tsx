import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box m='auto'>
      <Box p={4} mx='auto' width={390} textAlign='center' zIndex={1}>
        <img src={logoImg} height={128} alt='' />

        <Typography
          variant='body2'
          color='#fff'
          fontSize={20}
          fontWeight={700}
          mt={6}
          mb={5}>
          Congratulation!
        </Typography>

        <Typography
          variant='body2'
          color='#fff'
          fontSize={16}
          fontWeight={400}
          mb={4}>
          You have successfully sign up.
        </Typography>

        <Box width={360} mx='auto' textAlign='left'>
          <Button
            onClick={() => navigate("/login", { replace: true })}
            fullWidth
            variant='contained'
            sx={{
              px: 6,
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

export default RegisterSuccess;
