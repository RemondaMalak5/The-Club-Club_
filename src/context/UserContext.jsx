import { createContext, useState } from 'react';

// 1. إنشاء الـ Context
export const UserTokenContext = createContext(null);

// 2. عمل الـ Provider اللي هيشيل الـ state ويبثها
export function UserTokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  // دالة لحفظ التوكن في الـ state وفي الـ LocalStorage علشان لو المستخدم عمل Refresh للموقع
  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('userToken', newToken);
    } else {
      localStorage.removeItem('userToken');
    }
  };

  return (
    <UserTokenContext.Provider value={{ token, saveToken }}>
      {children}
    </UserTokenContext.Provider>
  );
}