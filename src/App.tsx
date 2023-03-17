import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Registration />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
