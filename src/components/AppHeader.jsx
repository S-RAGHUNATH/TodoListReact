import { Add } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';

import { NewListDialog } from './NewListDialog.jsx';

export function AppHeader() {
  //PopupState - Takes care of the boilerplate for common Menu, Popover and Popper use cases. Provides a Custom React Hook that keeps track of the local state for a single popup, and functions to connect trigger, toggle, and popover/menu/popper components to the state
  const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' }); // Initializes the popup state. You specify a variant (like 'dialog') and a unique popupId.

  return (
    <>
      <NewListDialog dialogState={dialogState} />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Lists
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={dialogState.open} //.open, .close are methods of usePopState from MUI
          >
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
