import { Button, Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import type { AppDispatch } from "../../../store";
import { login } from "../../../store/authSlice";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";

const EnterPin = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    phone: location.state?.phone,
    password: "",
    device_token: "123",
  });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (
      loginInfo.phone !== "" &&
      loginInfo.password !== "" &&
      loginInfo.device_token !== ""
    ) {
      dispatch(login(loginInfo)).then((res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/", { replace: true });
        } else if (res.meta.requestStatus === "rejected") {
          setError(res.payload.message);
        }
      });
    } else {
      setError("Please enter correct PIN number.");
    }
  };

  useEffect(() => {
    if (!location.state?.phone) {
      navigate("/login", { replace: true });
    }
  }, [location.state?.phone, navigate]);

  return (
    <Box m='auto'>
      <Button
        component={Link}
        to='/login'
        variant='text'
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
          textTransform: "capitalize",
        }}>
        <ArrowBack sx={{ mr: 1 }} />
        {t("Back")}
      </Button>
      <Box p={4} mx='auto' width={390} textAlign='center' zIndex={1}>
        <img src={logoImg} height={128} alt='' />

        <Typography
          variant='body2'
          color='#fff'
          fontSize={20}
          fontWeight={600}
          mt={6}
          mb={8.5}>
          {t("Please Enter Your PIN number")}
        </Typography>

        <Box width={360} mx='auto' textAlign='left'>
          <TextField
            fullWidth
            type='password'
            variant='outlined'
            sx={{
              mb: 4,
              input: {
                fontSize: 20,
                py: 1,
                color: "#040000",
                height: 32,
                borderColor: "#000",
                bgcolor: "#aaa",
                borderRadius: 1.5,
              },
            }}
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            error={
              (error !== "" && error !== null && loginInfo.password === "") ||
              (error !== "" && error !== null)
            }
            helperText={
              (error !== "" && error !== null && loginInfo.password === ""
                ? error
                : "") || (error !== "" && error !== null ? error : "")
            }
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     handleLogin();
          //   }
          // }}
          />

          <Button
            fullWidth
            variant='contained'
            sx={{
              px: 6,
              bgcolor: "#A05070",
              height: 48,
              textTransform: "capitalize",
              fontWeight: 700,
            }}
            onClick={handleLogin}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}>
            {t("Continue")}
          </Button>
        </Box>

        <Typography
          component={Link}
          to='/check-phone'
          variant='body2'
          display='block'
          color='#fff'
          fontSize={16}
          fontWeight={400}
          mt={8}
          mb={3.5}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}>
          {t("Forgot your PIN? Recover your PIN")}
        </Typography>
        <Typography
          component={Link}
          to='/register'
          variant='body2'
          display='block'
          color='#fff'
          fontSize={16}
          fontWeight={400}
          mb={7}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}>
          {t("Don’t have an account yet? Sign up now.")}
        </Typography>
      </Box>
    </Box>
  );
};

export default EnterPin;
