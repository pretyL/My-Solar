import { Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';



type Props = {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  children: React.ReactElement;
};



const Modal: React.FC<Props> = ({ visible, onRequestClose, title, children }): React.ReactElement => {
  return (
    <RNModal visible={visible} onRequestClose={onRequestClose} transparent={true} animationType='fade'>
      <View style={{flex: 1, backgroundColor: '#404040BF', padding: 32, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '100%', backgroundColor: 'white', padding: 32}}>
          <View style={{marginBottom: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity style={{paddingVertical: 2, paddingHorizontal: 8, borderWidth: 1, borderColor: 'transparent', borderRadius: 4}}>
              <Text style={{fontFamily: 'JomolHari', fontSize: 16, color: 'transparent'}}>X</Text>
            </TouchableOpacity>

            <Text style={{fontFamily: 'JomolHari', fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'center'}}>{title}</Text>

            <TouchableOpacity onPress={onRequestClose} activeOpacity={0.6} style={{paddingVertical: 2, paddingHorizontal: 8, borderWidth: 1, borderColor: 'red', borderRadius: 4}}>
              <Text style={{fontFamily: 'JomolHari', fontSize: 16, color: 'red'}}>X</Text>
            </TouchableOpacity>
          </View>

          {children}
        </View>
      </View>
    </RNModal>
  );
};



export { Modal };

