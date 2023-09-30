import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

export function PesoModal({ isAvailable, message, onOkClosed }) {
 
  const handleOkClosed = () => {
    onOkClosed();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAvailable}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require('../assets/images/unavailable.png')} // Substitua pelo caminho da sua imagem
            style={styles.image}
          />
          <View style={styles.line} />
          <Text style={styles.modalTitle}>Pesagem indisponível</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={handleOkClosed} style={styles.okButton}>
            <Text style={styles.okButtonText}>OK, entendi.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.86,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: 329,
    height: 375,
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
    marginBottom: 15, 
    marginClosed: 20, // Margem do topo da imagem
    backgroundColor: '#ECECED', // Cor da linha
  },
  image: {
    width: 80,
    height: 80,
  },
  modalText: {
    color: '#252940',
    fontFamily: 'Poppins_Regular',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
    marginTop: 25
  },
  okButton: {
    width: 297,
    height: 40,
    padding: 8,
    backgroundColor: 'rgba(242, 175, 92, 0.97)',
    borderRadius: 5,
    marginTop: 30,
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