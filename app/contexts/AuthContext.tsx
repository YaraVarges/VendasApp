import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type User = { email: string; name: string } | null;

interface AuthContextType {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    console.log('Tentando login com:', email, password);
    if (email === 'yaravarges@gmail.com' && password === '123') {
      const userData = { email, name: 'Yara Varges' };
      setUser(userData);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) setUser(JSON.parse(storedUser));
      setIsLoading(false);
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;