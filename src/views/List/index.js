import { useState, useEffect } from 'react';
import { createUUID } from 'utils.js';
import Input from 'components/Input';
import Button from 'components/Button';
import Items from 'components/Items';
import styles from "./index.module.scss";

export default function List(props) {
  const localStorageName = "challengelr";
  const itemPattern = "^.{1,25}$";

  const [search, setSearch] = useState('');
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageName)) || [];
  });
  const [itemsDisplayed, setItemsDisplayed] = useState(items);

  const changeValue = (valueOnChange, functionOnChange) => {
    functionOnChange(valueOnChange);
  }

  const addItem = () => {
    const newItem = {
      id: createUUID(),
      value: "",
      tempValue: "",
      isEditing: true
    }
    setItems([newItem, ...items]);
  }

  const editItem = (item) => {
    setItems(items.map(e => {
      if (e.id === item.id) {
        e.tempValue = e.value || "";
        e.isEditing = true;
      }
      return e;
    }));
  }

  const changeItem = (item, newValue) => {
    setItems(items.map(e => {
      if (e.id === item.id) {
        e.tempValue = newValue;
      }
      return e;
    }));
  }

  const saveItem = (item) => {
    setItems(items.map(e => {
      if (e.id === item.id) {
        e.isEditing = false;
        e.value = e.tempValue;
        delete e.tempValue;
      }
      return e;
    }));
  }

  const deleteItem = (item) => {
    setItems(items.filter(e => e.id !== item.id));
  }

  const logout = (item) => {
    localStorage.removeItem(localStorageName);
    props.updateLogged(false);
  }

  useEffect(() => {
    setItemsDisplayed(items.filter(e => e.value.toLowerCase().includes(search.toLowerCase())));
    localStorage.setItem(localStorageName, JSON.stringify(items));
  }, [search, items])


  return (
      <>
        <h1>
          My To-Do List
        </h1>
        <div className={styles["container-list"]}>
          <div className={styles["list-header"]}>
            <Input
              placeholder="search"
              value={search}
              onChange={e => changeValue(e.target.value, setSearch)}
              icon="search"
              className={styles["list-search"]}
            />
            <Button
              text="New"
              onClick={() => addItem()}
            />
          </div>
          <Items
            items={itemsDisplayed}
            onEdit={editItem}
            onDelete={deleteItem}
            onSave={saveItem}
            onChange={changeItem}
            patter={itemPattern}
            minLength={1}
            maxLength={25}
          />
          <Button
            text="Logout"
            onClick={logout}
          />
        </div>
      </>
  );
}