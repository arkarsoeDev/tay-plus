import {
  Button,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import logoImg from "../../../assets/images/iptv-logo.png";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleLoginInfo = () => {
    if (loginInfo !== "") {
      navigate("/enter-pin", {
        replace: true,
        state: { phone: loginInfo },
      });
    } else {
      setError("Please enter your phone or email.");
    }
  };

  const [alignment, setAlignment] = useState<string | null>(lang);

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
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
          {t("Please Login")}
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
            {t("Phone No./Email")}
          </FormLabel>

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
            {t("Login")}
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

        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label='language'
          size='small'
          sx={{
            width: 254,
            bgcolor: "#25163A",
            height: 35,
            borderRadius: 3.5,
            color: "#fff",
            ".MuiButtonBase-root.Mui-selected": {
              bgcolor: "#740002",
              color: "#fff",
              borderRadius: 3.5,
            },
            ".MuiButtonBase-root.Mui-selected:hover": {
              bgcolor: "#740002",
              color: "#fff",
              borderRadius: 3.5,
            },
          }}>
          <ToggleButton
            onClick={() => handleChange("en")}
            value='en'
            aria-label='en'
            sx={{
              width: 131,
              color: "#fff",
              fontSize: 16,
              fontWeight: 400,
              textTransform: "capitalize",
            }}
            size='small'>
            🇬🇧 {t("English")}
          </ToggleButton>
          <ToggleButton
            onClick={() => handleChange("mm")}
            value='mm'
            aria-label='mm'
            sx={{
              width: 131,
              color: "#fff",
              fontSize: 16,
              fontWeight: 400,
              textTransform: "capitalize",
            }}
            size='small'>
            🇲🇲 {t("Myanmar")}
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography
          variant='body2'
          color='#fff'
          fontSize={16}
          fontWeight={400}
          mt={4}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}>
          စိတ်အပန်းပြေစေဖို့ရာ Fliks ရှိနေမှ ပြည့်စုံမှာ
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
