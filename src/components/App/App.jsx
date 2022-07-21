import { useSelector } from 'react-redux';
import Form from '../Form/Form';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';

import s from './App.module.css';

export default function App() {
  const {status, error} = useSelector(state => state.todos);
  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <Form/>
      <div>
        <h2>Contacts</h2>
        <Filter/>
        {status === 'loading' && <h2>Loading...</h2>}
        {error &&  <h2>{error}</h2>}
        <ContactsList/>
      </div>
    </div>
  );
}
