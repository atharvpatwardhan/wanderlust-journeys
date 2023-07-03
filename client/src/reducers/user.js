const user1 = JSON.parse(localStorage.getItem('profile'));

export default(user={user1},action) => {
    switch(action.type){
        case 'UPDATE_USER':
            localStorage.setItem('profile', JSON.stringify({...action?.payload}));
            return user;
        default:
            return user;
    }
}