import React, { useState } from 'react';

//Styles
import styles from './App.module.css';

// Components
import Header from './components/Logo/Logo';
import Overlay from './components/Overlay/Overlay';
import SignUpForm from './pages/SignUpForm/SignUpForm';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading && <Overlay />}
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <SignUpForm setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
};

export default App;
