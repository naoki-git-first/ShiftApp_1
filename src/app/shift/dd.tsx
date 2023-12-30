import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Timestamp } from 'firebase/firestore'; // FirestoreのTimestamp型を使用

const MyComponent = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [timestampValue, setTimestampValue] = useState(null);

  const convertToTimestamp = () => {
    const dateObject = new Date(textInputValue);
    const timestamp = Timestamp.fromDate(dateObject);
    setTimestampValue(timestamp);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter a date"
        value={textInputValue}
        onChangeText={(text) => setTextInputValue(text)}
      />
      <Button title="Convert to Timestamp" onPress={convertToTimestamp} />
      {timestampValue && (
        <View>
          <Text>Converted Timestamp:</Text>
          <Text>{timestampValue.toDate().toString()}</Text>
        </View>
      )}
    </View>
  );
};

export default MyComponent;
