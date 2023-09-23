import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

export function CustomModal({ isVisible, message, onOkPressed }) {
 
  const handleOkPressed = () => {
    onOkPressed();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require('../assets/images/sucess.png')} // Substitua pelo caminho da sua imagem
            style={styles.image}
          />
          <View style={styles.line} />
          <Text style={styles.modalTitle}>Pesagem realizada!</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={handleOkPressed} style={styles.okButton}>
            <Text style={styles.okButtonText}>Fazer nova pesagem</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 4/5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: 329,
    height: 330,
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.8)', // Cor da sombra
    shadowOpacity: 1, 
    shadowRadius: 10, 
    elevation: 5, 
  },
    modalTitle: {
    color: '#252940',
    fontFamily: 'Poppins_Medium',
    fontSize: 20,
    fontWeight: '500',
  },
  line: {
    height: 1, // Altura da linha
    width: 328, // Largura da linha
    marginTop: 25, // Margem do topo da imagem
    marginBottom: 20, // Margem do topo da imagem
    backgroundColor: '#ECECED', // Cor da linha
  },
  image: {
    width: 67,
    height: 67,
  },
  modalText: {
    color: '#252940',
    fontFamily: 'Poppins_Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
    marginTop: 20
  },
  okButton: {
    width: 297,
    height: 40,
    padding: 8,
    backgroundColor: 'rgba(242, 175, 92, 0.97)',
    borderRadius: 5,
    marginTop: 18,
    alignItems: 'center', // Centraliza os elementos horizontalmente
    justifyContent: 'center', // Centraliza os elementos verticalmente
  },
  okButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins_Medium',
  },
});