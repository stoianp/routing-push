import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { useAuth } from '@/providers/AuthProvider';
import AuthContent from '@/components/auth/AuthContent';
import { router } from 'expo-router';


export default function LoginScreen() {
  const { t } = useTranslation();
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useAuth();

  async function loginHandler(credentials: { email: string, password: string }) {
    setIsAuthenticating(true);
    
    try {
      const res = authCtx.signIn(credentials.email, credentials.password);
      router.replace("/(root)/(tabs)/one");
    } catch (error) {
      Alert.alert(t("auth.authAlert.title"), t("auth.authAlert.message"));
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={t("auth.login.message")} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
