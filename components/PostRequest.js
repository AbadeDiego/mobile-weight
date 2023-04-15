import React from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';


const PostRequest = () => {

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ postName: 'React updates ' })
	};

	const postExample = async () => {
		try {
			await fetch(
				'https://reqres.in/api/posts', requestOptions)
				.then(response => {
					response.json()
						.then(data => {
							Alert.alert("Peso estimado em Kg : ",
							data.createdAt);
						});
				})
		}
		catch (error) {
			console.error(error);
		}
	}

	return (
		<View>
		  <Button
  			style={styles.buttonStyle}
  			mode="container"
  			contentStyle={styles.buttonContentStyle} onPress={postExample}
		    >	
  		    <Icon name="balance-scale" size={19} color="#fff" />
  		    <View style={{ width: 16, height: 1 }} />
            <Text style={styles.buttonTextStyle}>Fazer pesagem</Text>
		  </Button>
		</View>

	)

}

export default PostRequest;

const styles = StyleSheet.create({
	buttonContentStyle: {
		width: 310,
		height: 68,
		marginHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		backgroundColor: '#F4A460',
		borderWidth: 5,
		borderColor: '#DCDCDC', 
		borderRadius: 18
	  },
	buttonStyle: {
		borderRadius: 10,
		width: '82%',
		height: '40%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
			
	},
	buttonTextStyle: {
	  color: '#fff',
	  fontSize: 16,
	},
})

/*

		<View style={styles.btn}>
			<Button icon="weight-kilogram" textColor="#ffffff"	buttonColor= "#ffffff" mode="outlined " dark="false" onPress={postExample} >
				Fazer pesagem</Button>
		</View>
*/