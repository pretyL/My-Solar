import type { Input as InputProps } from '../../types';

import { Text, View } from 'react-native';

import { Input } from '../../components';



type Props = {
  label: string;
} & InputProps;



const CustomInput: React.FC<Props> = (props): React.ReactElement => {
  return (
    <View style={{gap: -16}}>
      <Text style={{fontFamily: 'Jomolhari', fontSize: 20, color: 'black'}}>{props.label}</Text>
      <Input {...props} />
    </View>
  );
};



export { CustomInput };
