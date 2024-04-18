import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useContext, useRef } from 'react';
import { PermissionsAndroid, Platform, Text, View, ToastAndroid } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

import { AppContext } from '../../App';
import { Button, Header, Title } from '../../components';
import { color } from '../../constants';
import { Main } from '../../layouts';



type Props = NativeStackScreenProps<RootStackParamList, 'FishermenQrCode'>;



const FishermenQrCode: React.FC<Props> = ({ route, navigation }): React.ReactElement => {
  const ship = route.params?.ship;
  const rentDay = route.params?.rentDay;
  const capturePoint = route.params?.capturePoint;

  const { userId } = useContext(AppContext);
  const qrCodeRef = useRef();



  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  async function handleDownloadQRCodeOnPress() {
    try {
      const uri = await qrCodeRef.current.capture();
      
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) throw new Error('Unable to save image: ', err);

      CameraRoll.save(uri, { type: 'photo' });

      ToastAndroid.show('QR Code berhasil disimpan di galeri', ToastAndroid.SHORT);
    } catch (err) {
      console.error('Unable to save qr code: ', err);
    }
  }

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };
  
    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };
  
    return await getRequestPermissionPromise();
  }
  
  function handleGoBackToMainMenu() {
    navigation.replace('FishermenMainMenu');
  }

  return (
    <Main>
      <View style={{flex: 1}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

        <View style={{flex: 1}}>
          <Title variant='secondary'>My Solar</Title>

          <View style={{marginTop: 24, flex: 1, paddingBottom: 48}}>
            <ViewShot ref={qrCodeRef} options={{ format: 'png', quality: 1 }} style={{flex: 1, padding: 32, alignItems: 'center', backgroundColor: 'white'}}>
              {(ship && capturePoint && userId) && (
                <QRCode value={`https://my-solar.com?userId=${userId}&shipId=${ship?.id}&rentDay=${rentDay}&totalFuelToUse=${(capturePoint?.distance || 0) * 2}`} size={224} />
              )}

              <View style={{marginTop: 16, alignItems: 'center'}}>
                <Text style={{fontFamily: 'Jomolhari', fontSize: 10, color: 'black'}}>Jarak yang ditempuh: {(capturePoint?.distance || 0) * 2}</Text>
                <Text style={{fontFamily: 'Jomolhari', fontSize: 10, color: 'black'}}>Jumlah liter solar: {(capturePoint?.distance || 0) * 2}</Text>
              </View>
            </ViewShot>

            <View style={{marginTop: 32, alignSelf: 'center', width: 172, gap: 18}}>
              <Button onPress={handleDownloadQRCodeOnPress}>Download QR Code</Button>
              <Button onPress={handleGoBackToMainMenu}>Kembali ke Menu Utama</Button>
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { FishermenQrCode };

