import { useDispatch, useSelector } from 'react-redux';
import todosActions from '../../redux/todos/todos-actions';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.todos.filter);

  const onFilterChange = e => {
    const normalizedFilter = e.currentTarget.value.toLowerCase();
    dispatch(todosActions.changeFilter(normalizedFilter));
  };

  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;
