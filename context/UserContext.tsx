import { createContext, useContext, useState } from 'react';

export const UserContext = createContext<{
  user:
    | {
        name?: string;
        email?: string;
        cars?: {
          id: string;
          year: string;
          make: string;
          model: string;
          engine?: string;
          vin?: string;
          mileage?: number;
          transmission?: string;
        }[];
        id?: string;
      }
    | undefined;
  setUser: (newUser: object) => void;
}>({ user: {}, setUser: () => {} });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAtlasUser = () => useContext(UserContext);
