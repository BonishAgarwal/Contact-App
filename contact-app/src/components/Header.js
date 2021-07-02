import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className='ui fixed menu'>
            <div className='ui container center'>
                <h2>Contact Manager
                    <Link to='/addContact'>
                        <button className='ui button blue'>Add Contact</button>
                    </Link>
                </h2>
            </div>
        </div>
    )
}
export default Header;