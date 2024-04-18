import type { User } from './types';

import { Dispatch, createContext, useState } from 'react';

import { Navigation } from './navigation';



type AppContextType = {
  userId: User['id'] | null;
  userFullName: User['fullName'] | null;
  setUserId: Dispatch<React.SetStateAction<User['id'] | null>>;
  setUserFullName: Dispatch<React.SetStateAction<User['fullName'] | null>>;
};



const AppContext = createContext<AppContextType>({
  userId: null,
  userFullName: null,
  setUserId: () => {},
  setUserFullName: () => {}
});



const App: React.FC = (): React.ReactElement => {
  const [userId, setUserId] = useState<User['id'] | null>(null);
  const [userFullName, setUserFullName] = useState<User['fullName'] | null>(null);

  const rootContext: AppContextType = { userId, setUserId, userFullName, setUserFullName };



  return (
    <AppContext.Provider value={rootContext}>
      <Navigation />
    </AppContext.Provider>
  );
};



export { App, AppContext };

