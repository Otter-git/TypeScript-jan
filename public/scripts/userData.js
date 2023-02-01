export function getUserData(value) {
    if (value instanceof Storage) {
        const data = value.getItem('user');
        const user = JSON.parse(data);
        return user;
    }
}
