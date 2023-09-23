import React, { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ButtonAwesome from './components/Button';
import ImageViewer from './components/ImageViewer';
import { CustomModal } from './components/ModalResult';
import { CustomAlert } from './components/ModalAlert';


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

  if(!fontsLoaded)
    return null;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  
  const closeAlert = () => {
    setAlertVisible(false);
  };

  // Upload image to S3 Bucket//
  const fetchImageUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }       
  const uploadFile = async (file) => {
    setShouldShow(false);
    const img = await fetchImageUri(file.uri);
    return Storage.put(`bode-${Math.random()}.jpg`, img, {
      level:'public',
      contentType:file.type,
    })
    .then((res) => {
      Storage.get(res.key)
      .then((result) => {
        var image = result.substring(0,result.indexOf('?'));
        setUriImage(image);
        setUploadImage(true);
      })
      .catch(e => {
        console.log(e);
      })
    }).catch(e => {
      console.log(e);
    })
  }
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
        'https://reqres.in/api/posts', requestOptions)
        .then(response => {
          response.json()
            .then(response => {
              setIsLoading(false);
              setShouldShow(true);
              console.log(response.createdAt);
              setModalVisible(true);
              //console.log(response);
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

    {!isLoading ? (
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
       
        {!uploadImage ? (<View>  

        
        {shouldShow ? (
          <View style={styles.footerContainer}>
            <ButtonAwesome theme="primary" label="Escolher imagem"  onPress={pickImageAsync} />
            <CustomModal
            isVisible={isModalVisible}
            message="Peso estimado do animal: 15.70 Kg"
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
                <ActivityIndicator  style={styles.indicator} size={'large'} color="#f6ddcc"/>
                <Text style={styles.indicatorText}>Preparando a imagem...</Text>
              </SafeAreaView>
            </View>
          </View>

        ) : null}

        </View>) : null}


        {uploadImage ? (
          <View style={styles.footerContainer}>
            <ButtonAwesome theme="tertiary" label="Fazer pesagem"  onPress={postExample} />
            <ButtonAwesome theme="secondary" label="Escolher outro animal"  onPress={pickImageAsync} />
          </View>
        ) : null}

      </View>
     ) : null}

   {isLoading ? (
     <View style={styles.imageContainer}>
        <SafeAreaView>
          <ActivityIndicator  style={styles.indicator_upload} size={'large'} color="#F2AF5C"/>
          <Text style={styles.indicatorText}>Calculando o peso do animal...</Text>
        </SafeAreaView>
     </View>
     
   ) : null }

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

