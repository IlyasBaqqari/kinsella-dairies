import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Account from './Pages/Account';
import Admin from './Pages/Admin';
import Store from './Pages/Store';
import Order from './Pages/Order';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Define default query
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn }}
});

// Web App
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='store' element={<Store />} />
            <Route path='signup' element={<Signup />} />
            <Route path='account' element={<Account />} />
            <Route path='order' element={<Order />} />
            <Route path='admin' element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
