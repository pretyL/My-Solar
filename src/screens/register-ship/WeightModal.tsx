import { Text, TouchableOpacity, View } from 'react-native';

import { Modal } from '../../components';
import { color } from '../../constants';



type Props = {
  visible: boolean;
  onRequestClose: () => void;
  value: number;
  onChange: ({weight, fuel}: {weight: number, fuel: number}) => void;
};



const optionList: {weight: number, fuel: number}[] = [
  { weight: 5, fuel: 1800 },
  { weight: 10, fuel: 2000 },
  { weight: 15, fuel: 3000 },
  { weight: 20, fuel: 4000 },
  { weight: 25, fuel: 5000 },
  { weight: 30, fuel: 8000 }
];



const WeightModal: React.FC<Props> = ({ visible, onRequestClose, value, onChange }): React.ReactElement => {
  function handleOptionOnPress(weight: Props['value'], fuel: Props['value']) {
    onChange({weight, fuel});
    onRequestClose();
  }


  
  return (
    <Modal visible={visible} onRequestClose={onRequestClose} title='Gross Tonnage (GT)'>
      <View style={{gap: 16}}>
        {optionList.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => handleOptionOnPress(option.weight, option.fuel)} activeOpacity={0.6} style={{backgroundColor: (value === option.weight) ? color.primary : 'white', borderWidth: 1, padding: 12, borderRadius: 4}}>
            <Text style={{fontFamily: 'JomolHari', fontSize: 16, color: 'black', textAlign: 'center'}}>{option.weight} GT</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};



export { WeightModal };

