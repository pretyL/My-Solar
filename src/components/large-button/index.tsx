import { Text, TouchableOpacity } from 'react-native';

import { color } from '../../constants';



type Props = {
  children: string;
  onPress: () => void;
};



const LargeButton: React.FC<Props> = ({ children, onPress }): React.ReactElement => {
  return (
    <TouchableOpacity style={{backgroundColor: color.primary, paddingVertical: 52, paddingHorizontal: 12, borderRadius: 10, flex: 1, justifyContent: 'center'}} onPress={onPress} activeOpacity={0.6}>
      <Text style={{fontFamily: 'Jomolhari', fontSize: 16, color: 'black', textAlign: 'center'}}>{children}</Text>
    </TouchableOpacity>
  );
};



export { LargeButton };

