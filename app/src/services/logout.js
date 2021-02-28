function endSession(router) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/signin');
}

export default endSession;