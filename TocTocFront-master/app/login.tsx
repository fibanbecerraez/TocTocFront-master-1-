import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import AppButton from "../components/AppButton";
import Toast from "../components/Toast";
import TextField from "../components/TextField";
import RegexManager from "../utils/Regex";
import Spacer from "../components/Spacer";
import { signIn } from "../config/api";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { styles } from "./login.styles";

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStyle, setToastStyle] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation();

  const emailRegex = RegexManager.getRegex("email");
  const passwordRegex = RegexManager.getRegex("password");

  const showErrorToast = (errorMessage) => {
    setToastStyle("failure");
    setToastMessage(errorMessage);
    setToastVisible(true);
  };

  const showSuccessToast = (successMessage) => {
    setToastStyle("success");
    setToastMessage(successMessage);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleLoginGoogle = () => {
    Alert.alert("No implementado aún");
  };

  const handePasswordRecovery = () => {
    router.push("/recoveryPass");
  };

  const handleAuth = async () => {
    if (!email) {
      showErrorToast("Ingresa una dirección de correo válida");
      return;
    }
    if (!password || !passwordRegex.test(password)) {
      showErrorToast(
        "La contraseña debe tener al menos 6 caracteres y una mayúscula"
      );
      return;
    }

    try {
      await signIn(email, password);
      showSuccessToast("Inicio de sesión exitoso");
      router.replace("/homeScreen");
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("login_title")}</Text>

      <Spacer />

      <TextField
        placeholder={t("email_description")}
        title={t("email")}
        value={email}
        secureTextEntry={false}
        onChangeText={setEmail}
      />
      <TextField
        placeholder={t("password_conditions")}
        title={t("password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        validationRegex={passwordRegex}
      />

      <Spacer />

      <AppButton title={t("login")} styleType="normal" onPress={handleAuth} />
      <View style={{ height: 20 }} />
      <AppButton
        title={t("login_google")}
        styleType="normal"
        icon="google"
        onPress={handleLoginGoogle}
      />
      <View style={{ height: 20 }} />

      <Spacer />

      <Text style={styles.subtitle}>¿Olvidaste tu contraseña?</Text>
      <AppButton
        title="Recuperar contraseña"
        styleType="normal"
        onPress={handePasswordRecovery}
      />

      <Toast
        message={toastMessage}
        visible={toastVisible}
        toastStyle={toastStyle}
        onClose={hideToast}
      />
    </View>
  );
}