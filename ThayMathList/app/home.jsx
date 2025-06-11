import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemFromDevice();
  }, []);

  useEffect(() => {
    saveItemToDevice();
  }, [items]);

  const getItemFromDevice = async ()=> {
    try {
      const itemsMemory = await AsyncStorage.getItem('ThayMathList');
      if (itemsMemory != null) {
        setItems(JSON.parse (itemsMemory));
      }
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const saveItemToDevice = async () => {
    try {
      const itemsJson = JSON.stringify(items);
      await AsyncStorage.setItem('ThayMathList', itemsJson);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  };
  

  const addItem = () => {
    if (textInput == '') {
      Alert.alert(
        'Ocorreu um problema :(',
        'Por favor, insira sua meta.'
      );
    } else {
      const newItem = {
        id: Date.now().toString(),
        name: textInput,
        bought: false
      }
      setItems([...items, newItem]);
      setTextInput('');
    }
  }

  const markItemBought = itemId => {
    const newItems = items.map((item) => {
      if (item.id == itemId) {
        return { ...item, bought: true}
      }
      return item;
    });
    setItems(newItems);
  }

  const unmarkItemBought = itemId => {
    const newItems = items.map((item) => {
      if (item.id == itemId) {
        return { ...item, bought: false}
      }
      return item;
    });
    setItems(newItems);
  }

  const removeItem = itemId => {
    Alert.alert(
      'Excluir meta?', 'Confirma a exclusão dessa meta?',
      [
        {
          text: 'Sim', onPress: () => {
            const newItems = items.filter(item => item.id != itemId)
            setItems(newItems);
          }
        },
        {
          text: 'Cancelar', style: 'cancel'
        }
      ]
    )
  }

  const removeAll = () => {
    Alert.alert(
      "Limpar Lista?", "Confirma a exclusão de todos as metas?",
      [
        {
          text: 'Sim',
          onPress: () => { setItems([]) }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }


  return (
    <SafeAreaView style={{ flex: 1}}>
      <ImageBackground 
        source={require('../assets/background.png')}
        style={{flex: 1, justifyContent: 'flex-start'}}
        resizeMode='repeat'
      >
        <View style={styles.header}>
          <Text style={styles.title}>Metas espirituais</Text>
          <Ionicons name="trash" size={32} color="#fff" onPress={removeAll} />
        </View>

        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100, color:'#fff'}}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <ItemList
              item={item}
              markItem={markItemBought}
              unmarkItem={unmarkItemBought}
              removeItem={removeItem}
            />
          }
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              color="#fff"
              fontSize={18}
              placeholder='Qual a sua meta?'
              placeholderTextColor='#aeaeae'
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={addItem}>
            <Ionicons name='add' size={36} color='#fff' />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D4A5F480',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#D4A5F480',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputContainer: {
    backgroundColor: "#FF85A1",
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#FF85A1',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})