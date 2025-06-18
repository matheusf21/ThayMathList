import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image 
          source={require('../assets/eu.jpg')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          ThayMath List
        </Text>
        <Text style={styles.text}>
          Monte sua lista de metas e não esqueça mais
          de fazer o que agrada ao nosso Senhor!!!
        </Text>
        <Link style={styles.button} href={"./app/home"}>
          <Text style={styles.buttonText}>Acessar</Text>
        </Link>
      </View>
      
      <StatusBar style="light" backgroundColor='#000' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF85A1',
  },
  containerImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 230,
    height: 230,
    borderRadius: 115,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    backgroundColor: '#dadada',
    borderTopLeftRadius: 25,
    borderTopRightRadius:25,
    paddingHorizontal: '5%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    position: 'absolute',
    bottom: '10%',
    backgroundColor: '#d4a5f4',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 15,
    width: '60%',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  }
});