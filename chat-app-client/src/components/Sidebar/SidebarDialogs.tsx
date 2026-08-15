import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { CreateChatForm } from '../CreateChat/CreateChat';
import { JoinByCodeForm } from '../JoinByCode/JoinByCode';
import { UserSearch } from '../UserSearch/UserSearch';
import { EditBio } from '../EditBio/EditBio';

type DialogMode = 'create' | 'join' | 'search' | null;

type SidebarDialogsProps = {
  dialogMode: DialogMode;
  onCloseDialog: () => void;
  onActionCompleted: () => void;
  editBioOpen: boolean;
  onCloseEditBio: () => void;
};

export function SidebarDialogs({
  dialogMode, onCloseDialog, onActionCompleted, editBioOpen, onCloseEditBio,
}: SidebarDialogsProps) {
  return (
    <>
      <Dialog open={dialogMode !== null} onClose={onCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle className="sidebar-dialog-title">
          {dialogMode === 'create' && 'Create a new chat'}
          {dialogMode === 'join' && 'Join a chat'}
          {dialogMode === 'search' && 'Start a chat'}
        </DialogTitle>
        <DialogContent className="sidebar-dialog-content">
          {dialogMode === 'create' && <CreateChatForm onChatCreated={onActionCompleted} />}
          {dialogMode === 'join' && <JoinByCodeForm onJoined={onActionCompleted} />}
          {dialogMode === 'search' && <UserSearch onChatStarted={onActionCompleted} />}
        </DialogContent>
      </Dialog>

      <Dialog open={editBioOpen} onClose={onCloseEditBio} fullWidth maxWidth="xs">
        <DialogTitle className="sidebar-dialog-title">Edit Profile</DialogTitle>
        <DialogContent className="sidebar-dialog-content">
          <EditBio onSaved={onCloseEditBio} />
        </DialogContent>
      </Dialog>
    </>
  );
}
