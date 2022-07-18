import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import todoActions from '../../redux/todos/todos-actions';
import s from './Contacts.module.css';

const ContactsList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);
  const filter = useSelector(state => state.todos.filter);

  const visibleContacts = todos.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id} className={s.listItem}>
          {name}: {number}
          <button
            className={s.buttonDelete}
            type="button"
            onClick={() => dispatch(todoActions.deleteTodo(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
