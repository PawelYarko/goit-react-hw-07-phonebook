import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../../redux/todos/todos-reducers';
import { getVisibleContacts } from '../../redux/todos/todos-selectors';
import s from './Contacts.module.css';

const ContactsList = () => {
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

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
