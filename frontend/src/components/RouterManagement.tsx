import React, { useEffect, useState } from "react";
import { Router } from "../types/Router";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { RouterList } from "./RouterList";

export const RouterManagement: React.FC = () => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchRouters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/routers`);
      const data = await response.json();
      const formattedData = data.map((router: { updatedAt: string }) => ({
        ...router,
        updatedAt: formatDate(router.updatedAt),
      }));
      setRouters(formattedData);
    } catch (error) {
      console.log(error);
      setError("Failed to load routers.");
      showSnackbar("Failed to load routers.", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRouters();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          height: "80vh",
          width: "100%",
          maxWidth: "fit-content",
          display: "flex",
        }}
      >
        {loading || error ? (
          <CircularProgress />
        ) : (
          <RouterList routers={routers} />
        )}
      </Box>
    </>
  );
};
