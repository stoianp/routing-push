import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from '../ui/Button';
import Input from '../ui/Input';

export default function AuthForm(props: { isLogin: boolean, onSubmit: any, credentialsInvalid: any }) {
  const { t } = useTranslation();
  
  const [enteredEmail, setEnteredEmail] = useState('test@test.com');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('qwerty123');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = props.credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    props.onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label={t("auth.email")}
          onUpdateValue={(text: string) => {updateInputValueHandler('email', text)}}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          secure={false}
        />
        {!props.isLogin && (
          <Input
            label={t("auth.confirmEmail")}
            onUpdateValue={(text: string) => {updateInputValueHandler('confirmEmail', text)}}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label={t("auth.password")}
          onUpdateValue={(text: string) => {updateInputValueHandler('password', text)}}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!props.isLogin && (
          <Input
            label={t("auth.confirmPassword")}
            onUpdateValue={(text: string) => {updateInputValueHandler('confirmPassword', text)}}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {props.isLogin ? t("auth.login.loginBtn") : t("auth.signup.signupBtn")}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {

  },
  buttons: {
    marginTop: 12,
  },
});
