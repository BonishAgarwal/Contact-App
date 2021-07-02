import ContactCard from './ContactCard'
import React, {useRef} from 'react'
export default function ContactList(props) {
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id)
    }

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }
    const renderContactList = props.contacts.map((contact) => {

            return (
                <ContactCard contacts={contact}
                clickHandler={deleteContactHandler}  />
            )

    })
    return (
        <div class='main' style={{marginTop:'100px'}}>
        <div className='ui search'>
                <div className='ui icon input'>
                    <input
                        ref={inputEl}  // bind the useRef with our input tag
                        type='text' 
                        placeholder='Search Contacts' 
                        className='prompt' 
                        value={props.term}
                        onChange={getSearchTerm}
                    />
                    <i className='search icon'></i>
                </div>
            </div>
        <div className='ui celled list'   style={{marginTop:'100px'}}>
            {renderContactList}
        </div>
        </div>

    )
    
}