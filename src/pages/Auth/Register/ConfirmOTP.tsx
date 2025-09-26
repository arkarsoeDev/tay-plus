import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { verificationCode } from "../../../store/authSlice";
import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";

const ConfirmOTP = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [loginInfo, setLoginInfo] = useState({
    customer_id: location.state?.loginInfo.customer_id,
    last_otp: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleLoginInfo = () => {
    if (loginInfo.last_otp !== "") {
      dispatch(verificationCode(loginInfo)).then((res: any) => {
        if (res.payload.success) {
          navigate("/create-pin", {
            replace: true,
            state: { loginInfo: res.payload.data },
          });
        } else {
          setError(res.payload.message);
        }
      })
    } else {
      setError("Please enter correct OTP code.");
    }
  };

  return (
    <Box m='auto'>
      <Button
        component={Link}
        to='/register'
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
        <ArrowBack sx={{ mr: 1 }} />{t("Back")}
      </Button>
      <Box p={4} mx='auto' width={390} textAlign='center' zIndex={1}>
        <img src={logoImg} height={128} alt='' />

        <Typography
          variant='body2'
          color='#fff'
          fontSize={20}
          fontWeight={700}
          mt={6}
          mb={5}>
          {t("OTP Verification")}
        </Typography>

        <Typography
          variant='body2'
          color='#fff'
          fontSize={16}
          fontWeight={400}
          mb={4}>
          {t("A 4-digit OTP code was sent via SMS.")} <br /> {t("Please re-enter the OTP code below.")}
        </Typography>

        <Box width={360} mx='auto' textAlign='left'>
          <TextField
            fullWidth
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
            value={loginInfo.last_otp}
            onChange={(e) => {
              setLoginInfo({
                ...loginInfo,
                last_otp: e.target.value,
              });
              if (error) setError("");
            }}
            onFocus={() => {
              if (error) setError("");
            }}
            error={
              (error !== "" && error !== null && loginInfo.last_otp === "") ||
              (error !== "" && error !== null)
            }
            helperText={
              (error !== "" && error !== null && loginInfo.last_otp === ""
                ? error
                : "") || (error !== "" && error !== null ? error : "")
            }
          />

          <Button
            onClick={handleLoginInfo}
            fullWidth
            variant='contained'
            sx={{
              px: 6,
              bgcolor: "#ed2148",
              height: 48,
              textTransform: "capitalize",
              fontWeight: 700,
            }}>
            {t("Confirm OTP Code")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmOTP;
