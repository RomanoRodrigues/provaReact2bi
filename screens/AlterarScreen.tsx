import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import db from '../database/db';

export default function AlterarScreen({ navigation /*pra poder navegar entre paginas*/, route /*acessa os parametros enviados*/}) {  
  const { contato_id } = route.params; //contato id é extraido pra identificar
  const [nome, setNome] = useState(''); //armazena o nome do contato
  const [telefone, setTelefone] = useState(''); //armazena o telefone do contatto
  const [erro, setErro] = useState(''); //controla mensagens de erro

  useEffect(() => { //carrega a pagina alterar
    const carregar = async () => {
      const resultado = await db.getFirstAsync(
        'SELECT * FROM contatos WHERE id = ?',
        contato_id
      ); //busca o contato no banco
      if (resultado) { //se funfou
        setNome(resultado.nome); //ele cata o nome e bota no inputzin
        setTelefone(resultado.telefone); //mema pica soq telefone
      } //
    };
    carregar();
  }, []);

  const salvar = async () => {
    if (!nome || !telefone) { //checa se os babiba tao preenchido
      setErro('Preencha todos os campos!');
      return;
    }
    setErro(''); //esvazia o erro pra n ir bosta
    await db.runAsync(
      'UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?', 
      nome,
      telefone,
      contato_id
    ); //muda o ngc no banco dps de checar
    navigation.goBack(); //volta a página
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}> {/*só pra ficar separadinho chique */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, erro && !nome ? styles.errorInput : null]}//style é uma pica, dureza
          value={nome}//puxa o nome atual
          onChangeText={setNome} //seta o nome
          placeholder="Digite o nome" //se ficar vazio
        />
        {erro && !nome && <Text style={styles.errorMessage}>Campo obrigatório</Text>}{/*mensagem de erro fofis */}
      </View>

      <View style={styles.inputGroup}>{/*mema coisa do nome */}
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
