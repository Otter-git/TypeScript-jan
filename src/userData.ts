export function getUserData(value: unknown) {
    if (value instanceof Storage) {
        const data: string = value.getItem('user') as string;
        const user = JSON.parse(data);
        return user
    }
}