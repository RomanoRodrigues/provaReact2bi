import { Linking, View, Text, Button } from 'react-native';
import React from 'react';
import db from '../database/db';

export default function Contato({ dados, recarregar, navigation }) {
  const excluir = async () => {
    await db.runAsync('DELETE FROM contatos WHERE id = ?', dados.id);
    recarregar();
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>{dados.nome}</Text>
      <Text>{dados.telefone}</Text>
      <Button title="Ligar" onPress={() => Linking.openURL(`tel:${dados.telefone}`)} /> {/*tu q passou essa bomba*/}
      <Button title="Alterar" onPress={() => navigation.navigate("Alterar", { contato_id: dados.id })} /> {/* abre a pagina alterar com o id especifico dele*/}
      <Button title="Excluir" onPress={excluir} />
    </View>
  );
}
