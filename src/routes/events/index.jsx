import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";

const Events = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { events } = useSelector((state) => state.events);

  return (
    <Box m="20px">
      <Header
        title="EVENTS"
        subtitle="Organization celebrations and event programs"
      />
      {events?.length > 0 &&
        events?.map((event) => (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h4">
                {event?.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{paddingTop:"0px"}}>
              <Typography>{event?.desc}</Typography>
            </AccordionDetails>
            <AccordionDetails style={{paddingTop:"0px"}}>
              <Typography>Start Date : {event?.startDate}</Typography>{" "}
              <Typography>End Date : {event?.endDate}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default Events;
