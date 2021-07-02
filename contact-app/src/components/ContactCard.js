import React from 'react';
import {Link} from 'react-router-dom'
export default function ContactCard(props) {

    const {id,name,email} = props.contacts
    return(
        <div className='item'>
            <div className='content'>
                <Link to={{pathname:'/contact/'+id, state:{contact: props.contacts}}}>
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </Link>
                <i className='trash alternate outline icon' 
                style={{color:'red',marginTop:'7px', marginLeft:'10px'}}
                onClick={() => props.clickHandler(id)}/>

                <Link to={{pathname:'/edit',state:{contact:props.contacts}}}>
                <i className='edit alternate outline icon' 
                style={{color:'blue',marginTop:'7px', marginLeft:'10px'}}
                /></Link>
            </div>
        </div>
    )
}