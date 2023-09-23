
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert, ActivityIndicator, SafeAreaView, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ButtonAwesome from './components/Button';
import ImageViewer from './components/ImageViewer';
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Amplify} from '@aws-amplify/core';
import {Storage} from '@aws-amplify/storage';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);


const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {


  const [selectedImage, setSelectedImage] = useState(null);
  const [shouldShow, setShouldShow] = useState(true);
  const [uploadImage, setUploadImage] = useState(false);
  const [uriImage, setUriImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


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
      //alert("Preparando a imagem. Pode levar alguns segundos.");//
      setUploadImage(false);
      uploadFile(result.assets[0]);
    } else {
      alert("Você precisa escolher uma imagem.");
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
    alert("A pesagem pode levar até 29 segundos.");
    setIsLoading(true);
    setUploadImage(false);
    try {
      await fetch(
        'https://smipfhd8n6.execute-api.us-east-1.amazonaws.com/Prod/ocr/', requestOptions)
        .then(response => {
          response.json()
            .then(response => {
              setIsLoading(false);
              setShouldShow(true);
              console.log(response);
              Alert.alert("Peso estimado em (Kg):", response.response);
            });
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  

  return (
  <View style={styles.container}>

    {!isLoading ? (
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
       
        {!uploadImage ? (<View>  

        
        {shouldShow ? (
          <View style={styles.footerContainer}>
            <ButtonAwesome theme="primary" label="Escolher imagem"  onPress={pickImageAsync} />
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
            <ButtonAwesome theme="primary" label="Escolher outra imagem"  onPress={pickImageAsync} />
            <View>
              <Button
                style={styles.buttonStyle}
                mode="container"
                contentStyle={styles.buttonContentStyle}  onPress={postExample}>	
                <Icon name="balance-scale" size={19} color="#fff" />
                <View style={{ width: 16, height: 1 }} />
                <Text style={styles.buttonTextStyle}>Fazer pesagem</Text>
              </Button>
            </View>
          </View>
        ) : null}

      </View>
     ) : null}

   {isLoading ? (
     <View style={styles.imageContainer}>
          <SafeAreaView>
            <ActivityIndicator  style={styles.indicator} size={'large'} color="#f6ddcc"/>
            <Text style={styles.indicatorText}>Calculando o peso...</Text>
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
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: "center",
  },
    imageContainer: {
    flex:1, 
    paddingTop: 58
  },
    footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
    buttonContentStyle: {
    width: 310,
    height: 68,
    marginHorizontal: 4,
    marginVertical:0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: '#F4A460',
    borderWidth: 4,
    borderColor: '#DCDCDC', 
    borderRadius: 18
    },
    buttonStyle: {
    borderRadius: 10,
    width: '60%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
      
  },
    buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
  indicator: { 
    marginTop: 300,
    padding: 10,
    backgroundColor: '#F4A460',
    borderRadius: 18
  },
  indicator_upload: { 
    marginTop: 300,
    padding: 10,
    backgroundColor: '#F4A460',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: "center",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
   color: '#fff',

  },

});

