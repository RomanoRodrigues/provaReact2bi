import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AdicionarScreen from './screens/AdicionarScreen';
import AlterarScreen from './screens/AlterarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Adicionar" component={AdicionarScreen} />
        <Stack.Screen name="Alterar" component={AlterarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
