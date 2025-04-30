import { Typography } from "@mui/material";
import {
  EnterpriseRouter,
  HomeRouter,
  Router,
  WifiRouter,
} from "../types/Router";

interface Props {
  router: Router;
}

export default function RouterDetailsTabs({ router }: Props) {
  return (
    <>
      <Typography variant="subtitle1">Name: {router.name}</Typography>
      <Typography variant="subtitle1">Type: {router.type}</Typography>
      <Typography variant="subtitle1">
        Last updated: {router.updatedAt}
      </Typography>
      {router.type === "wifi" && (
        <>
          <Typography variant="subtitle1">
            WiFi Channels: {(router as WifiRouter).wifiChannels}
          </Typography>
          <Typography variant="subtitle1">
            Dual Band Support:{" "}
            {(router as WifiRouter).supportsDualBand.toString()}
          </Typography>
        </>
      )}

      {router.type === "enterprise" && (
        <>
          <Typography variant="subtitle1">
            Port count: {(router as EnterpriseRouter).portCount}
          </Typography>
          <Typography variant="subtitle1">
            Supported protocols:{" "}
            {(router as EnterpriseRouter).supportedProtocols}
          </Typography>
          <Typography variant="subtitle1">
            Throughput (Gbps): {(router as EnterpriseRouter).throughputGbps}
          </Typography>
        </>
      )}

      {router.type === "home" && (
        <>
          <Typography variant="subtitle1">
            Connected devices count: {(router as HomeRouter).connectedDevices}
          </Typography>
          <Typography variant="subtitle1">
            Parental controls status:{" "}
            {(router as HomeRouter).parentalControlsEnabled.toString()}
          </Typography>
          <Typography variant="subtitle1">
            Maximum bandwidth (Mbps): {(router as HomeRouter).maxBandwidthMbps}
          </Typography>
        </>
      )}
    </>
  );
}
