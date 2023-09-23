import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ButtonAwesome({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View
        style={[ styles.buttonContainer, ]}>
        <Pressable style={[styles.button, { backgroundColor: '#F2AF5C' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>      
    );
  } else if (theme === "secondary"){
  return (
      <View
      style={[ styles.buttonContainer, ]}>
      <Pressable style={[styles.button, { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#F2AF5C' }]} onPress={onPress}>
        <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel]}>{label}</Text>
      </Pressable>
    </View>     
    );
  } else if (theme === "tertiary") {
  return (
    <View
      style={[ styles.buttonContainer, ]}>
      <Pressable style={[styles.button, { backgroundColor: '#F2AF5C' }]} onPress={onPress}>
        <FontAwesome name="balance-scale" size={18} color="#25292e" style={styles.buttonIcon} />
        <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
      </Pressable>
    </View>      
  );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 328,
    height: 60,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#252940',
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
