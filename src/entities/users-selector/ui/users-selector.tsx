import { Select, MenuItem } from '@mui/material';
import { USERS_MOCK_DATA } from '../../users';
import { $currentUser } from '../../users';
import { useUnit } from 'effector-react';
import { UsersSelectorProps } from '../types';

export const UsersSelector = (props: UsersSelectorProps): React.ReactElement => {
  const { selectedUserId, onUserChange, selectorWidth } = props;

  const SelectStyles = {
    width: selectorWidth || 130,
    height: 24,
    borderRadius: 10,
    backgroundColor: 'var(--white-color)',
    padding: '15px'
    };

  const currentUser = useUnit($currentUser);
  
  return (
    <Select
      value={selectedUserId}
      onChange={(event) => onUserChange(event.target.value)}
      fullWidth
      sx={SelectStyles}
    >
      <MenuItem value="all">Все</MenuItem>
      <MenuItem value={currentUser?.id}>Я</MenuItem>
      {USERS_MOCK_DATA
        .filter(user => user.id !== currentUser?.id)
        .map(user => (
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        ))
      }
    </Select>
  );
};