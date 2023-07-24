import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { useEffect } from "react";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/ApiSlice/eventSlice";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import { getOrganizations } from "../../store/ApiSlice/orgSlice";
import {
  getAccounts,
  getAccountsById,
} from "../../store/ApiSlice/accountSlice";
import { Toaster } from "react-hot-toast";

const OrgDashboard = () => {
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getEvents());
    dispatch(getOrganizations());
    if (user?.role === "Admin") {
      dispatch(getAccounts());
    } else {
      dispatch(getAccountsById(user?.id));
    }
  }, []);

  return (
    <Box m="20px">
      <Toaster />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Welcome to Organization Dashboard"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.custom.muiBlue,
              color: colors.custom.muiWhite,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 3"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              accounts?.data?.faculties?.length
                ? accounts?.data?.faculties?.length
                : 0
            }
            subtitle="Faculties"
            progress="0.50"
            // increase="+21%"
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              accounts?.data?.students?.length
                ? accounts?.data?.students?.length
                : 0
            }
            subtitle="Students"
            progress="0.30"
            // increase="+5%"
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="Plans"
            progress="0.80"
            // increase="+43%"
            icon={
              <CurrencyRupeeRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              accounts?.data?.organizations?.length
                ? accounts?.data?.organizations?.length
                : 0
            }
            subtitle="Terms / Semesters"
            progress="0.75"
            // increase="+14%"
            icon={
              <AccountBalanceRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* row ----------------------------------------------------------------------------------------------------------  2 */}
        <Box
          gridColumn="span 3"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={10}
            subtitle="Events"
            progress="0.50"
            // increase="+21%"
            icon={
              <LocalActivityRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={2}
            subtitle="Announcements"
            progress="0.30"
            // increase="+5%"
            icon={
              <CampaignRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="7"
            subtitle="Subjects"
            progress="0.80"
            // increase="+43%"
            icon={
              <MenuBookRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={3}
            subtitle="Courses"
            progress="0.75"
            // increase="+14%"
            icon={
              <MenuBookRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <div></div>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px"> </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default OrgDashboard;
