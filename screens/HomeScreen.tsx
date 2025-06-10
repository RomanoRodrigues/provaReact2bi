import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import db from '../database/db';
import Contato from '../components/Contato';

export default function HomeScreen({ navigation /*se navega tem q ter esse bagui */}) {
  const [contatos, setContatos] = useState([]);

  const carregar = async () => {
    const lista = await db.getAllAsync('SELECT * FROM contatos ORDER BY nome'); //puxa os contato do banco
    setContatos(lista); //contatos agora ta atualizado
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregar); //se voltou pra essa pagina ent executa o carregar
    return unsubscribe; //desativa o listener pra nao rodar infinitamente
  }, [navigation]); //define q sempre q o nagivation mudar ele corre

  return (
    <View style={styles.container}>
      <FlatList /*babiba de lista */
        data={contatos} /*define q o que vai ser exibido é a lista de contato */
        keyExtractor={(item) => item.id.toString()} /*bota id pra cada item na lista */
        renderItem={({ item }) => ( /*pega o modelo "contato" e cria um por item q tem no banco */
          <Contato dados={item} recarregar={carregar} navigation={navigation} />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus" /*botao pra add */
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
