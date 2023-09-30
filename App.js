import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ButtonAwesome from './components/Button';
import ImageViewer from './components/ImageViewer';
import { CustomModal } from './components/ModalResult';
import { CustomAlert } from './components/ModalAlert';
import { PesoModal } from './components/ModalPeso';
import  IntroSlides  from './components/IntroSlides';

import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_IMAGES_PER_DAY = 10; // Limite máximo de imagens por dia (24 horas)

import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from './components/useLoadFonts';

SplashScreen.preventAutoHideAsync();

import {Amplify} from '@aws-amplify/core';
import {Storage} from '@aws-amplify/storage';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

const PlaceholderImage = require('./assets/images/upload-image.png');

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [shouldShow, setShouldShow] = useState(true);
  const [uploadImage, setUploadImage] = useState(false);
  const [uriImage, setUriImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {fontsLoaded, onLayoutRootView } = useLoadFonts();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isAlertPesoAvailable, setAlertPesoAvailable] = useState(false);
  const [modalText, setModalText] = useState('');
  const [introDone, setIntroDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifique se o tutorial já foi concluído ao iniciar o aplicativo
    AsyncStorage.getItem('tutorialCompleted')
      .then((value) => {
        if (value === 'true') {
          setIntroDone(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao verificar o estado do tutorial:', error);
        setLoading(false);
      });
  }, []);

  const handleIntroDone = async () => {
    // Defina o estado para indicar que a introdução foi concluída
    setIntroDone(true);

    // Armazene a informação de que o tutorial foi concluído
    await AsyncStorage.setItem('tutorialCompleted', 'true');
  };

  if(!fontsLoaded)
    return null;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const closePeso = () => {
    setAlertPesoAvailable(false);
  };

  // Upload image to S3 Bucket//
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }
  const uploadFile = async (file) => {
    setShouldShow(false);
    try {
      // Verifica o número de imagens enviadas nas últimas 24 horas
      const imagesUploadedToday = await getImagesUploadedToday();
      
      if (imagesUploadedToday >= MAX_IMAGES_PER_DAY) {
        setAlertPesoAvailable(true);
        return;
      }
      
      const img = await fetchImageUri(file.uri);
      const uploadResult = await Storage.put(`bode-${Math.random()}.jpg`, img, {
        level: 'public',
        contentType: file.type,
      });
  
      const result = await Storage.get(uploadResult.key);
      const image = result.substring(0, result.indexOf('?'));
      setUriImage(image);
      setUploadImage(true);
  
      // Atualize o contador de imagens enviadas hoje
      await updateImagesUploadedToday(imagesUploadedToday + 1);
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
    }
  };
  
  const getImagesUploadedToday = async () => {
    try {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // Obtém a data no formato "AAAA-MM-DD"
      const key = `imagesUploaded-${dateString}`;
      const value = await AsyncStorage.getItem(key);
      return parseInt(value, 10) || 0;
    } catch (error) {
      console.error('Erro ao obter contador de imagens:', error);
      return 0;
    }
  };
  
  const updateImagesUploadedToday = async (count) => {
    try {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // Obtém a data no formato "AAAA-MM-DD"
      const key = `imagesUploaded-${dateString}`;
      await AsyncStorage.setItem(key, count.toString());
    } catch (error) {
      console.error('Erro ao atualizar contador de imagens:', error);
    }
  };       

  // Pick image from gallery//

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setUploadImage(false);
      uploadFile(result.assets[0]);
    } else {
      setAlertVisible(true);
    }
  };

  // Send image to prediction //

  const requestOptions = {
    method: 'POST',
		headers: {   
      Accept: 'application/json',
     'Content-Type': 'application/json' },
		body: JSON.stringify({link: uriImage})
  };


  const postExample = async () => {
    setIsLoading(true);
    setUploadImage(false);
    try {
      await fetch(
        'https://45xiv4ibx9.execute-api.sa-east-1.amazonaws.com/Prod/ocr/', requestOptions)
        .then(response => {
          response.json()
            .then(response => {
              setIsLoading(false);
              setShouldShow(true);
              const pesoEstimado = response.response;
              const modalText = `Peso estimado do animal: ${pesoEstimado} Kg`;
              setModalText(modalText);
              setModalVisible(true);
              //console.log(response.response);
              //console.log(response.createdAt);
              //Alert.alert("Peso estimado em (Kg):", response.response);
            });
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      {!isLoading && !introDone ? (
        <IntroSlides onDone={handleIntroDone} />
      ) : null}
  
      {!isLoading && introDone ? (
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
  
          {!uploadImage ? (
            <View>
              {shouldShow ? (
                <View style={styles.footerContainer}>
                  <ButtonAwesome theme="primary" label="Escolher imagem" onPress={pickImageAsync} />
                  <CustomModal
                    isVisible={isModalVisible}
                    message={modalText}
                    onOkPressed={toggleModal}
                  />
                  <CustomAlert
                    visible={isAlertVisible}
                    title="Aviso"
                    message="Você precisa escolher uma imagem."
                    onClose={closeAlert}
                  />
                </View>
              ) : null}
  
              {!shouldShow ? (
                <View style={styles.imageContainer}>
                  <View style={styles.footerContainer}>
                    <SafeAreaView>
                      <ActivityIndicator style={styles.indicator} size={'large'} color="#f6ddcc" />
                      <Text style={styles.indicatorText}>Preparando a imagem...</Text>
                    </SafeAreaView>
                    <PesoModal
                      isAvailable={isAlertPesoAvailable}
                      message="Limite diário de pesagens atingido. "
                      onOkClosed={closePeso}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}
  
          {uploadImage ? (
            <View style={styles.footerContainer}>
              <ButtonAwesome theme="tertiary" label="Fazer pesagem" onPress={postExample} />
              <ButtonAwesome theme="secondary" label="Escolher outro animal" onPress={pickImageAsync} />
            </View>
          ) : null}
        </View>
      ) : null}
  
      {isLoading ? (
        <View style={styles.imageContainer}>
          <SafeAreaView>
            <ActivityIndicator style={styles.indicator_upload} size={'large'} color="#F2AF5C" />
            <Text style={styles.indicatorText}>Calculando o peso do animal...</Text>
          </SafeAreaView>
        </View>
      ) : null}
  
      <StatusBar style="auto" />
    </View>
  );
  

}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: "center",
  },
    imageContainer: {
    flex: 1,
  },
    footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
  indicator: { 
    marginTop: 40,
    borderRadius: 18
  },
  indicator_upload: { 
    marginTop: 300,
    borderRadius: 18,
  },
  indicatorText: {
    fontSize: 16,
    marginTop: 22,
    color: '#252940',
    fontFamily: 'Poppins_Regular',
    fontWeight: '400',
    lineHeight: 18,
  },

});