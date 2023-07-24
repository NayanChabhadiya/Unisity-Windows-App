import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setButtonType } from "../../store/ApiSlice/buttonSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { deleteStudent } from "../../store/ApiSlice/studentSlice";
import {
  getAccounts,
  getAccountsById,
} from "../../store/ApiSlice/accountSlice";

const Students = () => {
  const { accounts } = useSelector((state) => state.accounts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
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
      field: "organization",
      headerName: "Organization",
      flex: 1,
      renderCell: (cell) => {
        console.log("log", cell);
        return <div>{cell.row.organizations.name}</div>;
      },
    },
    {
      field: "accessLevel",
      headerName: "Actions",
      flex: 1,
      renderCell: (row) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {user.role === "Organization" && (
              <Box
                m="2px 2px"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={colors.greenAccent[600]}
                borderRadius="4px"
              >
                {user.role === "Organization" && <EditRoundedIcon />}
              </Box>
            )}

            {user.role === "Organization" && (
              <Box
                m="2px 2px"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={colors.redAccent[600]}
                borderRadius="4px"
              >
                <div
                  onClick={() => {
                    dispatch(deleteStudent(row.row.id)).then(() => {
                      if (user?.role === "Admin") {
                        dispatch(getAccounts());
                      } else {
                        dispatch(getAccountsById(user?.id));
                      }
                      toast.success("Student removed successfully");
                    });
                  }}
                >
                  <DeleteRoundedIcon />
                </div>
              </Box>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Toaster />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="STUDENTS" subtitle="Students from all academic years." />
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
              {" "}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setButtonType("student"));
                  nav("/form");
                }}
              >
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  Add Student{" "}
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
          rows={accounts.data.students ? accounts.data.students : []}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Students;
