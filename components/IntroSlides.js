import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const IntroSlides = ({ onDone }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: 'Pré-lançamento (versão teste)', 
      image: require('../assets/images/slide1.png'),
      text: 'Siga os passos seguintes para utilizar a ferramenta corretamente.',
    },
    {
      title: '1º Tire uma foto com a câmera do seu celular', 
      image: require('../assets/images/slide2.png'),
      text: 'A foto deve ser tirada 1 metro da vista superior do animal.',
    },
    {
      title: '2º Ajuste as dimensões da foto', 
      image: require('../assets/images/slide3.png'),
      text: 'Selecione apenas o tronco do animal, a cabeça e o rabo devem ser cortados.',
    },
  ];

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={false}
        onIndexChanged={handleIndexChanged}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.headerContainer}>
              <Image
                source={require('../assets/images/balance.png')}
                style={styles.icon}
              />
              <Text style={styles.header}>Pesagem automática</Text>
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.text}>{slide.text}</Text>
            {index > 0 && (
              <TouchableOpacity onPress={handlePrevSlide} style={styles.prevButton}>
                <Text style={styles.labelButton}>Anterior</Text>
              </TouchableOpacity>
            )}
            {index === slides.length - 1 && (
              <TouchableOpacity onPress={onDone} style={styles.startButton}>
                <Text style={[styles.labelButton, { color: '#FFFFFF' }]}>Começar</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
      {currentIndex !== slides.length - 1 && (
        <TouchableOpacity onPress={handleNextSlide} style={styles.nextButton}>
          <Text style={styles.labelButton}>Próximo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
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
  image: {
    width: 328,
    height: 184, 
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.1,
    marginTop: 90,

    width: 328,
    marginVertical: 10,
    textAlign: 'center',
    color: '#252940',
    fontFamily: 'Poppins_Medium',
  },
  text: {
    width: 328,
    marginVertical: 20,
    textAlign: 'center',
    color: '#252940',
    fontFamily: 'Poppins_Regular',
  },
  labelButton:{
    fontFamily: 'Poppins_Medium', 
  },
  startButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 45,

    bottom: 20,
    right: 20,
    backgroundColor: '#038520',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  prevButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 45,
    bottom: 20,
    left: 20,

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', 
    borderWidth: 2, 
    borderColor: '#F2AF5C'
  },
  nextButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 45,
    bottom: 20,
    right: 20,

    backgroundColor: '#F2AF5C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    fontFamily: 'Poppins_Regular',
  },
});

export default IntroSlides;
