import React, { useState } from 'react';
import './App.css'; 
import CheeseList from './components/CheeseList';
import PriceCalculator from './components/PriceCalculator';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateCheese from './components/CreateCheese';
import UpdateCheese from './components/UpdateCheese';
import DeleteCheese from './components/DeleteCheese';

function App() {
  const [view, setView] = useState('read');

  const handleUpdateSuccess = () => {
    console.log('Cheese updated successfully!');
  };

  const handleDeleteSuccess = () => {
    console.log('Cheese deleted successfully!');
  };

  const renderView = () => {
    switch(view) {
      case 'create':
        return <CreateCheese />;
      case 'read':
        return <CheeseList />;
      case 'update':
        return <UpdateCheese onUpdateSuccess={handleUpdateSuccess} />;
      case 'delete':
        return <DeleteCheese onDeleteSuccess={handleDeleteSuccess} />;
      default:
        return <CheeseList />;
    }
  }

  return (
    <div className="App">
      <Header setView={setView} />
      <main>
        {renderView()}
        <PriceCalculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
