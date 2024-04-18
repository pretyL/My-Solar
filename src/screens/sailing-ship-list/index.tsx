import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { CapturePoint, RootStackParamList, Ship } from '../../types';

import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Button, Header, Title } from '../../components';
import { color } from '../../constants';
import { Main } from '../../layouts';
import { getAllShip } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'SailingShipList'>;



const SailingShipList: React.FC<Props> = ({ route, navigation }): React.ReactElement => {
  const capturePoint = route.params?.capturePoint;

  const [shipList, setShipList] = useState<Ship[] | null>(null);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);



  useEffect(() => {
    getShipList();
  }, []);



  async function getShipList() {
    try {
      const { data, error } = await getAllShip();

      if (error) throw new Error(error.message);
      
      if (!capturePoint) return;
      const filteredShipList = data.filter((ship: Ship) => 
        !ship.isRented &&
        ship.fuel > (capturePoint.distance * 2)
      );

      setShipList(filteredShipList);
    } catch (err) {
      console.error('Unable to get ship list: ', err);
      setShipList(null);
    }
  }

  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  function handleItemOnPress(ship: Ship) {
    setSelectedShip(ship);
  }

  function handleCreateQRCodeOnPress() {
    if (selectedShip && capturePoint) navigation.navigate('FishermenQrCode', {ship: selectedShip, capturePoint});
  }

  function handleRentShipOnPress() {
    if (capturePoint) navigation.navigate('RentedShipList', {capturePoint});
  }



  return (
    <Main>
      <View style={{flex: 1}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

        <View style={{flex: 1}}>
          <Title variant='secondary'>My Solar</Title>

          <View style={{marginTop: 46, flex: 1, paddingBottom: 72}}>
            <Text style={{marginLeft: 40, fontFamily: 'Jomolhari', fontSize: 15, color: 'black'}}>Daftar kapal yang dapat disewa:</Text>

            <View style={{flex: 1, marginHorizontal: 40, backgroundColor: color.bgSecondary}}>
              {!shipList ? (
                <Text style={{fontFamily: 'Inter', fontSize: 16, color: 'black', textAlign: 'center', marginTop: 16}}>Loading...</Text>
              ) : (shipList.length === 0) ? (
                <Text style={{fontFamily: 'Inter', fontSize: 16, color: 'black', textAlign: 'center', marginTop: 16}}>Kosong</Text>
              ) : (
                <ScrollView contentContainerStyle={{gap: 8}}>
                  {shipList.map((ship, index) => (
                    <TouchableOpacity key={index} style={{flexDirection: 'row', gap: 8, paddingVertical: 10, paddingHorizontal: 24, backgroundColor: (selectedShip?.id === ship.id) ? color.primary : 'transparent'}} onPress={() => handleItemOnPress(ship)} activeOpacity={0.6}>
                      <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 12}}>{index+1}</Text>
                      <View style={{flexDirection: 'row', gap: 8}}>
                        <View>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 12}}>Nama Kapal</Text>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 10}}>ID Kapal</Text>
                        </View>
                        <View>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 12}}>{ship.name}</Text>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 10}}>{ship.publicId}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={{marginTop: 32, alignSelf: 'center', width: 160, gap: 22}}>
              <Button onPress={handleCreateQRCodeOnPress} disabled={!selectedShip}>GENERATE QR-CODE</Button>
              <Button onPress={handleRentShipOnPress}>SEWA KAPAL</Button>
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { SailingShipList };

