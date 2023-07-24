import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Semesters = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="SEMESTERS"
        subtitle="Managing the semesters of all year."
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            outline: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            outline: "none",
          },

          "& .MuiDataGrid-root .MuiDataGrid-cell:focus .MuiDataGrid-cell:focus-within":
            {
              outline: "none",
            },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.custom.muiTableHeader,
            borderBottom: "none",
            color: "#ffffff",
            outline: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#0B1829",
            outline: "none",
          },
          // "& .MuiDataGrid-footerContainer": {
          //   backgroundColor: colors.custom.muiTableHeader,
          //   color: `${colors.custom.muiWhite} !important`,
          // },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
            outline: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            outline: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: `${colors.custom.muiWhite} !important`,
            outline: "none",
          },

          "& .MuiButtonBase-root ": {
            color: "white",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={[]}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Semesters;
