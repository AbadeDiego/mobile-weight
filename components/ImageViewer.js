import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({  
  image: {
    flex: 1,
    width: 512,
    height: 450,
    resizeMode: "cover",
    borderRadius: 8,
  },
});