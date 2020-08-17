import React from 'react'
import { List, Avatar } from 'antd';

function Message(props) {

    const AvatarSrc = props.who ==='bot' ? <Avatar src="https://andc-scale.livewallcampaigns.com/imageScaled/?site=andc&file=1591975072_oprah-header.jpg&w=1200&h=675&cropped=1"  shape="square" size="large" /> : <Avatar src="https://cdn-images-1.medium.com/fit/c/64/64/1*2aqceCF8AhCVXauMlUssaQ@2x.jpeg" size="large" shape="square" />  
    const titleName = props.who ==='bot' ? "Lady Woe" :  "Me"

    return (
        <List.Item style={{ padding: '2rem'}}>
            {
                props.who === 'bot' ?  ( <List.Item.Meta
                    avatar={<Avatar icon={AvatarSrc} shape="square"/>}
                    title={titleName}
                    description={props.text}
                />) : ( <List.Item.Meta
                    style={{alignSelf: "right"}}
                    avatar={<Avatar icon={AvatarSrc} shape="square"/>}
                    title={titleName}
                    description={props.text}/>)
            }
           
        </List.Item>
    )
}

export default Message