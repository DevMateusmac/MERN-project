import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export function useAuth() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  
  const login = useCallback((uId, token, expirationDate) => {
    setToken(token);
    const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpiration)
    localStorage.setItem('userData', JSON.stringify({userId: uId, token: token, expiration: tokenExpiration.toISOString()}));
    setUserId(uId)
  }, []);
  
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate])


  useEffect(()=> {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token)
    }
  }, [login])

  return {token, login, logout, userId}

}