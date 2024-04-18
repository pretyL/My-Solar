import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';

import { View } from 'react-native';

import { Header } from '../../components';
import { LargeButton } from '../../components';
import { Main } from '../../layouts';



type Props = NativeStackScreenProps<RootStackParamList, 'OperatorMainMenu'>;



const OperatorMainMenu: React.FC<Props> = ({ navigation }): React.ReactElement => {
  function handleHeaderArrowLeftOnPress() {
    navigation.replace('Login');
  }
  

  
  return (
    <Main>
      <View style={{flex: 1}}>
        <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 4, gap: 32}}>
          <View style={{flexDirection: 'row', gap: 4}}>
            <LargeButton onPress={() => navigation.navigate('OperatorQrCode')}>SCAN QR - CODE</LargeButton>
            <LargeButton onPress={() => navigation.navigate('CapturePointList')}>LIST TITIK PENANGKAPAN</LargeButton>
          </View>
        </View>
      </View>
    </Main>
  );
};



export { OperatorMainMenu };

