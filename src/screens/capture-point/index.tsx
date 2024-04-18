import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { CapturePoint as CapturePointType, RootStackParamList } from '../../types';

import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Button, Header, Title } from '../../components';
import { color } from '../../constants';
import { Main } from '../../layouts';
import { getAllCapturePoint } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'CapturePoint'>;



const CapturePoint: React.FC<Props> = ({ navigation }): React.ReactElement => {
  const [capturePointList, setCapturePointList] = useState<CapturePointType[] | null>(null);
  const [selectedCapturePoint, setSelectedCapturePoint] = useState<CapturePointType | null>(null);
  const [distance, setDistance] = useState<number>(0);



  useEffect(() => {
    getAllCapturePointList();
  }, []);



  async function getAllCapturePointList() {
    try {
      const { data, error } = await getAllCapturePoint();

      if (error) throw new Error(error.message);

      setCapturePointList(data);
    } catch (err) {
      console.error('Unable to get all capture point list: ', err);
      setCapturePointList(null);
    }
  }

  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  function handleCapturePointOnPress(newSelectedCapturePoint: CapturePointType) {
    setSelectedCapturePoint(newSelectedCapturePoint);
    setDistance(newSelectedCapturePoint.distance);
  }

  function handleShowShipListOnPress() {
    if (selectedCapturePoint) navigation.navigate('SailingShipList', {capturePoint: selectedCapturePoint});
  }



  return (
    <Main>
      <View style={{flex: 1}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

        <View style={{flex: 1, paddingBottom: 32}}>
          <Title variant='secondary'>My Solar</Title>

          <View style={{flex: 1, marginTop: 42}}>
            <Text style={{marginLeft: 40, fontFamily: 'Jomolhari', fontSize: 15, color: 'black'}}>Titik Penangkapan Ikan</Text>
            
            <View style={{flex: 1, marginHorizontal: 36}}>
              {!capturePointList ? (
                <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', textAlign: 'center'}}>Loading...</Text>
              ) : (capturePointList.length === 0) ? (
                <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', textAlign: 'center'}}>Kosong</Text>
              ) : (
                <ScrollView>
                  {capturePointList.map((capturePoint, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCapturePointOnPress(capturePoint)} style={{backgroundColor: (selectedCapturePoint?.id === capturePoint.id) ? color.primary : color.bgPrimary, paddingVertical: 8, paddingHorizontal: 20}} activeOpacity={0.6}>
                      <Text style={{fontFamily: 'Inter', fontSize: 12, color: 'black'}}>TITIK PENANGKAPAN {index+1} ({capturePoint.distance} nautical mile)</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={{marginTop: 32, marginHorizontal: 36}}>
              <Text style={{fontFamily: 'Inter', fontSize: 15, color: 'black'}}>Jarak Penangkapan (dalam nautical mile)</Text>
              <TextInput style={{paddingVertical: 8, paddingHorizontal: 12, fontFamily: 'Jomolhari', fontSize: 12, color: 'black', backgroundColor: color.bgSecondary}} value={distance ? distance.toString() : ''} onChangeText={value => setDistance(Number(value))} placeholder='Masukkan jarak yang akan ditempuh' keyboardType='numeric' readOnly />
            </View>

            <View style={{marginTop: 32, alignSelf: 'center', width: 188}}>
              <Button onPress={handleShowShipListOnPress} disabled={!selectedCapturePoint || !distance}>LIHAT DAFTAR KAPAL</Button>
            </View>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { CapturePoint };

