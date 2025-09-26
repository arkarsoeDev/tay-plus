import { Box, ListItemText, MenuItem, MenuList } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

type SubMenuItem = {
  origin_id?: undefined;
  name: string;
  url: string;
};

type SubMenuProps = {
  sideBarMenuItems: SubMenuItem[];
  activeTab: any;
  setActiveTab: (item: any) => void;
  selectedChildOrigin?: string | null;
  setSelectedChildOrigin?: (item: string | null) => void;
  isMobileLandscape?: boolean;
};

const SubMenu = ({
  sideBarMenuItems,
  activeTab,
  setActiveTab,
  selectedChildOrigin,
  setSelectedChildOrigin,
  isMobileLandscape = false,
}: SubMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showSubMenus, setShowSubMenus] = useState(false);
  const [subMenuIndex, setSubMenuIndex] = useState(0);

  useEffect(() => {
    if (showSubMenus) {
      setShowSubMenus(false);
    }
  }, [location.pathname]);

  return (
    <Box width='100%' zIndex={2} position='relative' sx={{ overflowX: "auto" }}>
      <MenuList
        sx={{
          display: "inline-flex",
          mt: isMobileLandscape ? "25px" : "90px",
        }}>
        {sideBarMenuItems.length > 0 &&
        sideBarMenuItems[0]?.origin_id !== undefined &&
        location.pathname === activeTab ? (
          <MenuItem
            to={activeTab}
            component={Link}
            onClick={() => setSelectedChildOrigin?.(null)}
            sx={getStyle(selectedChildOrigin === null, isMobileLandscape)}>
            <ListItemText
              sx={{ span: { fontSize: isMobileLandscape ? 10 : 16 } }}>
              {t("All")}
            </ListItemText>
          </MenuItem>
        ) : (
          <MenuItem
            to='/'
            component={Link}
            sx={{
              px: isMobileLandscape ? "15px" : "30px",
              height: isMobileLandscape ? 24 : 40,
              mr: isMobileLandscape ? "5px" : "10px",
              borderRadius: "6px",
              fontSize: isMobileLandscape ? 14 : 16,
              fontWeight: 400,
              backgroundColor:
                location.pathname === "/"
                  ? "rgb(160 80 112)"
                  : "rgba(51, 51, 102, 1)",
              color: "white",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/"
                    ? "rgb(160 80 112 / 60%)"
                    : "rgba(51, 51, 102, 0.6)",
                color: "white",
              },
            }}>
            <ListItemText
              sx={{ span: { fontSize: isMobileLandscape ? 10 : 16 } }}>
              {t("Suggested for You")}
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem
          to='/continue-watching'
          component={Link}
          sx={{
            px: isMobileLandscape ? "15px" : "30px",
            height: isMobileLandscape ? 24 : 40,
            mr: isMobileLandscape ? "5px" : "10px",
            borderRadius: "6px",
            fontSize: isMobileLandscape ? 14 : 16,
            fontWeight: 400,
            backgroundColor:
              location.pathname === "/continue-watching"
                ? "rgb(160 80 112)"
                : "rgba(51, 51, 102, 1)",
            color: "white",
            "&:hover": {
              backgroundColor:
                location.pathname === "/continue-watching"
                  ? "rgb(160 80 112 / 60%)"
                  : "rgba(51, 51, 102, 0.6)",
              color: "white",
            },
          }}>
          <ListItemText
            sx={{ span: { fontSize: isMobileLandscape ? 10 : 16 } }}>
            {t("Continue Watching")}
          </ListItemText>
        </MenuItem>
        {sideBarMenuItems?.length > 0
          ? sideBarMenuItems
              ?.filter(
                (item: any) =>
                  item.text !== "Home" && item.text !== "Your Profile"
              )
              .map((item: any, index: number) => (
                <Box key={`parent-${index}`} display='flex'>
                  {!showSubMenus && (
                    <MenuItem
                      to={item.url}
                      component={Link}
                      onClick={() => {
                        setSelectedChildOrigin?.(item.origin_id);
                        if ("url" in item) {
                          setActiveTab(item.url);
                        } else {
                          if (item.children?.length > 0) {
                            setShowSubMenus(!showSubMenus);
                          }
                          setSubMenuIndex(index);
                        }
                      }}
                      sx={getStyle(
                        item.origin_id !== undefined
                          ? selectedChildOrigin === item.origin_id
                          : "url" in item
                          ? activeTab === item.url
                          : subMenuIndex === index,
                        isMobileLandscape
                      )}>
                      <ListItemText
                        sx={{
                          span: { fontSize: isMobileLandscape ? 10 : 16 },
                        }}>
                        {item && "origin_id" in item
                          ? `${t(item.origin_name)}`
                          : `${t(item.name)}`}
                      </ListItemText>
                    </MenuItem>
                  )}

                  {/* Render children if exist */}
                  {showSubMenus &&
                    item.children?.map((child: any, cIndex: number) => (
                      <MenuItem
                        key={`child-${index}-${cIndex}`}
                        to={child.url}
                        component={Link}
                        // onClick={() => setActiveTab(child.url)}
                        onClick={() => {
                          if ("url" in child) {
                            setActiveTab(child.url);
                          } else {
                            if (child.children?.length > 0) {
                              setShowSubMenus(!showSubMenus);
                            }
                            setSubMenuIndex(cIndex);
                          }
                        }}
                        sx={getStyle(
                          "url" in child
                            ? activeTab === child.url
                            : subMenuIndex === cIndex,
                          isMobileLandscape
                        )}>
                        <ListItemText
                          sx={{
                            span: { fontSize: isMobileLandscape ? 10 : 16 },
                          }}>
                          {child.name}
                        </ListItemText>
                      </MenuItem>
                    ))}
                </Box>
              ))
          : null}
      </MenuList>
    </Box>
  );
};

const getStyle = (active: boolean, isMobileLandscape: boolean = false) => ({
  px: isMobileLandscape ? "15px" : "30px",
  height: isMobileLandscape ? 24 : 40,
  mr: isMobileLandscape ? "5px" : "10px",
  borderRadius: "6px",
  fontSize: isMobileLandscape ? 14 : 16,
  fontWeight: 400,
  backgroundColor: active ? "rgb(160 80 112)" : "rgba(51, 51, 102, 1)",
  color: "white",
  "&:hover": {
    backgroundColor: active
      ? "rgb(160 80 112 / 60%)"
      : "rgba(51, 51, 102, 0.6)",
    color: "white",
  },
});

export default SubMenu;
