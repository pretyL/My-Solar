import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList, Ship } from '../../types';

import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Button, Header, Title } from '../../components';
import { color } from '../../constants';
import { Main } from '../../layouts';
import { getAllShip } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'RentedShipList'>;

type CustomShip = {
  rentDay: number;
} & Ship;



const RentedShipList: React.FC<Props> = ({ route, navigation }): React.ReactElement => {
  const capturePoint = route.params?.capturePoint;

  const [shipList, setShipList] = useState<CustomShip[] | null>(null);
  const [selectedShip, setSelectedShip] = useState<CustomShip | null>(null);
  const [selectedShipRentDay, setSelectedShipRentDay] = useState<CustomShip['rentDay']>(0);



  useEffect(() => {
    getShipList();
  }, []);



  async function getShipList() {
    try {
      const { data, error } = await getAllShip();

      if (error) throw new Error(error.message);
      
      const addedCustomPropShipList = data.map((ship: CustomShip) => ({...ship, rentDay: 0}));
      if (!capturePoint) return;
      const filteredShipList = addedCustomPropShipList.filter((ship: Ship) => 
        ship.isRented &&
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

  function handleItemOnPress(ship: CustomShip, rentDay: CustomShip['rentDay']) {
    setSelectedShip(ship);
    setSelectedShipRentDay(rentDay);
  }

  function handleDecRentDayOnPress(id: CustomShip['id']) {
    if (shipList) {
      const newShipList = shipList.map(ship => {
        if (ship.id === id) {
          setSelectedShipRentDay(ship.rentDay + 1);
          return {
            ...ship,
            rentDay: ship.rentDay += 1
          }
        }
        else return ship;
      });

      setShipList(newShipList);
    }
  }

  function handleIncRentDayOnPress(id: CustomShip['id']) {
    if (shipList) {
      const newShipList = shipList.map(ship => {
        if (ship.id === id) {
          setSelectedShipRentDay(ship.rentDay - 1);
          return {
            ...ship,
            rentDay: ship.rentDay -= 1
          }
        }
        else return ship;
      });

      setShipList(newShipList);
    }
  }

  function handleCreateQRCodeOnPress() {
    if (selectedShip && (selectedShipRentDay || selectedShipRentDay === 0) && capturePoint) navigation.navigate('FishermenQrCode', {ship: selectedShip, rentDay: selectedShipRentDay, capturePoint});
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
                    <TouchableOpacity key={index} style={{flexDirection: 'row', gap: 8, paddingVertical: 10, paddingHorizontal: 24, backgroundColor: (selectedShip?.id === ship.id) ? color.primary : 'transparent'}} onPress={() => handleItemOnPress(ship, ship.rentDay)} activeOpacity={0.6}>
                      <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 12}}>{index+1}</Text>
                      <View style={{flexDirection: 'row', gap: 8, flex: 1}}>
                        <View>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 12}}>Nama Kapal</Text>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 10}}>ID Kapal</Text>
                        </View>
                        <View>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 12}}>{ship.name}</Text>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 10}}>{ship.publicId}</Text>
                        </View>
                      </View>
                      <View style={{gap: -8}}>
                        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                          <TouchableOpacity onPress={() => handleIncRentDayOnPress(ship.id)} activeOpacity={0.6}>
                            <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 16}}>-</Text>
                          </TouchableOpacity>
                          <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 14}}>{ship.rentDay} day</Text>
                          <TouchableOpacity onPress={() => handleDecRentDayOnPress(ship.id)} activeOpacity={0.6}>
                            <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 16}}>+</Text>
                          </TouchableOpacity>
                        </View>
                        <Text style={{fontFamily: 'Jomolhari', color: 'black', fontSize: 10}}>Rp. {ship.rentDay * ship.rentPrice}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={{marginTop: 32, alignSelf: 'center', width: 160}}>
              <Button onPress={handleCreateQRCodeOnPress} disabled={!selectedShip}>GENERATE QR-CODE</Button>
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { RentedShipList };

