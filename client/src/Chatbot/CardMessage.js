import React from 'react'
import {Card} from 'antd';

const {Meta} = Card


function CardMessage(props) {

    return (
        <Card
        style={{ width: 240 }}
        cover={<img alt="info" src={props.cardInfo.fields.image.stringValue} />}
        
      >
          <a target="_blank" rel="noopener noreferrer" href={props.cardInfo.fields.link.stringValue}>
          <Meta  title={props.cardInfo.fields.description.stringValue} 
            description={props.cardInfo.fields.link.stringValue} />   
          </a>
       
      </Card>
  
    )
}

export default CardMessage