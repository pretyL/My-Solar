import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';

import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';

import { Title } from '../../assets/svg';



type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;



const msToReplaceScreen: number = 350;



const Splash: React.FC<Props> = ({ navigation }): React.ReactElement => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, msToReplaceScreen);
  }, []);
  

  
  return (
    <LinearGradient style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24}} colors={['#14C7FF', '#FFF1A8']}>
      <Title width='100%' />
    </LinearGradient>
  );
};



export { Splash };

