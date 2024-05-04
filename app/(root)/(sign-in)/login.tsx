import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import AuthContent from '../../../components/auth/AuthContent';
import LoadingOverlay from '../../../components/ui/LoadingOverlay';

export default function LoginScreen() {
  const { t } = useTranslation();
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // const authCtx = useContext(AuthContext);

  async function loginHandler(credentials: { email: string, password: string }) {
    setIsAuthenticating(true);
    try {
      // const data = await login(credentials.email, credentials.password);
      // authCtx.authenticate(data);
    } catch (error) {
      Alert.alert(t("auth.authAlert.title"), t("auth.authAlert.message"));
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={t("auth.login.message")} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
