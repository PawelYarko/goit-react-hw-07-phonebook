import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from '../../redux/todos/todos-reducers';
import s from './Form.module.css';

export default function Form() {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const info = {name, phone};

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  const addTask = () => {
    dispatch(addNewTodo(info));
  };
  const handleChangeName = e => setName(e.currentTarget.value);

  const handleChangeNumber = e => setNumber(e.currentTarget.value);

  const onContactAdd = e => {
    e.preventDefault();

    const foundContact = todos.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (foundContact) {
      window.alert(`${name} is already in contacts`);
      return;
    } else if (!foundContact) {
      addTask();
      setName('');
      setNumber('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <form className={s.form} onSubmit={onContactAdd}>
      <label className={s.name}>
        {' '}
        Name
        <input
          className={s.inputName}
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={s.number}>
        Number
        <input
          className={s.inputNumber}
          type="tel"
          name="number"
          value={phone}
          onChange={handleChangeNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}
