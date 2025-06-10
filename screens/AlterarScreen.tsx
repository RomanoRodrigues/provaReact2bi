import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import db from '../database/db';

export default function AlterarScreen({ navigation, route }) {
  const { contato_id } = route.params;
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      const resultado = await db.getFirstAsync(
        'SELECT * FROM contatos WHERE id = ?',
        contato_id
      );
      if (resultado) {
        setNome(resultado.nome);
        setTelefone(resultado.telefone);
      }
    };
    carregar();
  }, []);

  const salvar = async () => {
    if (!nome || !telefone) {
      setErro('Preencha todos os campos!');
      return;
    }
    setErro('');
    await db.runAsync(
      'UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?',
      nome,
      telefone,
      contato_id
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, erro && !nome ? styles.errorInput : null]}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
        />
        {erro && !nome && <Text style={styles.errorMessage}>Campo obrigatório</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={[styles.input, erro && !telefone ? styles.errorInput : null]}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Digite o telefone"
          keyboardType="phone-pad"
        />
        {erro && !telefone && (
          <Text style={styles.errorMessage}>Campo obrigatório</Text>
        )}
      </View>

      <Button title="Salvar alterações" onPress={salvar} />
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
  }
});
