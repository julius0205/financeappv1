import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { BankSetup } from './components/BankSetup';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<BankSetup />}/>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
