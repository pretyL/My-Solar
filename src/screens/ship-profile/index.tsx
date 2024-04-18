import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList, Ship } from '../../types';

import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../../App';
import { Header, Title } from '../../components';
import { color } from '../../constants';
import { Main } from '../../layouts';
import { getAllShip, patch } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'ShipProfile'>;



const ShipProfile: React.FC<Props> = ({ navigation }): React.ReactElement => {
  const { userId } = useContext(AppContext);

  const [shipList, setShipList] = useState<Ship[] | null>(null);



  useEffect(() => {
    getShipList();
  }, []);



  async function getShipList() {
    try {
      if (!userId) return;
      const { data, error } = await getAllShip(userId);

      if (error) throw new Error(error.message);

      setShipList(data);
    } catch (err) {
      console.error('Unable to get ship list: ', err);
      setShipList(null);
    }
  }

  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  function handleItemOnPress(ship: Ship) {
    navigation.navigate('RegisterShip', {form: ship});
  }

  function handleRentPriceOnChange(index: number, newRentPrice: string) {
    if (shipList && !isNaN(parseInt(newRentPrice))) {
      const newShipList = shipList.map((ship, thisIndex) => {
        if (index === thisIndex) return {...ship, rentPrice: parseInt(newRentPrice)};
        else return ship;
      });

      setShipList(newShipList);
    }
  }

  async function handleRentShipOnPress(ship: Ship) {
    const payload: Ship = { 
      ...ship,
      isRented: !ship.isRented
    };

    const result = await patch('ship', payload.id, payload);
    if (result.error === null) getShipList();
  }



  return (
    <Main>
      <View style={{flex: 1, paddingBottom: 44}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

        <View style={{flex: 1, marginTop: 54}}>
          <Title>DAFTAR KAPAL</Title>

          <View style={{marginTop: 64, flex: 1, paddingHorizontal: 32}}>
            {!shipList ? (
              <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', textAlign: 'center'}}>Loading...</Text>
            ) : (shipList.length === 0) ? (
              <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', textAlign: 'center'}}>Kosong</Text>
            ) : (
              <ScrollView contentContainerStyle={{gap: 32}}>
                {shipList.map((ship, index) => (
                  <TouchableOpacity key={index} onPress={() => handleItemOnPress(ship)} activeOpacity={0.6} style={{backgroundColor: color.bgSecondary, paddingBottom: 12, paddingHorizontal: 6}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 1}}>{index+1}.</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 4}}>Nama Kapal</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>: {ship.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'transparent', flex: 1}}>{index+1}.</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 4}}>Id Kapal</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', flex: 5}}>: {ship.publicId}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 12, color: 'transparent', flex: 1}}>{index+1}.</Text>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 12, color: 'black', flex: 4}}>Harga Sewa</Text>
                      <View style={{flex: 5, flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <Text style={{fontFamily: 'Jomolhari', fontSize: 12, color: 'black'}}>:</Text>
                        <TextInput style={{fontFamily: 'Jomolhari', fontSize: 12, color: 'black', margin: 0, padding: 0, flex: 1}} value={ship.rentPrice.toString() ?? ''} onChangeText={value => handleRentPriceOnChange(index, value)} keyboardType='numeric' />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'transparent', flex: 1}}>{index+1}.</Text>
                      <TouchableOpacity onPress={(ship.rentPrice > 0) ? () => handleRentShipOnPress(ship) : () => {}} style={{flex: 9, flexDirection: 'row', alignItems: 'center', gap: 4}} activeOpacity={0.6}>
                        <View style={{height: 20, width: 20, backgroundColor: ship.isRented ? color.primary : color.bgPrimary}} />
                        <Text style={{fontFamily: 'Jomolhari', fontSize: 10, color: 'black'}}>{ship.isRented ? 'Kapal sedang disewakan' : 'Sewakan kapal anda'}</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </Main>
  );
};



export { ShipProfile };

