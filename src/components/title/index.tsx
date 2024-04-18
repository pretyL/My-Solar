import { Text, View } from 'react-native';

import { color } from '../../constants';



type Props = {
  children: string;
  variant?: 'primary' | 'secondary';
};



const Title: React.FC<Props> = ({ children, variant='primary' }): React.ReactElement => {
  return (
    <View style={{alignSelf: 'center', paddingVertical: 2, paddingHorizontal: 32, backgroundColor: color[variant], borderRadius: 8}}>
      <Text style={{fontFamily: 'Jomolhari', fontSize: (variant === 'primary') ? 16 : 24, color: 'black'}}>{children}</Text>
    </View>
  );
};



export { Title };

