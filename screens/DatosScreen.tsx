import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { auth } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";
import { Audio } from "expo-av";

const DatosScreen = ({ navigation }: any) => {

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sound.mp3/register.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  useEffect(() => {
    playSound();

    return () => {
      stopSound();
    };
  }, []);


    
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
      } else {
        // No user is signed in.
        setCurrentUser(null);
      }
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/c0/0c/16/c00c160278e73916660d1da3e2b34f03.jpg' }} // Reemplaza con la URL de tu imagen de galaxia
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Datos del Usuario</Text>
        {currentUser ? (
          <View style={styles.usuarioContainer}>
            <Text style={styles.text}>Email: {currentUser.email}</Text>
          </View>
        ) : (
          <Text style={styles.text}>No hay usuario autenticado</Text>
        )}
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Game")}>
          <Text style={styles.buttonText}>Iniciar a jugar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Menu")}>
          <Text style={styles.buttonText}>Volver al Menú</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("ModeSelection")}>
          <Text style={styles.buttonText}>Volver Modo Seleccion</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  usuarioContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0f0f0f",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  menuButton: {
    backgroundColor: "#0f0f0f",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
  },
});

export default DatosScreen;
