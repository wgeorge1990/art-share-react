const initialState = { 
    art: [], 
    user: null, 
    uploadedFile: null, 
    selectedArt: null, 
    showDetail: false }
    
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ART':
            return {...state, art: action.data}
        case 'CURRENT_USER':
            return {...state, user: action.data}
        case 'CLEAR_CURRENT_USER':
            return { ...state, user: null }
        case 'UPLOAD_FILE':
            return { ...state, uploadedFile: action.data }
        case 'ART_FOR_DETAIL':
            return { ...state, selectedArt: action.data }
        case 'SHOW_DETAIL':
            return { ...state, showDetail: true}
        case 'LEAVE_DETAIL':
            return { ...state, showDetail: null }
        case 'REFRESH':
            return {...state, art: action.data}
        default: {
            return state
        }
    }
}

export default rootReducer