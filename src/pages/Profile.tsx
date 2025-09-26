import { Close, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { changePassword, logout, updateProfile } from "../store/authSlice";
import profileImg from "../assets/images/suggested/s01.jpg";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { deleteSubAccount } from "../store/authSlice";

type LayoutContext = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  any, // selectedParentOrigin is of type any, not SubMenuItem
  any, // selectedParentOrigin is of type any, not SubMenuItem
  any, // selectedParentOrigin is of type any, not SubMenuItem
  boolean // isMobileLandscape
];

const Profile = () => {
  const [
    _activeImage,
    _setActiveImage,
    _activeTab,
    _setActiveTab,
    _selectedParentOrigin,
    _setSelectedChildOrigin,
    _selectedChildOrigin,
    isMobileLandscape,
  ] = useOutletContext<LayoutContext>();

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const customerInfo = JSON.parse(Cookies.get("customerInfo") || "{}");
  const [openChangeInfoModal, setOpenChangeInfoModal] = useState(false);
  const [openChangePinModal, setOpenChangePinModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: customerInfo.customer_name || "",
    email: customerInfo.customer_email || "",
    phone: customerInfo.customer_phone || "",
    profile: customerInfo.customer_profile || "",
  });
  const [loginInfo, setLoginInfo] = useState({
    current_password: "",
    new_password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [infoError, setInfoError] = useState({
    text: "",
    name: "",
    email: "",
    phone: "",
  });

  const [alignment, setAlignment] = useState<string | null>(lang);

  const handleChangeInfo = () => {
    if (
      (userInfo.name !== "" && userInfo.email !== "", userInfo.phone !== "")
    ) {
      dispatch(updateProfile(userInfo)).then((res: any) => {
        if (res.payload.success) {
          setOpenChangeInfoModal(false);
          Cookies.set(
            "customerInfo",
            JSON.stringify(res.payload.data.customer)
          );
        } else {
          const data = res.payload?.data;
          const duplicateEmail =
            res.payload?.message === "Duplicate phone or email!"
              ? "Duplicate phone or email!"
              : "";

          setInfoError((prev) => ({
            ...prev,
            email: (data?.email ? data?.email?.[0] : duplicateEmail) || "",
            name: data?.name?.[0] || "",
            phone: duplicateEmail || "",
            text: "",
          }));
        }
      });
    } else {
      setInfoError({
        ...infoError,
        text: "Please enter your required fields.",
      });
    }
  };

  const handleChangePassword = () => {
    if (loginInfo.current_password !== "" && loginInfo.new_password !== "") {
      dispatch(changePassword(loginInfo)).then((res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          setOpenChangePinModal(false);
        } else if (res.meta.requestStatus === "rejected") {
          setError(res.payload.message);
        }
      });
    } else {
      setError("Please enter correct PIN number.");
    }
  };

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
    <Box
      pt='30px'
      sx={{
        aspectRatio: isMobileLandscape ? "auto" : "16/9",
        width: isMobileLandscape
          ? "calc(100vw - 140px)"
          : "calc(100vw - 280px)",
        height: isMobileLandscape ? "100vh" : "auto", // optional fix
        position: "relative",
        // overflow: "hidden", // ensures no scrollbars
      }}>
      <Typography
        variant='h5'
        component='h3'
        fontSize={isMobileLandscape ? 20 : 32}
        fontWeight={700}
        mb='30px'>
        {t("Your Profile")}
      </Typography>
      <Avatar
        sx={{
          width: 107,
          height: 107,
          border: "1px solid rgba(72, 128, 255, 1)",
        }}
        src={customerInfo?.customer_profile}
      />
      <Typography
        variant='h5'
        component='h5'
        fontSize={isMobileLandscape ? 16 : 20}
        fontWeight={400}
        mt='26px'>
        {customerInfo?.customer_phone}
      </Typography>

      <Grid container my='30px' spacing={3}>
        <Grid container size={{ sm: 10, md: 7 }}>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 16}
              fontWeight={400}
              color='#ed2148'>
              {t("Name")}
            </Typography>
          </Grid>
          <Grid size={{ sm: 6, md: 3 }}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={400}>
              {customerInfo?.customer_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container size={{ sm: 10, md: 7 }}>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 16}
              fontWeight={400}
              color='#ed2148'>
              {/* Date of Birth */}
              {t("Phone")}
            </Typography>
          </Grid>
          <Grid size={{ sm: 6, md: 3 }}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={400}>
              {customerInfo?.customer_phone || "N/A"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container size={{ sm: 10, md: 7 }}>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 16}
              fontWeight={400}
              color='#ed2148'>
              {t("Email")}
            </Typography>
          </Grid>
          <Grid size={{ sm: 6, md: 3 }}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={400}>
              {customerInfo?.customer_email || "N/A"}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container size={12}>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 16}
              fontWeight={400}
              color='#ed2148'>
              Township
            </Typography>
          </Grid>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={400}>
              {customerInfo?.township || "N/A"}
            </Typography>
          </Grid>
        </Grid> */}
        <Grid size={{ sm: 10, md: 7 }} mt='6px' mb='22px'>
          <Button
            onClick={() => setOpenChangeInfoModal(true)}
            variant='contained'
            color='primary'
            sx={{
              width: isMobileLandscape ? 160 : 245,
              height: isMobileLandscape ? 28 : 48,
              textTransform: "capitalize",
              fontSize: isMobileLandscape ? 12 : 16,
              fontWeight: 700,
              bgcolor: "#ed2148",
            }}>
            {t("Edit Profile")}
          </Button>
          <Divider sx={{ mt: "23px", borderColor: "rgba(51, 51, 102, 1)" }} />
        </Grid>
        <Grid container size={{ sm: 10, md: 7 }}>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 16}
              fontWeight={400}
              color='#ed2148'>
              {t("PIN Number")}
            </Typography>
          </Grid>
          <Grid size={9}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={400}>
              *********
            </Typography>
          </Grid>
        </Grid>

        <Grid size={{ sm: 10, md: 7 }} mt='14px'>
          <Button
            onClick={() => setOpenChangePinModal(true)}
            variant='contained'
            color='primary'
            sx={{
              width: isMobileLandscape ? 160 : 245,
              height: isMobileLandscape ? 28 : 48,
              textTransform: "capitalize",
              fontSize: isMobileLandscape ? 12 : 16,
              fontWeight: 700,
              bgcolor: "#ed2148",
            }}>
            {t("Change PIN")}
          </Button>
          <Divider sx={{ mt: "23px", borderColor: "rgba(51, 51, 102, 1)" }} />
        </Grid>

        <Grid container size={{ sm: 10, md: 7 }}>
          <Grid size={3}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 16}
              fontWeight={400}
              color='#ed2148'>
              {t("Language Setting")}
            </Typography>
          </Grid>
          <Grid size={9}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label='language'
              size='small'
              sx={{
                width: 200,
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
                  width: 100,
                  color: "#fff",
                  fontSize: isMobileLandscape ? 12 : 16,
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
                size='small'>
                {t("English")}
              </ToggleButton>
              <ToggleButton
                onClick={() => handleChange("mm")}
                value='mm'
                aria-label='mm'
                sx={{
                  width: 100,
                  color: "#fff",
                  fontSize: isMobileLandscape ? 12 : 16,
                  fontWeight: 400,
                  textTransform: "capitalize",
                }}
                size='small'>
                {t("Myanmar")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        <Grid size={{ sm: 10, md: 7 }} mt='14px'>
          <Divider sx={{ mb: "23px", borderColor: "rgba(51, 51, 102, 1)" }} />
          <Button
            onClick={() => {
              dispatch(logout()).then(() => navigate("/login"));
            }}
            variant='contained'
            color='primary'
            sx={{
              width: isMobileLandscape ? 160 : 245,
              height: isMobileLandscape ? 28 : 48,
              textTransform: "capitalize",
              fontSize: isMobileLandscape ? 12 : 16,
              fontWeight: 700,
              bgcolor: "#ed2148",
            }}>
            {t("Log Out")}
          </Button>
          <Divider sx={{ mt: "23px", borderColor: "rgba(51, 51, 102, 1)" }} />
        </Grid>

        <Grid container size={{ sm: 10, md: 7 }}>
          <Grid size={12}>
            <Typography
              variant='h5'
              component='h5'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={400}
              color='#ffffff'>
              {t("Sub Profiles")}
            </Typography>
          </Grid>
          <Grid
            container
            size={12}
            border={"1px solid #222222"}
            borderRadius={1}
            p={2}>
            <Grid size={{ md: 2, lg: 3 }}>
              <Box
                overflow='hidden'
                borderRadius={1}
                border='1px solid #ed2148'
                width={92}
                height={92}>
                <img
                  src={profileImg}
                  width='100%'
                  height='100%'
                  style={{ objectFit: "cover" }}
                  alt=''
                />
              </Box>
            </Grid>
            <Grid size={{ md: 8, lg: 7 }}>
              <Typography
                variant='h5'
                component='h5'
                fontSize={isMobileLandscape ? 14 : 16}
                fontWeight={600}>
                WYP Sub Acc
              </Typography>
              <Typography
                variant='h5'
                component='h5'
                fontSize={15}
                fontWeight={400}
                color='#979797'
                my={1}>
                Sub Account
              </Typography>
              <Typography
                variant='h5'
                component='h5'
                fontSize={14}
                fontWeight={400}
                color='#979797'>
                0987654321
              </Typography>
            </Grid>
            <Grid
              size={2}
              display='flex'
              alignItems='center'
              justifyContent='end'>
              <IconButton
                onClick={() => setOpenDeleteModal(true)}
                sx={{ color: "#555555" }}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        maxWidth='xs'
        fullWidth
        sx={{
          boxShadow: "none",
          ".MuiPaper-root": {
            width: "auto",
            bgcolor: "#0C0C2B",
            borderRadius: 3,
          },
        }}>
        <DialogContent sx={{ position: "relative", p: 5, m: "auto" }}>
          <Box mx='auto' textAlign='left'>
            <Typography
              variant='body2'
              color='#fff'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={600}
              mb={5}>
              {t("Are you want to remove this sub profile?")}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Button
              onClick={() => setOpenDeleteModal(false)}
              variant='contained'
              color='primary'
              sx={{
                width: 120,
                height: isMobileLandscape ? 28 : 48,
                textTransform: "capitalize",
                fontSize: isMobileLandscape ? 12 : 16,
                fontWeight: 700,
                bgcolor: "#555555",
              }}>
              {t("Cancel")}
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteSubAccount(3));
                setOpenDeleteModal(false);
              }}
              variant='contained'
              color='primary'
              sx={{
                width: 120,
                height: isMobileLandscape ? 28 : 48,
                textTransform: "capitalize",
                fontSize: isMobileLandscape ? 12 : 16,
                fontWeight: 700,
                bgcolor: "#C00000",
              }}>
              {t("Delete")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openChangeInfoModal}
        onClose={() => {
          setOpenChangeInfoModal(false);
          setInfoError({
            email: "",
            name: "",
            phone: "",
            text: "",
          });
        }}
        maxWidth='xs'
        fullWidth
        sx={{
          boxShadow: "none",
          ".MuiPaper-root": {
            width: "auto",
            bgcolor: "#0C0C2B",
            borderRadius: 3,
          },
        }}>
        <DialogContent
          sx={{ position: "relative", p: 5, m: "auto", display: "flex" }}>
          <IconButton
            onClick={() => {
              setOpenChangeInfoModal(false);
              setInfoError({
                email: "",
                name: "",
                phone: "",
                text: "",
              });
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "#fff",
            }}>
            <Close />
          </IconButton>

          <Box mx='auto' textAlign='left'>
            <Typography
              variant='body2'
              color='#fff'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={600}
              mb={3}>
              {t("Update Your Account Info")}
            </Typography>

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
              value={userInfo.name}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                });
                if (infoError.name) setInfoError({ ...infoError, name: "" });
              }}
              onFocus={() => {
                if (infoError) setInfoError({ ...infoError, name: "" });
              }}
              error={
                (infoError.name === "" &&
                  infoError.text !== "" &&
                  userInfo.name === "") ||
                infoError.name !== ""
              }
              helperText={
                (infoError.name === "" &&
                  infoError.text !== "" &&
                  userInfo.name === ""
                  ? infoError.text
                  : "") || (infoError.name !== "" ? infoError.name : "")
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
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
                if (infoError.email) setInfoError({ ...infoError, email: "" });
              }}
              onFocus={() => {
                if (infoError.email) setInfoError({ ...infoError, email: "" });
              }}
              error={
                (infoError.email === "" &&
                  infoError.text !== "" &&
                  userInfo.email === "") ||
                infoError.email !== ""
              }
              helperText={
                (infoError.email === "" &&
                  infoError.text !== "" &&
                  userInfo.email === ""
                  ? infoError.text
                  : "") || (infoError.email !== "" ? infoError.email : "")
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
              {t("Phone")}
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
              value={userInfo.phone}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  phone: e.target.value,
                });
                if (infoError.phone) setInfoError({ ...infoError, phone: "" });
              }}
              onFocus={() => {
                if (infoError.phone) setInfoError({ ...infoError, phone: "" });
              }}
              error={
                (infoError.phone === "" &&
                  infoError.text !== "" &&
                  userInfo.phone === "") ||
                infoError.phone !== ""
              }
              helperText={
                (infoError.phone === "" &&
                  infoError.text !== "" &&
                  userInfo.phone === ""
                  ? infoError.text
                  : "") || (infoError.phone !== "" ? infoError.phone : "")
              }
            />

            {/* <FormLabel
              required
              sx={{
                color: "#fff",
                fontWeight: 400,
                fontSize: 14,
                mb: 0.5,
                display: "inline-block",
              }}>
              Profile Image
            </FormLabel> */}
            {/* <TextField
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
              value={loginInfo.profile}
              onChange={(e) => {
                setLoginInfo({
                  ...loginInfo,
                  profile: e.target.value,
                });
                if (error) setError("");
              }}
              onFocus={() => {
                if (error) setError("");
              }}
              error={
                (error !== "" && error !== null && loginInfo.profile === "") ||
                (error !== "" && error !== null)
              }
              helperText={
                (error !== "" && error !== null && loginInfo.profile === ""
                  ? error
                  : "") || (error !== "" && error !== null ? error : "")
              }
            /> */}

            <Button
              fullWidth
              variant='contained'
              sx={{
                px: 6,
                bgcolor: "#ed2148",
                height: isMobileLandscape ? 28 : 48,
                textTransform: "capitalize",
                fontWeight: 700,
              }}
              onClick={handleChangeInfo}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChangeInfo();
                }
              }}>
              {t("Confirm")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openChangePinModal}
        onClose={() => {
          setOpenChangePinModal(false);
          setError("");
        }}
        maxWidth='xs'
        fullWidth
        sx={{
          boxShadow: "none",
          ".MuiPaper-root": {
            width: "auto",
            bgcolor: "#0C0C2B",
            borderRadius: 3,
          },
        }}>
        <DialogContent
          sx={{ position: "relative", p: 5, m: "auto", display: "flex" }}>
          <IconButton
            onClick={() => {
              setOpenChangePinModal(false);
              setError("");
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "#fff",
            }}>
            <Close />
          </IconButton>

          <Box mx='auto' textAlign='left'>
            <Typography
              variant='body2'
              color='#fff'
              fontSize={isMobileLandscape ? 14 : 18}
              fontWeight={600}
              mb={3}>
              {t("Change New PIN for Your Account")}
            </Typography>

            <FormLabel
              required
              sx={{
                color: "#fff",
                fontWeight: 400,
                fontSize: 14,
                mb: 0.5,
                display: "inline-block",
              }}>
              {t("Enter your old PIN")}
            </FormLabel>
            <TextField
              fullWidth
              type='password'
              variant='outlined'
              sx={{
                mb: 3.3,
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
              value={loginInfo.current_password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, current_password: e.target.value })
              }
              error={
                (error !== "" &&
                  error !== null &&
                  loginInfo.current_password === "") ||
                (error !== "" && error !== null)
              }
              helperText={
                (error !== "" &&
                  error !== null &&
                  loginInfo.current_password === ""
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
              {t("Enter your new PIN")}
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
              value={loginInfo.new_password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, new_password: e.target.value })
              }
              error={
                (error !== "" &&
                  error !== null &&
                  loginInfo.new_password === "") ||
                (error !== "" && error !== null)
              }
              helperText={
                (error !== "" && error !== null && loginInfo.new_password === ""
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
                height: isMobileLandscape ? 28 : 48,
                textTransform: "capitalize",
                fontWeight: 700,
              }}
              onClick={handleChangePassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChangePassword();
                }
              }}>
              {t("Confirm")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
