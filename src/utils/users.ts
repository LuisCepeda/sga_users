
export function formatUserData(userData) {
    const { createdAt, updateAt, password, ...userFilteredData } = userData
    return userFilteredData
}

export function formatUsersData(users: any[]) {
    return users.map(user => formatUserData(user))
}