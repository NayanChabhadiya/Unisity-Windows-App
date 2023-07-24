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
import { deleteOrg } from "../../store/ApiSlice/orgSlice";
import { toast } from "react-hot-toast";
import {
  getAccounts,
  getAccountsById,
} from "../../store/ApiSlice/accountSlice";

const Orgs = () => {
  const dispatch = useDispatch();
  const { orgs } = useSelector((state) => state.orgs);
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let i = 0;
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
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
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "addressLine",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: `roles.name`,
      headerName: "Actions",
      flex: 1,
      renderCell: (row) => {
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
              onClick={() => {
                dispatch(deleteOrg(row.row.id)).then(() => {
                  toast.success("Organization removed successfully");
                  if (user?.role === "Admin") {
                    dispatch(getAccounts());
                  } else {
                    dispatch(getAccountsById(user?.id));
                  }
                });
              }}
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
      <Header
        title="Organizations"
        subtitle="List of all organizations in the system"
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
          rows={
            accounts?.data?.organizations ? accounts?.data?.organizations : []
          }
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Orgs;
