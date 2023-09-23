import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

export function CustomAlert({ visible, title, message, onClose}) {
  const modalContent = (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      {modalContent}
    </Modal>
  );
};

const styles = {
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: 329,
    height: 193,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.8)', // Cor da sombra
    shadowOpacity: 1, 
    shadowRadius: 8, 
    elevation: 5, 
  },
  title: {
    color: '#252940',
    fontFamily: 'Poppins_Medium',
    fontSize: 20,
    fontWeight: '700',
  },
  line: {
    height: 1, // Altura da linha
    width: 329, // Largura da linha
    marginTop: 20, // Margem do topo da imagem
    backgroundColor: '#ECECED', // Cor da linha
    paddingLeft:0,
  },
  message: {
    color: '#252940',
    fontFamily: 'Poppins_Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
    marginTop: 28,
  },
  button: {
    width: 297,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 175, 92, 0.97)',
    borderRadius: 5,
    marginTop: 18,      
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_Medium',
  },
};