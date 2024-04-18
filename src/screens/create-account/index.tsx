import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList, UserSignUp } from '../../types';

import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Button, DateModal, Header, Input, Title } from '../../components';
import { Main } from '../../layouts';
import { post } from '../../supabase';



type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;



const CreateAccount: React.FC<Props> = ({ navigation }): React.ReactElement => {
  const [form, setForm] = useState<UserSignUp>({
    phoneNumber: '',
    pin: '',
    fullName: '',
    birthDate: ''
  });
  const [formConfirmPin, setConfirmPin] = useState<UserSignUp['pin']>('');
  const [isBirthDateModalVisible, setIsBirthDateModalVisible] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);


  
  useEffect(() => {
    if (
      form.phoneNumber &&
      form.pin.length === 6 &&
      form.fullName &&
      form.birthDate &&
      (form.pin === formConfirmPin)
    ) setIsFormValid(true);
    else setIsFormValid(false);
  }, [form, formConfirmPin]);



  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  async function handleCreateAccountOnPress() {
    try {
      setIsFormLoading(true);

      const { error } = await post('user', form);
      
      if (error) throw new Error(error.message);
      
      navigation.goBack();
    } catch (err) {
      console.error('Unable to create account: ', err);
    } finally {
      setIsFormLoading(false);
    }
  }



  return (
    <>
      <Main>
        <View style={{flex: 1, paddingBottom: 62}}>
          <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress} />

          <View style={{marginTop: 36}}>
            <Title variant='secondary'>My Solar</Title>
          </View>

          <View style={{marginTop: 48, marginLeft: 58}}>
            <Text style={{fontFamily: 'Inter', fontSize: 16, color: 'black', fontWeight: 'bold'}}>Hi, Selamat Datang!</Text>
            <Text style={{fontFamily: 'Inter', fontSize: 16, color: 'black'}}>Daftarkan data pribadi anda</Text>
          </View>

          <View style={{flex: 1, marginTop: 36, paddingHorizontal: 42}}>
            <ScrollView>
              <Input value={form.fullName} onChangeText={value => setForm({...form, fullName: value})} placeholder='Nama Lengkap' disabled={isFormLoading}  />

              <View style={{flexDirection: 'row'}}>
                <View>
                  <Input value='+62' onChangeText={() => {}} disabled  />
                </View>
                <View style={{flex: 1}}>
                  <Input value={form.phoneNumber} onChangeText={value => setForm({...form, phoneNumber: value})} type='numeric' placeholder='Nomor Telepon' disabled={isFormLoading}  />
                </View>
              </View>

              <TouchableOpacity style={{width: '100%', paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: 'black'}} onPress={() => setIsBirthDateModalVisible(true)} activeOpacity={0.6}>
                <TextInput style={{fontFamily: 'Inter', fontSize: 20, color: 'black'}} value={form.birthDate ? new Date(form.birthDate).toLocaleDateString('en-SG', {day: '2-digit', month: '2-digit', year: 'numeric'}) : ''} placeholderTextColor='#00000080' placeholder='Tanggal Lahir' readOnly />
              </TouchableOpacity>
              
              <Input value={form.pin} onChangeText={value => setForm({...form, pin: value})} type='numeric' placeholder='PIN (6 digit)' disabled={isFormLoading}  hidden />
              
              <Input value={formConfirmPin} onChangeText={setConfirmPin} type='numeric' placeholder='ulang PIN (6 digit)' disabled={isFormLoading}  hidden />
            </ScrollView>
          </View>

          <View style={{marginTop: 32, alignSelf: 'center', width: 96}}>
            <Button onPress={handleCreateAccountOnPress} disabled={!isFormValid || isFormLoading}>Buat Akun</Button>
          </View>
        </View>
      </Main>

      <DateModal visible={isBirthDateModalVisible} onRequestClose={() => setIsBirthDateModalVisible(false)} title='Tanggal Lahir' value={form.birthDate} onChange={value => setForm({...form, birthDate: value})} />
    </>
  );
};



export { CreateAccount };

