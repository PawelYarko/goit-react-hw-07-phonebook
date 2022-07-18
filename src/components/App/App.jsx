import Form from '../Form/Form';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';

import s from './App.module.css';

export default function App() {

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <Form/>
      <div>
        <h2>Contacts</h2>
        <Filter/>
        <ContactsList/>
      </div>
    </div>
  );
}
