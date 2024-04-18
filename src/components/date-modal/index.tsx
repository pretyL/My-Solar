import { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { Button, Modal } from '..';



type Props = {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  value: string;
  onChange: (value: string) => void;
};



const DateModal: React.FC<Props> = ({ visible, onRequestClose, title, value, onChange }): React.ReactElement => {
  const [selectedDate, setSelectedDate] = useState<Date>(value ? new Date(value) : new Date());



  function handleConfirmOnPress() {
    onChange(selectedDate.toISOString());
    onRequestClose();
  }



  return (
    <Modal visible={visible} onRequestClose={onRequestClose} title={title}>
      <View style={{alignItems: 'center', gap: 16}}>
        <DatePicker date={selectedDate} onDateChange={setSelectedDate} mode='date' />

        <Button onPress={handleConfirmOnPress}>Konfirmasi</Button>
      </View>
    </Modal>
  );
};



export { DateModal };

