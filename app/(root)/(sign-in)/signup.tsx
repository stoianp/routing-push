import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import AuthContent from '@/components/auth/AuthContent';

export default function SignupScreen() {
  const { t } = useTranslation();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useAuth();

  async function signupHandler(credentials: { email: string, password: string }) {
    setIsAuthenticating(true);
    try {
      authCtx.signUp(credentials.email, credentials.password);
      router.replace("/(root)/(tabs)/one");
    } catch (error) {
      Alert.alert(t("auth.authAlert.title"), t("auth.authAlert.message"));
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={t("auth.signup.message")} />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}
