import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList, User } from '../../types';

import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AppContext } from '../../App';
import { Button, Input, Title } from '../../components';
import { Main } from '../../layouts';
import { getSingleUser } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;



const OPERATOR_PHONE_NUMBER: string = '0';
const OPERATOR_PIN: string = '0';


 
const Login: React.FC<Props> = ({ navigation }): React.ReactElement => {
  const { setUserId, setUserFullName } = useContext(AppContext);

  const [phoneNumber, setPhoneNumber] = useState<User['phoneNumber']>('');
  const [pin, setPin] = useState<User['pin']>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  


  useEffect(() => {
    if (phoneNumber && pin) setIsFormValid(true);
    else setIsFormValid(false);
  }, [phoneNumber, pin]);



  async function handleSignInOnPress() {
    try {
      setIsFormLoading(true);

      if (
        (phoneNumber === OPERATOR_PHONE_NUMBER) &&
        (pin === OPERATOR_PIN)
      ) {
        setUserId('OPERATOR');
        setUserFullName('_operator');
        navigation.replace('OperatorMainMenu');
      }

      const { data } = await getSingleUser({ phoneNumber, pin });

      if (data) {
        setUserId(data.id);
        setUserFullName(data.fullName);
        navigation.replace('FishermenMainMenu');
      }
    } catch (err) {
      console.error('Unable to sign in: ', err);
    } finally {
      setIsFormLoading(false);
    }
  }

  function handleCreateAccountOnPress() {
    navigation.push('CreateAccount');
  }
  

  
  return (
    <Main>
      <View style={{flex: 1, paddingTop: 140, paddingBottom: 54}}>
        <Title variant='secondary'>My Solar</Title>

        <Text style={{marginTop: 60, marginLeft: 50, fontFamily: 'Inter', fontSize: 16, fontWeight: 'bold', color: 'black'}}>Hai, Selamat Datang!</Text>
        
        <View style={{flex: 1, marginTop: 64, paddingHorizontal: 56}}>
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Input value='+62' onChangeText={() => {}} disabled  />
              </View>
              <View style={{flex: 1}}>
                <Input value={phoneNumber} onChangeText={setPhoneNumber} type='numeric' placeholder='Nomor Telepon' disabled={isFormLoading} />
              </View>
            </View>

            <View style={{marginTop: 24}}>
              <Input value={pin} onChangeText={setPin} type='numeric' placeholder='PIN (6 digit)' disabled={isFormLoading}  hidden />
            </View>
            
            <Text style={{marginTop: 20, fontFamily: 'Inter', fontSize: 14, color: '#F80303'}}>Lupa PIN anda?</Text>
          </ScrollView>
        </View>

        <View style={{marginTop: 32, alignSelf: 'center', width: 100, gap: 18}}>
          <Button onPress={handleSignInOnPress} disabled={!isFormValid || isFormLoading}>Masuk</Button>
          <Button onPress={handleCreateAccountOnPress} disabled={isFormLoading}>Buat Akun</Button>
        </View>
      </View>
    </Main>
  );
};



export { Login };

