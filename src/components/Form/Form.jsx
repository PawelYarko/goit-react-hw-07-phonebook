import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import todosActions from '../../redux/todos/todos-actions';
import s from './Form.module.css';

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.todos.items);

  const addTask = () => {
    dispatch(todosActions.addTodo({ name, number }));
  };
  const handleChangeName = e => setName(e.currentTarget.value);

  const handleChangeNumber = e => setNumber(e.currentTarget.value);

  const onContactAdd = e => {
    e.preventDefault();

    const foundContact = contacts.find(
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
          value={number}
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
