import React from 'react';
import './App.css';
import Search from './components/Search';
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div className="App"
      animate={{ opacity : 1 }}
      initial={{ opacity : 0 }}
      transition={{ delay : 0.2, duration : 1.5 }}
    >
      <header className="App-header">
        <div>
          Suspect Expander
        </div>
        <br/>
        <Search />
      </header>
    </motion.div>
  );
}

export default App;
