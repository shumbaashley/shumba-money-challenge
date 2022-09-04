const useAuth = () => {
    if (localStorage.getItem('isLoggedIn')) {
        return { isLoggedIn: true };
    }
    return { isLoggedIn: false };
};

export default useAuth;
