import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../../redux/todos/todos-reducers';
import s from './Contacts.module.css';

const ContactsList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const filter = useSelector(state => state.todos.filter);

  const visibleContacts = todos.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <ul>
      {visibleContacts.map(({ id, name, phone }) => (
        <li key={id} className={s.listItem}>
          {name}: {phone}
          <button
            className={s.buttonDelete}
            type="button"
            onClick={() => dispatch(removeTodo(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
