import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/todos/todos-reducers';

const Filter = () => {
  const dispatch = useDispatch();

  const onFilterChange = e => {
    const normalizedFilter = e.currentTarget.value.toLowerCase();
    dispatch(changeFilter(normalizedFilter));
  };

  return (
    <div>
      <h3>Find contacts by name</h3>
      <input type="text" name="filter" onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
