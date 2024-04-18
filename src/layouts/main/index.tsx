import { Image, SafeAreaView } from 'react-native';

import { bgCircle } from '../../assets/img';



type Props = {
  children: React.ReactElement;
};



const Main: React.FC<Props> = ({ children }): React.ReactElement => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={bgCircle} style={{position: 'absolute'}} />
      {children}
    </SafeAreaView>
  );
};



export { Main };

