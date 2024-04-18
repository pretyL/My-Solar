import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Ship, ShipRegister, type RootStackParamList } from '../../types';

import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../../App';
import { Button, DateModal, Header, Input, Title } from '../../components';
import { Main } from '../../layouts';
import { post } from '../../supabase';

import { CustomInput } from './CustomInput';
import { WeightModal } from './WeightModal';



type Props = {
  route: {
    params: {
      form?: Ship;
    };
  };
} & NativeStackScreenProps<RootStackParamList, 'RegisterShip'>;



const RegisterShip: React.FC<Props> = ({ route, navigation }): React.ReactElement => {
  const paramForm = route.params?.form;

  const { userId, userFullName } = useContext(AppContext);

  const [form, setForm] = useState<ShipRegister>({
    ownerId: userId || '',
    publicId: paramForm?.publicId || '',
    name: paramForm?.name || '',
    type: paramForm?.type || '',
    weight: paramForm?.weight || 30,
    fuel: paramForm?.fuel || 8000,
    productionYear: paramForm?.productionYear || '',
    validityPeriod: paramForm?.validityPeriod || '',
  });
  const [isWeightModalVisible, setIsWeightModalVisible] = useState<boolean>(false);
  const [isValidityPeriodVisible, setIsValidityPeriodVisible] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);



  useEffect(() => {
    if (
      form.publicId &&
      form.name &&
      form.type &&
      form.weight &&
      form.productionYear &&
      form.validityPeriod
    ) setIsFormValid(true);
    else setIsFormValid(false);
  }, [form]);



  function handleHeaderArrowLeftOnPress() {
    navigation.goBack();
  }

  async function handleSaveOnPress() {
    try {
      setIsFormLoading(true);

      const { error } = await post('ship', { ...form, isRented: false });
      
      if (error) throw new Error(error.message);
      
      navigation.goBack();
    } catch (err) {
      console.error('Unable to register ship: ', err);
    } finally {
      setIsFormLoading(false);
    }
  }

  function handleRegisterOtherShipOnPress() {
    setForm({
      ownerId: '',
      publicId: '',
      name: '',
      type: '',
      weight: 0,
      fuel: 0,
      productionYear: '',
      validityPeriod: '',
    });
  }


  
  return (
    <>
      <Main>
        <View style={{flex: 1, paddingBottom: 46}}>
          <Header handleArrowLeftOnPress={handleHeaderArrowLeftOnPress}  />

          <View style={{marginTop: 42}}>
            <Title>DAFTAR KAPAL</Title>
          </View>

          <View style={{flex:1, marginTop: 16, paddingHorizontal: 36}}>
            <ScrollView contentContainerStyle={{gap: 16}}>
              <CustomInput label='Pemilik*' value={userFullName ?? ''} onChangeText={() => {}} disabled />
              <CustomInput label='ID Kapal*' value={form.publicId ? form.publicId.toString() : form.publicId} onChangeText={value => setForm({...form, publicId: value})} type='numeric' disabled={(paramForm ? true : false) || isFormLoading} />
              <CustomInput label='Nama Kapal*' value={form.name} onChangeText={value => setForm({...form, name: value})} disabled={(paramForm ? true : false) || isFormLoading} />
              <CustomInput label='Jenis Usaha*' value={form.type} onChangeText={value => setForm({...form, type: value})} disabled={(paramForm ? true : false) || isFormLoading} />
              <View style={{gap: -16}}>
                <Text style={{fontFamily: 'Jomolhari', fontSize: 20, color: 'black'}}>Gross Tonnage (GT)*</Text>
                <TouchableOpacity onPress={() => setIsWeightModalVisible(true)} activeOpacity={0.6}>
                  <View style={{width: '100%', paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                    <TextInput style={{fontFamily: 'Inter', fontSize: 20, color: 'black'}} value={form.weight ? form.weight.toString() : ''} placeholderTextColor='#00000080' readOnly />
                  </View>
                </TouchableOpacity>
              </View>
              <CustomInput label='Full Tangki*' value={form.fuel ? form.fuel.toString() : ''} onChangeText={() => {}} type='numeric' disabled />
              <CustomInput label='Tahun Pembuatan*' value={form.productionYear} onChangeText={value => setForm({...form, productionYear: value})} disabled={(paramForm ? true : false) || isFormLoading} />
              <View style={{gap: -16}}>
                <Text style={{fontFamily: 'Jomolhari', fontSize: 20, color: 'black'}}>Masa Berlaku*</Text>
                <TouchableOpacity onPress={() => setIsValidityPeriodVisible(true)} style={{width: '100%', paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: 'black'}} activeOpacity={0.6}>
                  <TextInput style={{fontFamily: 'Inter', fontSize: 20, color: 'black'}} value={form.validityPeriod ? new Date(form.validityPeriod).toLocaleDateString('en-SG', {day: '2-digit', month: '2-digit', year: 'numeric'}) : ''} readOnly />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          {!paramForm && (
            <View style={{marginTop: 32, alignSelf: 'center', width: 122, gap: 18}}>
              <Button onPress={handleSaveOnPress} disabled={!isFormValid || isFormLoading}>Simpan</Button>
              <Button onPress={handleRegisterOtherShipOnPress} disabled={isFormLoading}>Daftar Kapal Lain</Button>
            </View>
          )}
        </View>
      </Main>

      <WeightModal visible={isWeightModalVisible} onRequestClose={() => setIsWeightModalVisible(false)} value={form.weight} onChange={value => setForm({...form, weight: value.weight, fuel: value.fuel})} />
      <DateModal visible={isValidityPeriodVisible} onRequestClose={() => setIsValidityPeriodVisible(false)} title='Masa Berlaku' value={form.validityPeriod} onChange={value => setForm({...form, validityPeriod: value})} />
    </>
  );
};



export { RegisterShip };

