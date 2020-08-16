import React, {useEffect} from 'react'
import Axios from 'axios'
import {saveMessage} from '../store/messages'
import {useDispatch, useSelector} from 'react-redux'

function Chatbot(){

    const dispatch = useDispatch()

    useEffect(() => {
        eventQuery('welcomeToLadyWoe')
    }, [])

    const textQuery = async (text) => {
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }
        dispatch(saveMessage(conversation))
        console.log(conversation)

        const textQueryVariables = {text}

        try {
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }
            }
        dispatch(saveMessage(conversation))
        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: 'Yikes, woe is me!  Something went wrong.'
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }


    const eventQuery = async (event) => {


        const eventQueryVariables = {event}

        try {
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {
                let conversation = {
                    who: 'bot',
                    content: content
                }
            dispatch(saveMessage(conversation))
            }
        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: 'Yikes, woe is me!  Something went wrong.'
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }

    const keyPressHandler = (event) => {
        if (event.key === "Enter") {
            if (!event.target.value) {
                return alert('Sorry, you need to type something first!')
            }
            textQuery(event.target.value)
            event.target.value = ""
        }
    }

    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>



            </div>
            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                type="text"
            />

        </div>
    )
}

export default Chatbot

