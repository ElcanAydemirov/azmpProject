export function getDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export function setDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
