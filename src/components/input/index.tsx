import type { Input as InputProps } from '../../types';

import { TextInput, View } from 'react-native';



const Input: React.FC<InputProps> = ({ value, onChangeText, type='default', placeholder, hidden, disabled }): React.ReactElement => {
  return (
    <View style={{width: '100%', paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: 'black'}}>
      <TextInput style={{fontFamily: 'Inter', fontSize: 20}} value={value} onChangeText={onChangeText} keyboardType={type} secureTextEntry={hidden} placeholderTextColor='#00000080' placeholder={placeholder} readOnly={disabled} />
    </View>
  );
};



export { Input };

