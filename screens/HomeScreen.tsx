import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import db from '../database/db';
import Contato from '../components/Contato';

export default function HomeScreen({ navigation }) {
  const [contatos, setContatos] = useState([]);

  const carregar = async () => {
    const lista = await db.getAllAsync('SELECT * FROM contatos ORDER BY nome');
    setContatos(lista);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregar);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Contato dados={item} recarregar={carregar} navigation={navigation} />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Adicionar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
