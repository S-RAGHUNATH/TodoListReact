import { Box, CssBaseline } from '@mui/material';

import { AppState } from '../providers/AppState.jsx';
import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList.jsx';

export function App() {
  return (
    <AppState> 
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader />
        <AllTodoLists />
        <CurrentTodoList />
      </Box>
    </AppState>
  );
}

//AppState is context here. Hence all children are present inside it 
//CssBaseline - to remove default css style