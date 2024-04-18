import type { RootStackParamList } from '../types';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CapturePoint, CapturePointList, CreateAccount, FishermenMainMenu, FishermenQrCode, HistoryShip, Login, OperatorMainMenu, OperatorQrCode, RegisterShip, RentedShipList, SailingShipList, ShipProfile, Splash } from '../screens';



const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='CreateAccount' component={CreateAccount} />
        <Stack.Screen name='OperatorMainMenu' component={OperatorMainMenu} />
        <Stack.Screen name='FishermenMainMenu' component={FishermenMainMenu} />
        <Stack.Screen name='CapturePointList' component={CapturePointList} />
        <Stack.Screen name='ShipProfile' component={ShipProfile} />
        <Stack.Screen name='HistoryShip' component={HistoryShip} />
        <Stack.Screen name='RegisterShip' component={RegisterShip} />
        <Stack.Screen name='CapturePoint' component={CapturePoint} />
        <Stack.Screen name='SailingShipList' component={SailingShipList} />
        <Stack.Screen name='RentedShipList' component={RentedShipList} />
        <Stack.Screen name='OperatorQrCode' component={OperatorQrCode} />
        <Stack.Screen name='FishermenQrCode' component={FishermenQrCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export { Navigation };

