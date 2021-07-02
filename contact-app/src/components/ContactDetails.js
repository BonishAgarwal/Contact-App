import React from 'react';
import {Link} from 'react-router-dom';
const ContactDetails = (props) => {

    const {id,name,email} = props.location.state.contact
    return (
        <div className='main' style={{marginTop:'100px'}}>
            <div className='ui card centered'>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>
            <div className='center-div'>
                <Link
                    to='/'>
                    <button className='ui button blue center'>Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
        
}
export default ContactDetails