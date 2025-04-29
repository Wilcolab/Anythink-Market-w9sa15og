import { useState } from "react";
import { Router } from "../types/Router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import RouterDetails from "./RouterDetails";
// import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from "@mui/icons-material/Wifi";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
interface Props {
  routers: Router[];
}

type RouterType = "wifi" | "home" | "enterprise";
const columns: GridColDef[] = [
  { field: "name", headerName: "Router Name", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    renderCell: (params) => {
      const type = params.value?.toLowerCase() as RouterType;

      const icon =
        {
          wifi: <WifiIcon sx={{ color: "primary.main", mr: 1 }} />,
          home: <HomeIcon sx={{ color: "success.main", mr: 1 }} />,
          enterprise: <BusinessIcon sx={{ color: "warning.main", mr: 1 }} />,
        }[type as string] ?? null;
      return (
        <Box display="flex" alignItems="center">
          {icon}
          <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
            {type}
          </Typography>
        </Box>
      );
    },
  },
  { field: "updatedAt", headerName: "Last updated", width: 200 },
];

export const RouterList: React.FC<Props> = ({ routers }) => {
  const [selectedRouter, setSelectedRouter] = useState<Router | null>(null);
  const [filter, setFilter] = useState<string>("");
  const filteredRouters = routers.filter((router) =>
    [router.type].some((field) =>
      field.toLowerCase().includes(filter.toLowerCase())
    )
  );
  const handleRowClick = (params: any) => {
    const clickedRouter = routers.find((r) => r.id === params.id);
    if (clickedRouter) {
      setSelectedRouter(clickedRouter);
    }
  };
  return (
    <>
      <Paper elevation={2} sx={{ overflow: "visible" }}>
        <Box sx={{ margin: "0 auto", width: "50%" }}>
          <TextField
            label="Filter by router type"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>

        <DataGrid
          sx={{ height: "70vh" }}
          rows={filteredRouters}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Paper>

      <Box p={2} display="flex" flexDirection="column" height="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Router Details</Typography>
          <IconButton onClick={() => setSelectedRouter(selectedRouter)}>
            {/* <CloseIcon /> */}
          </IconButton>
        </Box>
        {selectedRouter && <RouterDetails router={selectedRouter} />}
      </Box>
    </>
  );
};
