import React,{useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {uuid} from 'uuidv4'
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetails from './ContactDetails'
import api from '../api/contacts'
import EditContact from './EditContact'
function App() {
  
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState(" ")
  const [searchResults, setSearchResults] = useState([])
  const LOCAL_STORAGE = "contacts" 


  const addContactHandler = async (contact) => {
    // console.log(contact)

    const request = {
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
    await api.delete("/contacts/"+id)
    const newContactList = contacts.filter((contact) => {
      return contact.id!==id
    });
    setContacts(newContactList);
  }

  const updateContactHandler = async(contact) => {
    const response = await api.put('/contacts/'+ contact.id, contact);
    const  {id, name, email} = response.data;
    setContacts(contacts.map((contact) => {
      // console.log(contact.name)
      return contact.id === id ? {...response.data} : contact;
    }));
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm!=="") {
      const newContactList = contacts.filter((contact) => {
        // console.log(Object.values(contact).join(""))
        return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  }

  //Reetrive Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts()
      if(allContacts) {
        setContacts(allContacts)
      }
    }
    getAllContacts()
  })


  
  return (
    <div>
      <Router>
        <Header />
        <Switch>
            <Route path='/'
                exact 
                render={(props) => (
                  <ContactList {...props} 
                      contacts={searchTerm.length < 1 ? contacts : searchResults} 
                      getContactId={removeContactHandler}
                      term={searchTerm}
                      searchKeyword={searchHandler}/>
                )}
            />

            <Route path='/addContact'
                  exact 
                  render={(props) => (
                    <AddContact 
                      {...props}
                      addContactHandler={addContactHandler}
                      />
                  )}
              />

              <Route path='/contact/:id'
                    component={ContactDetails}/>
              
              <Route 
              path='/edit'
              exact
              render={(props) => (
                <EditContact
                  {...props}
                  updateContactHandler={updateContactHandler} />
              )} />

          
          
        </Switch>
      </Router>
        
        
    </div>
    
  );
}

export default App;
