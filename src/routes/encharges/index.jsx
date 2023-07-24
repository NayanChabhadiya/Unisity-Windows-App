import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setButtonType } from "../../store/ApiSlice/buttonSlice";
import { useNavigate } from "react-router-dom";

const Encharges = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Box
              m="2px 2px"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
            >
              {user.role === "Admin" && <EditRoundedIcon />}
            </Box>{" "}
            <Box
              m="2px 2px"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[600]}
              borderRadius="4px"
            >
              {user.role === "Admin" && <DeleteRoundedIcon />}
            </Box>{" "}
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title="Encharges"
          subtitle="Manages all the Faculties, Students and Works of the system."
        />{" "}
        <Box display="flex" justifyContent="flex-end">
          {user.role === "Organization" ? (
            <Box
              width="150px"
              m="0 auto"
              p="5px"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              display="flex"
              justifyContent="center"
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setButtonType("encharge"));
                  nav("/form");
                }}
              >
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  Add Encharge{" "}
                </Typography>
              </div>
            </Box>
          ) : (
            <div></div>
          )}
        </Box>
      </Box>

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

export default Encharges;
