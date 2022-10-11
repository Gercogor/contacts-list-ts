import { TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../TypesInterfaces';
import { setSearch } from '../../store/contactsReducer';

const SearchWrapper = styled('div')({
  margin: "10px 0",
  width: '100%',
});

const Search: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }
  useEffect(() => {
    dispatch(setSearch(text.toLowerCase()))
  }, [dispatch, text])
  return (
    <SearchWrapper>
      <TextField
        onChange={onChange}
        name="search"
        id="standard-basic"
        label="Search"
        type="text"
        variant="standard"
        size="small"
        sx={{ width: "90%" }}
      />
    </SearchWrapper>

  )
}

export default Search