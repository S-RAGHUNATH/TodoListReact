import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useEffect } from 'react';

import TodoListLogo from './images/TodoList.png'
import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';  //context i.e provider

export function AllTodoLists() {  //not doing default export
  const { data } = useTodoLists(); // add loading
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      sx={{
        width: 0.25,
        minWidth: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 0.25,
          minWidth: 200,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/*Empty Toolbar for spacing*/}
      <Toolbar />
      {data? (
      <List>
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
              >
                {Icon ? <Icon /> : <Icons.List />}
                <ListItemText sx={{ ml: 0.5 }} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    ):(
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '250px 0'}}>
      <img style={{height:'90%', width:'25%'}} src={TodoListLogo}/>
      </div>
    )}
    </Drawer>
  );
}
