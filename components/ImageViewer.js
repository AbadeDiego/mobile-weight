import React from 'react';
import { StyleSheet, ImageBackground, View, Text, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/balance.png')} // Substitua pelo caminho do seu ícone
          style={styles.icon}
        />
        <Text style={styles.header}>Pesagem automática</Text>
      </View>
      <Text style={styles.subtitle}>Envie uma imagem do seu animal</Text>
      <ImageBackground source={imageSource} style={styles.image} resizeMode="contain" ></ImageBackground>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0, // Altura do topo desejada
    alignItems: 'center', // Centraliza os elementos na horizontal
  },
  headerContainer: {
    flexDirection: 'row', // Alinha os elementos na horizontal
    alignItems: 'center', // Centraliza verticalmente
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 40,
    paddingTop: 35,
    width: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.7)', // Cor da sombra
    shadowOpacity: 1, // Opacidade da sombra
    shadowRadius: 8, // Raio da sombra
    elevation: 7, // Elevação para dispositivos Android
  },
  icon: {
    width: 40, // Largura do ícone
    height: 40, // Altura do ícone
    marginRight: 15, // Espaço entre o ícone e o texto
    marginTop: 30,
  },
  header: {
    color: '#252940',
    fontSize: 21,
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.1,
    marginTop: 30,
    fontFamily: 'Poppins_Medium',
  },
  subtitle: {
    marginTop: 30,
    marginLeft: 65,
    marginBottom: 10,
    fontSize: 15, 
    width: 328,
    color: 'rgba(37, 41, 64, 0.80);',
    fontWeight: '300',
    lineHeight: 18,
    letterSpacing: 0.2,
    fontFamily: 'Poppins_Regular'
  },
  image: {
    width: 328,
    height: 184, // Altura da imagem
    borderRadius: 10,
  },
  line: {
    height: 1, // Altura da linha
    width: 328, // Largura da linha
    marginLeft: 16, // Margem esquerda
    marginRight: 16, // Margem direita
    marginTop: 25, // Margem do topo da imagem
    marginBottom: 20, // Margem do topo da imagem
    backgroundColor: '#ECECED', // Cor da linha
  },
});
