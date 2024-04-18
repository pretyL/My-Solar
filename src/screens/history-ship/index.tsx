import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList, Ship, User } from '../../types';

import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../../App';
import { Header, Title } from '../../components';
import { color } from '../../constants';
import { Main } from '../../layouts';
import { getSingleShip, getSingleUserUsingId, patch } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'HistoryShip'>;



const HistoryShip: React.FC<Props> = ({ navigation }): React.ReactElement => {
  const { userId } = useContext(AppContext);

  const [shipList, setShipList] = useState<Ship[] | null>(null);



  useEffect(() => {
    getShipList();
  }, []);



  async function getShipList() {
    try {
      if (!userId) return;

      const { data: fetchedUserData } = await getSingleUserUsingId(userId);
      if (!fetchedUserData) return;
      const userData: User = fetchedUserData[0] as User;

      if (!userData) throw new Error();

      const getRentedShipsHistory = userData.rentedShipsHistory.map(async (rentedShipId) => {
        const { data: fetchedShipData } = await getSingleShip(rentedShipId);
        if (!fetchedShipData) return;
        const shipData: Ship = fetchedShipData[0] as Ship;
        
        if (shipData) return shipData;
      });

      const rentedShipsHistory: (Ship | undefined)[] = await Promise.all(getRentedShipsHistory);
      const filteredRentedShipsHistory: Ship[] = rentedShipsHistory.filter(ship => ship !== undefined) as Ship[];
      if (filteredRentedShipsHistory) setShipList(filteredRentedShipsHistory);
    } catch (err) {
      console.error('Unable to get ship list: ', err);
      setShipList(null);
    }
  }

  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }



  return (
    <Main>
      <View style={{flex: 1, paddingBottom: 44}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

        <View style={{flex: 1, marginTop: 54}}>
          <Title>HISTORY KAPAL</Title>

          <View style={{marginTop: 64, flex: 1, paddingHorizontal: 32}}>
            {!shipList ? (
              <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', textAlign: 'center'}}>Loading...</Text>
            ) : (shipList.length === 0) ? (
              <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', textAlign: 'center'}}>Kosong</Text>
            ) : (
              <View style={{gap: 32}}>
                {shipList.map((ship, index) => (
                  <View key={index} style={{backgroundColor: color.bgSecondary, paddingBottom: 12, paddingHorizontal: 6}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>{index+1}. Nama Kapal :</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>{ship.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>Id Kapal :</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>{ship.publicId}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>Jumlah Solar :</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>{ship.fuel}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </Main>
  );
};



export { HistoryShip };

