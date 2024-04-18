import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';

import { View } from 'react-native';

import { Header } from '../../components';
import { LargeButton } from '../../components';
import { Main } from '../../layouts';



type Props = NativeStackScreenProps<RootStackParamList, 'FishermenMainMenu'>;



const FishermenMainMenu: React.FC<Props> = ({ navigation }): React.ReactElement => {
  function handleHeaderArrowLeftOnPress() {
    navigation.replace('Login');
  }
  

  
  return (
    <Main>
      <View style={{flex: 1}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 4, gap: 32}}>
          <View style={{flexDirection: 'row', gap: 4}}>
            <LargeButton onPress={() => navigation.navigate('ShipProfile')}>PROFILE KAPAL</LargeButton>
            <LargeButton onPress={() => navigation.navigate('RegisterShip')}>DAFTARKAN KAPAL</LargeButton>
          </View>
          <View style={{flexDirection: 'row', gap: 4}}>
            <LargeButton onPress={() => navigation.navigate('CapturePoint')}>BUAT QR - CODE</LargeButton>
            <LargeButton onPress={() => navigation.navigate('HistoryShip')}>HISTORY</LargeButton>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { FishermenMainMenu };

