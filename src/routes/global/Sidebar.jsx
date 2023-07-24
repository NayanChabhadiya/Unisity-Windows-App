import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import UserImage from "../../assets/images/unisity.png";
import { AdminMenus } from "./RoleBasedMenus/adminMenus";
import { StudentMenus } from "./RoleBasedMenus/studentMenus";
import { FacultyMenus } from "./RoleBasedMenus/facultyMenus";
import { EnchargeMenus } from "./RoleBasedMenus/enchargeMenus";
import { OrganizationMenus } from "./RoleBasedMenus/orgMenus";
import { useSelector } from "react-redux";
export const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        borderRight: `1px solid ${colors.custom.muiDBorder}`,
        "& .pro-sidebar-inner": {
          background: `${colors.custom.muiHeader} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#67B2FE !important",
        },
        "& .pro-menu-item.active": {
          color: `#67B2FE !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  UNISITY
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={UserImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  paddingTop={"5px"}
                  variant="h5"
                  color={colors.greenAccent[500]}
                >
                  {user?.role} at Unisity
                </Typography>
              </Box>
            </Box>
          )}

          {user?.role === "Admin" && (
            <AdminMenus
              isCollapsed={isCollapsed}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          {user?.role === "Student" && (
            <StudentMenus
              isCollapsed={isCollapsed}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          {user?.role === "Faculty" && (
            <FacultyMenus
              isCollapsed={isCollapsed}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          {user?.role === "Encharge" && (
            <EnchargeMenus
              isCollapsed={isCollapsed}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          {user?.role === "Organization" && (
            <OrganizationMenus
              isCollapsed={isCollapsed}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
