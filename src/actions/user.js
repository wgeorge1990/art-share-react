export const currentUser = (data) => {
    return { type: 'CURRENT_USER', data }
}
export const clearCurrentUser = () => {
    return { type: 'CLEAR_CURRENT_USER'}
}

export const uploadUserFile = (data) => {
    return { type: 'UPLOAD_FILE', data }
}

export const artForDetail = (data) => {
    return { type: 'ART_FOR_DETAIL', data}
}

export const showDetail = () => {
    return {type: 'SHOW_DETAIL'}
}

export const leaveDetail = () => {
    return {type: 'LEAVE_DETAIL'}
}

export const refresh = () => {
    const photosAPI = "http://localhost:3000/photos"
    const fetchData = (data) => { return { type: 'REFRESH', data}}
    return (
        fetch(photosAPI)
            .then(res => res.json())
            .then((data => fetchData(data))))
}