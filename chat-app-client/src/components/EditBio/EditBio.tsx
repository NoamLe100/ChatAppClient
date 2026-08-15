import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { updateProfile } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import './EditBio.css';

type EditBioProps = { onSaved: () => void };

export function EditBio({ onSaved }: EditBioProps) {
  const { name: currentName, userName: currentUserName, refresh } = useAuth();
  const [name, setName] = useState(currentName ?? '');
  const [userName, setUserName] = useState(currentUserName ?? '');
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      await updateProfile(name, userName);
      refresh();
      onSaved();
    } catch {
      setError('Could not save — username may already be taken.');
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Display name"
        value={name}
        margin="normal"
        className="edit-bio-field"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Username"
        value={userName}
        margin="normal"
        className="edit-bio-field"
        onChange={(e) => setUserName(e.target.value)}
      />
      {error && <Typography className="edit-bio-error">{error}</Typography>}
      <Button fullWidth variant="contained" onClick={handleSave} className="edit-bio-save-btn">
        Save
      </Button>
    </div>
  );
}
