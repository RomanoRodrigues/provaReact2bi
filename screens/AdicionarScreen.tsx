import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import db from '../database/db';

export default function AdicionarScreen({ navigation/*nao precisa de route pq o id nao é extraido */}) {
  const [nome, setNome] = useState(''); //mema pica do alterar
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  const salvar = async () => {
    if (!nome || !telefone) return; //se faltar dado volta pra corrigir
    await db.runAsync('INSERT INTO contatos (nome, telefone) VALUES (?, ?)', nome, telefone); //coloca o caba novo no banco
    navigation.goBack(); //volta pagina
  };

//mesma coisa do alterar
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, erro && !nome ? styles.errorInput : null]}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />
        {!nome && erro ? (
          <Text style={styles.errorMessage}>Campo obrigatório</Text>
        ) : null}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={[styles.input, erro && !telefone ? styles.errorInput : null]}
          placeholder="Digite o telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        {!telefone && erro ? (
          <Text style={styles.errorMessage}>Campo obrigatório</Text>
        ) : null}
      </View>

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eefafa',
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingHorizontal: 8,
  },
  errorInput: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});
