import { Text, TouchableOpacity } from 'react-native';

import { color } from '../../constants';



type Props = {
  children: React.ReactElement | string;
  onPress: () => void;
  disabled?: boolean;
};



const Button: React.FC<Props> = ({ children, onPress, disabled }): React.ReactElement => {
  return (
    <TouchableOpacity style={{width: '100%', backgroundColor: color.bgPrimary}} onPress={onPress} disabled={disabled} activeOpacity={0.6}>
      {typeof children === 'string' ? (
        <Text style={{fontFamily: 'Inter', fontSize: 12, color: 'black', paddingVertical: 4, paddingHorizontal: 16, textAlign: 'center'}}>{children}</Text>
      ) : children}
    </TouchableOpacity>
  );
};



export { Button };

