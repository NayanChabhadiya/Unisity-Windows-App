import { Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { useTheme } from "@emotion/react";
import { Item } from "../Sidebar";
import { Store } from "../../../store/states";
import { tokens } from "../../../theme";

export const EnchargeMenus = ({ selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box paddingLeft={Store("sidebar").sidebar ? undefined : "10%"}>
      <Item
        title="Dashboard"
        to="/"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 20px" }}
      >
        Members
      </Typography>
      <Item
        title="Encharges"
        to="/students"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />{" "}
      <Item
        title="Students"
        to="/students"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />{" "}
      <Item
        title="Faculties"
        to="/faculties"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 20px" }}
      >
        Sections
      </Typography>
      <Item
        title="Terms / Semesters"
        to="/semesters"
        icon={<CalendarViewMonthRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Projects"
        to="/projects"
        icon={<WorkOutlineRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Contacts Information"
        to="/contacts"
        icon={<ContactsOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: "15px 0 5px 20px" }}
      >
        Publishes
      </Typography>
      <Item
        title="Announcements"
        to="/form"
        icon={<CampaignRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Events"
        to="/events"
        icon={<EventNoteRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Notes"
        to="/notes"
        icon={<ReceiptOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Time Table"
        to="/faq"
        icon={<CalendarMonthRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Calander"
        to="/calendar"
        icon={<CalendarTodayRoundedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </Box>
  );
};
