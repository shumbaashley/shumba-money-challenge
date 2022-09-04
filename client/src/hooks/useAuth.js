const useAuth = () => {
  if (localStorage.getItem("isLoggedIn")) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (Date.now() >= userInfo.exp * 1000) {
      // Check if token expired
      return { isLoggedIn: false };
    }
    return { isLoggedIn: true };
  }
  return { isLoggedIn: false };
};

export default useAuth;
