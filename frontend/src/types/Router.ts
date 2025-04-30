export type RouterType = "wifi" | "enterprise" | "home";

export interface BaseRouter {
  id: string;
  name: string;
  type: RouterType;
  updatedAt: string;
}
export interface WifiRouter extends BaseRouter {
  wifiChannels: string;
  supportsDualBand: boolean;
}
export interface EnterpriseRouter extends BaseRouter {
  portCount: number;
  supportedProtocols: string;
  throughputGbps: number;
}
export interface HomeRouter extends BaseRouter {
  connectedDevices: number;
  parentalControlsEnabled: boolean;
  maxBandwidthMbps: number;
}

export type Router = WifiRouter | EnterpriseRouter | HomeRouter;
