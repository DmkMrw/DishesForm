import React from 'react';
import ReactDOM from 'react-dom/client';
import DishesForm from './components/DishesForm/DishesForm';
import './styles/normalize.scss';
import './styles/global.scss';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DishesForm />
  </React.StrictMode>
);