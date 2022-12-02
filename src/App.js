import { useState } from 'react';
import Login from 'views/Login';
import List from 'views/List';
import style from './App.module.scss'

export default function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("challengelr"));

  const updateLogged = (newValue) => {
    setIsLogged(newValue);
  }

  return (
    <div className={style["App"]}>
      <header className={style["App-header"]}>
        {isLogged
          ? <List isLogged={isLogged} updateLogged={updateLogged} />
          : <Login isLogged={isLogged} updateLogged={updateLogged} />
        }
      </header>
    </div>
  );
}