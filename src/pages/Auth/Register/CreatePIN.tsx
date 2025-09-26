import { Button, Box, TextField, Typography, FormLabel } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { registerPassword } from "../../../store/authSlice";
import { useTranslation } from "react-i18next";

const CreatePIN = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [loginInfo, setLoginInfo] = useState({
    customer_id: location.state?.loginInfo.customer.id,
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleLoginInfo = () => {
    if (
      loginInfo.password !== "" &&
      loginInfo.confirm_password !== "" &&
      loginInfo.password === loginInfo.confirm_password &&
      loginInfo.password.length >= 6
    ) {
      dispatch(registerPassword(loginInfo)).then((res: any) => {
        if (res.payload.success) {
          navigate("/login", {
            replace: true,
            state: { loginInfo: res.payload.data },
          });
        }
      });
    } else if (loginInfo.password !== loginInfo.confirm_password) {
      setError("Please enter same PIN number.");
    } else if (loginInfo.password.length < 6) {
      setError("Please enter 6 digit PIN number.");
    } else {
      setError("Please enter correct PIN number.");
    }
  };

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
          {t("Create PIN for Your Account")}
        </Typography>

        <Box width={360} mx='auto' textAlign='left'>
          <FormLabel
            required
            sx={{
              color: "#fff",
              fontWeight: 400,
              fontSize: 14,
              mb: 0.5,
              display: "inline-block",
            }}>
            {t("Enter your 6 digit PIN")}
          </FormLabel>

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
          />

          <FormLabel
            required
            sx={{
              color: "#fff",
              fontWeight: 400,
              fontSize: 14,
              mb: 0.5,
              display: "inline-block",
            }}>
            {t("Re-Enter again")}
          </FormLabel>

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
            value={loginInfo.confirm_password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, confirm_password: e.target.value })
            }
            error={
              (error !== "" &&
                error !== null &&
                loginInfo.confirm_password === "") ||
              (error !== "" && error !== null)
            }
            helperText={
              (error !== "" &&
                error !== null &&
                loginInfo.confirm_password === ""
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
            {t("Confirm")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePIN;
