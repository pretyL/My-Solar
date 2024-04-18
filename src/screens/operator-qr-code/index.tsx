import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList, Ship, User } from '../../types';

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

import { Button, Header, Title } from '../../components';
import { Main } from '../../layouts';
import { getSingleShip, getSingleUser, getSingleUserUsingId, patch } from '../../supabase';



type Props = {
  params: {
    distance: number;
  };
} & NativeStackScreenProps<RootStackParamList, 'OperatorQrCode'>;



const OperatorQrCode: React.FC<Props> = ({ navigation }): React.ReactElement => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => handleCodeOnScanned(codes[0].value)
  });
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);



  useEffect(() => {
    requestPermission();
  }, []);



  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  async function handleCodeOnScanned(value: string | undefined) {
    if (!value || isGettingData || isSuccess) return;

    try {
      const queryStringStartIndex = value.indexOf('?');
      const queryString = value.substring(queryStringStartIndex + 1);
      const queryParams = queryString.split('&');

      let userId: User['id'] | null = null;
      let shipId: Ship['id'] | null = null;
      let rentDay: number | null = null;
      let totalFuelToUse: Ship['fuel'] | null = null;
      queryParams.forEach(param => {
        const [key, value] = param.split('=');
        if (key === 'userId') userId = value;
        else if (key === 'shipId') shipId = value;
        else if (key === 'rentDay') rentDay = parseInt(value);
        else if (key === 'totalFuelToUse') totalFuelToUse = parseInt(value);
      });

      if (!userId || !shipId || !totalFuelToUse) throw Error();

      setIsGettingData(true);

      const { data: fetchedUserData } = await getSingleUserUsingId(userId);
      if (!fetchedUserData) throw Error();
      const userData = fetchedUserData[0] as User;
      const newUserData = {...userData, rentedShipsHistory: [...userData.rentedShipsHistory, shipId]};
      const userResult = await patch('user', userData.id, newUserData);
      const isUserSuccess = (userResult.error === null) ? true : false;

      const { data: fetchedShipData } = await getSingleShip(shipId);
      if (!fetchedShipData) throw Error();
      const shipData = fetchedShipData[0] as Ship;
      const newShipData = {...shipData, fuel: shipData.fuel - totalFuelToUse};
      const shipResult = await patch('ship', shipData.id, newShipData);
      const isShipSuccess = (shipResult.error === null) ? true : false;

      if (isUserSuccess && isShipSuccess) setIsSuccess(true);
    } catch(err) {
      console.error('Unable to update ship\'s fuel data: ', err);
    } finally {
      setIsGettingData(false);
    }
  }
  
  function handleGoBackToMainMenu() {
    navigation.goBack();
  }



  return (
    <Main>
      <View style={{flex: 1}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

        <View style={{flex: 1}}>
          <Title variant='secondary'>My Solar</Title>

          <View style={{marginTop: 74, flex: 1, paddingBottom: 48}}>
            <View style={{flex: 1, marginHorizontal: 38, alignItems: 'center'}}>
              {device && <Camera style={{flex: 1, width: '100%'}} device={device} isActive={true} codeScanner={codeScanner} />}
              <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black'}}>{isSuccess ? 'Berhasil' : ''}</Text>
            </View>

            <View style={{marginTop: 32, alignSelf: 'center', width: 172, gap: 18}}>
              <Button onPress={handleGoBackToMainMenu}>Kembali ke Menu Utama</Button>
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { OperatorQrCode };

