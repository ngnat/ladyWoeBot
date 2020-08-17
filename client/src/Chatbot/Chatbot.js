import React, {useEffect} from 'react'
import Axios from 'axios'
import {saveMessage} from '../store/messages'
import {useDispatch, useSelector} from 'react-redux'
import { List, Avatar, Button } from 'antd';
import Message from './Message'
import CardMessage from './CardMessage'

function Chatbot(){
    const dispatch = useDispatch()
    const messagesFromRedux = useSelector(state=> state.messages.messages)

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

        const textQueryVariables = {text}

        try {
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }
                dispatch(saveMessage(conversation))
            }
        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: 'Yikes, woe is me!  Something went wrong.'
                    }
                }
            }
        }
        console.log(messagesFromRedux, 'mess')
    }

    const textQueryQuickReply = async (text) => {
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        const textQueryVariables = {text}

        try {
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }
                dispatch(saveMessage(conversation))
            }
        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: 'Yikes, woe is me!  Something went wrong.'
                    }
                }
            }
        }
        console.log(messagesFromRedux, 'mess')
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

    const renderCards = (cards) => {
        return cards.map((card, i) => <CardMessage key={i} cardInfo={card.structValue} />)
    }

    const renderQuickReplies = (buttons) => {
        return buttons.map((button) => 
            (<Button  onClick={() =>textQueryQuickReply(button.stringValue)} style={{color: "black",backgroundColor: "thistle", marginLeft: "300px", margin: "10px 20px", cursor: "pointer"}
            }> {button.stringValue} </Button>)
        )
    }

    const renderOneMessage = (message, i) => {
        const AvatarSrc = message.who ==='bot' ? <Avatar src="https://andc-scale.livewallcampaigns.com/imageScaled/?site=andc&file=1591975072_oprah-header.jpg&w=1200&h=675&cropped=1"  shape="square" size="large" /> : <Avatar src="https://cdn-images-1.medium.com/fit/c/64/64/1*2aqceCF8AhCVXauMlUssaQ@2x.jpeg" size="large" shape="square" />  
        const titleName = message.who ==='bot' ? "Lady Woe" :  "Me"
        if(message.content && message.content.text && message.content.text.text) {
            return <Message who={message.who}  text={message.content.text.text} />
        } else if (message.content && message.content.payload.fields.card) {
            return <div>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={titleName}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>
            </div>
        } else if (message.content && message.content.payload.fields.quickReplies) {
            return <div>
                  <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        title="Reply:"
                        description={renderQuickReplies(message.content.payload.fields.quickReplies.listValue.values)}
                    />
                </List.Item>
              
            </div>
        } else if (message.content && message.content.payload.fields.image) {
            return <div  style={{
                display: 'flex' 
            }}>
                <img alt= "" src={message.content.payload.fields.image.structValue.fields.imageUri.stringValue} size="small"/>
            </div>
        }
    }
    
    const renderMessage = (returnedMessages) => {
        if(returnedMessages) {
            return returnedMessages.map((message,i) => {
                return renderOneMessage(message,i)
            })
        } else {
            return null
        }
    }
    setTimeout(renderMessage,2000)

    




    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessage(messagesFromRedux)}
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

