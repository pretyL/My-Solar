import { Image, TouchableOpacity, View } from 'react-native';

import { arrowLeft } from '../../assets/img';



type Props = {
  handleArrowLeftOnPress: () => void;
};



const Header: React.FC<Props> = ({ handleArrowLeftOnPress }): React.ReactElement => {
  return (
    <View style={{marginTop: 28}}>
      <TouchableOpacity onPress={handleArrowLeftOnPress} activeOpacity={0.6}>
        <Image source={arrowLeft} />
      </TouchableOpacity>
    </View>
  );
};



export { Header };
