import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { signUp, signIn } from "../config/api";
import { router } from "expo-router";
import AppButton from "../components/AppButton";
import Toast from "../components/Toast";
import TextField from "../components/TextField";
import ColorManager from "../utils/ColorManager";
import RegexManager from "../utils/Regex";
import Spacer from "../components/Spacer";
import Divider from "../components/Divider";
import DropdownPicker from "../components/DropdownPicker";

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStyle, setToastStyle] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  const handleSignupGoogle = () => {
    Alert.alert("No implementado aún");
  };

  const handleSignup = async () => {
    if (!email || !emailRegex.test(email)) {
      showErrorToast("Ingresa una dirección de correo válida");
      return;
    }
    if (!firstName) {
      showErrorToast("El campo Nombre es obligatorio");
      return;
    }
    if (!lastName) {
      showErrorToast("El campo Apellido es obligatorio");
      return;
    }
    if (!selectedOption) {
      showErrorToast("Selecciona una opción en Género");
      return;
    }
    if (!password || !passwordRegex.test(password)) {
      showErrorToast(
        "La contraseña debe tener al menos 6 caracteres y una mayúscula"
      );
      return;
    }

    try {
      const result = await signUp(
        firstName,
        lastName,
        email,
        password,
        selectedOption
      );
      console.log(result);
      Alert.alert("Exito", "Registro exitoso");
      await signIn(email, password);
      router.replace('/homeScreen');
      console.log("Token de inicio de sesión:", result.token);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <Spacer />

      <TextField
        placeholder="Tu dirección de correo personal"
        title="Email"
        value={email}
        secureTextEntry={false}
        mandatory={true}
        onChangeText={setEmail}
        validationRegex={emailRegex}
        errorMessage="Ingresa una dirección de correo válida"
      />
      <TextField
        placeholder="Tu nombre"
        title="Nombre"
        value={firstName}
        mandatory={true}
        onChangeText={setFirstName}
        secureTextEntry={false}
      />
      <TextField
        placeholder="Tu apellido"
        title="Apellido"
        value={lastName}
        mandatory={true}
        onChangeText={setLastName}
        secureTextEntry={false}
      />
      <DropdownPicker
        title="Género"
        options={["Masculino", "Femenino", "Otro"]}
        selectedValue={selectedOption}
        onValueChange={(value) => setSelectedOption(value)}
      />
      <TextField
        placeholder="Mínimo 6 caracteres y una mayúscula"
        title="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        mandatory={true}
        validationRegex={passwordRegex}
        errorMessage="Debe tener al menos 6 caracteres y una mayúscula"
      />

      <AppButton
        title={"Registrarme"}
        styleType="normal"
        onPress={handleSignup}
      />

      <Text style={styles.disclaimer}>
        Al hacer clic en "Registrarte", aceptas nuestras Condiciones, la
        Política de privacidad y la Política de cookies. Es posible que te
        enviemos notificaciones por SMS, que puedes desactivar cuando quieras.
      </Text>

      <Divider />
      <AppButton
        title="Registrarme con Google"
        styleType="normal"
        icon="google"
        onPress={handleSignupGoogle}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: ColorManager.getColor("lightBg"),
  },
  title: {
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 30,
    marginTop: 30,
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  disclaimer: {
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  toggleText: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
  message: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});
