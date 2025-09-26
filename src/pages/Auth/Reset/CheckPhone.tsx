import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { resetPassword } from "../../../store/authSlice";
import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";

const CheckPhone = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loginInfo, setLoginInfo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCheckPhone = () => {
    if (loginInfo !== "") {
      dispatch(resetPassword({ phone: loginInfo })).then((res: any) => {
        if (res.payload.success) {
          navigate("/confirm-otp", {
            replace: true,
            state: { customer_id: res.payload.data.customer_id },
          });
        } else {
          setError(res.payload.message === "There is no input data!" ? "Please enter correct phone or email" : res.payload.message);
        }
      })
    } else {
      setError("Please enter your phone or email.");
    }
  };

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
        <ArrowBack sx={{ mr: 1 }} />{t("Back")}
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
          {t("Please Enter Your Phone Number")} <br /> {t("or Email to recover your PIN")}
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
            value={loginInfo}
            onChange={(e) => {
              setLoginInfo(e.target.value);
              if (error) setError("");
            }}
            onFocus={() => {
              if (error) setError("");
            }}
            error={
              (error !== "" && error !== null && loginInfo === "") ||
              (error !== "" && error !== null)
            }
            helperText={
              (error !== "" && error !== null && loginInfo === ""
                ? error
                : "") || (error !== "" && error !== null ? error : "")
            }
          />

          <Button
            fullWidth
            variant='contained'
            sx={{
              px: 6,
              bgcolor: "#ed2148",
              height: 48,
              textTransform: "capitalize",
              fontWeight: 700,
            }}
            onClick={handleCheckPhone}
          >
            {t("Recover")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckPhone;
