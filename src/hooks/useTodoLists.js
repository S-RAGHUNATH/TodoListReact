//(swr: stale-while-revalidate) is a data fetching library. makes easy to work with asynchronous data in app.
//useSWR - useSWR - primary hook provided by SWR library. It allows you to fetch data and manage its state in your React components.
import useSWR from 'swr';

import { APIs, fetcher, putter } from '../utils.js';

export function useTodoLists() {
  //here, useSWR hook accepts a key string and a fetcher function. key is a unique identifier of the data (normally the API URL) and will be passed to fetcher. Fetcher can be any asynchronous function which returns the data. The hook returns 3 values: data, isLoading and error, based on the status of the request.
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    data,
    async newList(newListName, icon) {
      //mutate is a func that allows you to update the cached data for a specific key or URL without needing to refetch it from server mutate is a powerful function that allows you to update or revalidate the cached data associated with a specific key. This is particularly useful for scenarios where you want to optimistically update the UI after a change (like creating, updating, or deleting data) without waiting for a response from the server.
      
      return await mutate(
        await putter({
          url: APIs.TodoLists,
          icon: icon || 'List', // note: not using default param since an empty string is the default and won't be falsy
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData => [
            ...oldData,
            { name: newListName, icon: icon || 'List', data: [] },
          ],
        }
      );
    },
    async updateList(listToUpdate, newListName) {
      await mutate(
        await putter({
          url: APIs.TodoListsUpdate,
          id: listToUpdate,
          name: newListName,
        }),
        {
          populateCache: false,
          optimisticData: oldData =>
            oldData.map(d => {
              if (d.id === listToUpdate) {
                return { ...d, name: newListName };
              }
              return d;
            }),
        }
      );
    },
  };
}
