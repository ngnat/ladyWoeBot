const SAVE_MESSAGE = 'SAVE_MESSAGE'

export const saveMessage = message => (
    {
        type: SAVE_MESSAGE, 
        message
    }
)


export default function (state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        default:
            return state;
    }
}


