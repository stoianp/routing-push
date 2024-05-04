import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

export default function Input(props: {
  label?: string,
  keyboardType?: KeyboardTypeOptions,
  secure?: boolean,
  onUpdateValue: (text: string) => void,
  value?: string,
  isInvalid?: boolean,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, props.isInvalid && styles.labelInvalid]}>
        {props.label}
      </Text>
      <TextInput
        style={[styles.input, props.isInvalid && styles.inputInvalid]}
        //autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={props.keyboardType}
        secureTextEntry={props.secure}
        onChangeText={text => props.onUpdateValue(text)}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error100,
  },
});
