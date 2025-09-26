import { Button, Box, TextField, Typography, FormLabel } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { register } from "../../../store/authSlice";
import { useTranslation } from "react-i18next";
import { ArrowBack } from "@mui/icons-material";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    phone: "",
    subscriber_id: "",
  });

  const [error, setError] = useState({
    text: "",
    name: "",
    email: "",
    phone: "",
    subscriber_id: "",
  });

  const handleLoginInfo = () => {
    if (
      loginInfo.name !== "" &&
      loginInfo.phone !== "" &&
      loginInfo.email !== "" &&
      loginInfo.subscriber_id !== ""
    ) {
      dispatch(register(loginInfo)).then((res: any) => {
        if (res.payload.success) {
          navigate("/confirm-register-otp", {
            replace: true,
            state: { loginInfo: res.payload.data },
          });
        } else {
          const data = res.payload?.data;
          const duplicateSubscriberID =
            res.payload.message === "Duplicate subscriber ID!"
              ? "Duplicate subscriber ID!"
              : "";
          const duplicateEmail =
            res.payload?.message === "Duplicate phone or email!"
              ? "Duplicate phone or email!"
              : "";

          setError((prev) => ({
            ...prev,
            email: (data?.email ? data?.email?.[0] : duplicateEmail) || "",
            name: data?.name?.[0] || "",
            phone: duplicateEmail || "",
            subscriber_id: duplicateSubscriberID || "",
            text: "",
          }));
        }
      });
    } else {
      setError({ ...error, text: "Please enter your required fields." });
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
        <ArrowBack sx={{ mr: 1 }} />
        {t("Back")}
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
          {t("Sign Up with Your Phone or Email")}
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
            {t("Name")}
          </FormLabel>

          <TextField
            fullWidth
            variant='outlined'
            sx={{
              mb: 2,
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
            value={loginInfo.name}
            onChange={(e) => {
              setLoginInfo({
                ...loginInfo,
                name: e.target.value,
              });
              if (error.name) setError({ ...error, name: "" });
            }}
            onFocus={() => {
              if (error.name) setError({ ...error, name: "" });
            }}
            error={
              (error.name === "" &&
                error.text !== "" &&
                loginInfo.name === "") ||
              error.name !== ""
            }
            helperText={
              (error.name === "" && error.text !== "" && loginInfo.name === ""
                ? error.text
                : "") || (error.name !== "" ? error.name : "")
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
            {t("Email")}
          </FormLabel>

          <TextField
            fullWidth
            variant='outlined'
            sx={{
              mb: 2,
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
            value={loginInfo.email}
            onChange={(e) => {
              setLoginInfo({
                ...loginInfo,
                email: e.target.value,
              });
              if (error.email) setError({ ...error, email: "" });
            }}
            onFocus={() => {
              if (error.email) setError({ ...error, email: "" });
            }}
            error={
              (error?.email === "" &&
                error?.text !== "" &&
                loginInfo.email === "") ||
              error?.email !== ""
            }
            helperText={
              (error?.email === "" &&
                error?.text !== "" &&
                loginInfo.email === ""
                ? error?.text
                : "") || (error?.email !== "" ? error?.email : "")
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
            {t("Phone No")}.
          </FormLabel>

          <TextField
            fullWidth
            variant='outlined'
            sx={{
              mb: 2,
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
            value={loginInfo.phone}
            onChange={(e) => {
              setLoginInfo({
                ...loginInfo,
                phone: e.target.value,
              });
              if (error.phone) setError({ ...error, phone: "" });
            }}
            onFocus={() => {
              if (error.phone) setError({ ...error, phone: "" });
            }}
            error={
              (error.phone === "" &&
                error.text !== "" &&
                loginInfo.phone === "") ||
              error.phone !== ""
            }
            helperText={
              (error.phone === "" && error.text !== "" && loginInfo.phone === ""
                ? error.text
                : "") || (error.phone !== "" ? error.phone : "")
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
            {t("Internet Subscriber ID")}
          </FormLabel>

          <TextField
            fullWidth
            variant='outlined'
            sx={{
              mb: 8,
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
            value={loginInfo.subscriber_id}
            onChange={(e) => {
              setLoginInfo({
                ...loginInfo,
                subscriber_id: e.target.value,
              });
              if (error.subscriber_id)
                setError({ ...error, subscriber_id: "" });
            }}
            onFocus={() => {
              if (error.subscriber_id)
                setError({ ...error, subscriber_id: "" });
            }}
            error={
              (error.subscriber_id === "" &&
                error.text !== "" &&
                loginInfo.subscriber_id === "") ||
              error.subscriber_id !== ""
            }
            helperText={
              (error.subscriber_id === "" &&
                error.text !== "" &&
                loginInfo.subscriber_id === ""
                ? error.text
                : "") || (error.subscriber_id !== "" ? error.subscriber_id : "")
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
            {t("Create Account")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
