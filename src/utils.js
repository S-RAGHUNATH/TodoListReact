import Dexie from 'dexie'; // npm install dexie reqd
  //Dexie - a wrapper library for IndexedDB, making it easier to perform database operations in web applications. 
 // IndexDB - IndexedDB is a powerful API for client-side data storage that allows you to create structured data stores and perform asynchronous operations, making it suitable for offline applications and more complex data handling.
 
 // create a new database named 'todo-list-db'
export const db = new Dexie('todo-list-db');

//define the schema
db.version(2).stores({
  lists: '++id, name', // id is auto-incremented, name is indexed
  listItems: '++id, name, checked, listId', // id is auto-incremented, name, checked, listId are indexed
});

export const APIs = {
  TodoLists: 'todo-lists',
  TodoListsUpdate: 'todo-lists-update',
  TodoList: 'todo-list',
  TodoListDelete: 'todo-list-delete',
  TodoListUpdate: 'todo-list-update',
};

export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.toArray(); //Fetching data
    case APIs.TodoList:
      return {
        ...(await db.lists.get(variables.id)),
        items:
          (await db.listItems.where({ listId: variables.id }).toArray()) ?? [],
      };
    default:
      throw new Error(`Unknown API ${url}`);
  }
}

export async function putter({ url, id, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.add({ name: variables.name, icon: variables.icon });
    case APIs.TodoListsUpdate:
      return db.lists.update(id, { name: variables.name });
    case APIs.TodoList:
      return db.listItems.add({ listId: id, name: variables.name });
    case APIs.TodoListDelete:
      return db.listItems.delete(id);
    case APIs.TodoListUpdate:
      return db.listItems.update(id, variables);
    default:
      throw new Error(`Unknown API ${url}`);
  }
}
