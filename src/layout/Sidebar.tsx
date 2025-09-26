import { ListItemText, MenuItem, MenuList } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type SideBarItem = {
  text: string;
  url: string;
};

type SubMenuProps = {
  sideBarMenuItems: SideBarItem[];
  onParentSelect: (index: number) => void;
  isMobileLandscape?: boolean;
};

const Sidebar = ({
  sideBarMenuItems,
  onParentSelect,
  isMobileLandscape = false,
}: SubMenuProps) => {
  const location = useLocation();

  return (
    <MenuList
      sx={{
        mt: isMobileLandscape ? 1 : 4,
        ml: isMobileLandscape ? 1 : 4,
        mr: isMobileLandscape ? 1 : 6,
        width: isMobileLandscape ? 150 : 240,
        // height: isMobileLandscape ? "auto" : "calc(100vh - 140px)",
      }}>
      {sideBarMenuItems.map((item: any, index: number) => (
        <MenuItem
          key={index}
          to={item.url}
          component={Link}
          onClick={() => onParentSelect(item)}
          sx={{
            width: isMobileLandscape ? 130 : 200,
            height: isMobileLandscape ? 24 : 48,
            mb: isMobileLandscape ? "2px" : "4px",
            borderRadius: isMobileLandscape ? "6px" : "10px",
            fontSize: isMobileLandscape ? "0.65rem" : "1rem",
            fontWeight: 400,
            backgroundColor:
              location.pathname === item.url ? "rgb(160 80 112)" : "#222222",
            color: "white",
            "&:hover": {
              backgroundColor:
                location.pathname === item.url
                  ? "rgb(160 80 112 / 60%)"
                  : "#21212199",
              color: "white",
            },
          }}>
          <ListItemText
            sx={{
              fontSize: isMobileLandscape ? "0.65rem" : "1rem",
              "& .MuiListItemText-primary": {
                fontSize: isMobileLandscape ? "0.65rem" : "1rem",
              },
            }}>
            {item.text}
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default Sidebar;
