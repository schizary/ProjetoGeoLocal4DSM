import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";

export default function Maps({ route }) {
  const { coords, errorMsg } = useLocation();
  
  // Recebe a lista de usuários da navegação
  const usuarios = route.params?.usuarios || [];

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}> {errorMsg} </Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando localização...</Text>
      </View>
    );
  }

  // Determina a região inicial do mapa
  const getInitialRegion = () => {
    if (usuarios.length > 0) {
      // Se há usuários, usa as coordenadas do primeiro usuário
      return {
        latitude: usuarios[0].coordenadas.latitude,
        longitude: usuarios[0].coordenadas.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    } else {
      // Se não há usuários, usa a localização atual
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com informações */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {usuarios.length > 0 
            ? `${usuarios.length} usuário(s) no mapa` 
            : 'Nenhum usuário cadastrado'}
        </Text>
      </View>

      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={getInitialRegion()}
        showsUserLocation={true}
      >
        {/* Marcador da localização atual */}
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude
          }}
          title="Sua Localização"
          description="Você está aqui"
          pinColor="blue"
        />

        {/* Marcadores dos usuários cadastrados */}
        {usuarios.map((usuario) => (
          <Marker
            key={usuario.id}
            coordinate={usuario.coordenadas}
            title={usuario.nome}
            description={usuario.endereco}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  header: {
    backgroundColor: '#a021bfff',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});