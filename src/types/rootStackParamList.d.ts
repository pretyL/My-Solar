import type { CapturePoint } from '.';

import { Ship } from './ship';



type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  CreateAccount: undefined;
  OperatorMainMenu: undefined;
  FishermenMainMenu: undefined;
  CapturePointList: undefined;
  ShipProfile: undefined;
  HistoryShip: undefined;
  RegisterShip: {
    form?: Ship;
  } | undefined;
  CapturePoint: undefined;
  SailingShipList: {
    capturePoint: CapturePoint;
  } | undefined;
  RentedShipList: {
    capturePoint: CapturePoint;
  } | undefined;
  OperatorQrCode: undefined;
  FishermenQrCode: {
    ship: Ship;
    rentDay?: number | null;
    capturePoint: CapturePoint;
  } | undefined;
};



export type { RootStackParamList };

