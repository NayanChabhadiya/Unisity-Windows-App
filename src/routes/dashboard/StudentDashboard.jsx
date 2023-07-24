import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { useEffect } from "react";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/ApiSlice/eventSlice";
import { Toaster } from "react-hot-toast";
import { getOrganizations } from "../../store/ApiSlice/orgSlice";
import {
  getAccounts,
  getAccountsById,
} from "../../store/ApiSlice/accountSlice";

const StudentDashboard = () => {
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
        <Header title="DASHBOARD" subtitle="Welcome To Student Dashboard" />

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
            subtitle="Organizations"
            progress="0.75"
            increase="+14%"
            icon={
              <AccountBalanceRoundedIcon
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
              accounts?.data?.faculties?.length
                ? accounts?.data?.faculties?.length
                : 0
            }
            subtitle="Faculties"
            progress="0.50"
            increase="+21%"
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
            increase="+5%"
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

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{
                    fontSize: "26px",
                    color: colors.greenAccent[500],
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* dddd{" "} */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.custom.muiLightBlue}
          border={`1px solid ${colors.custom.muiLBorder}`}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {accounts?.data?.organizations?.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.id.slice(3, 9)}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                $ 300
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
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
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
