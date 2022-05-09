import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ContactList from "./Components/Contacts/ContactList/ContactList";
import Addcontact from "./Components/Contacts/AddContact/Addcontact";
import Viewcontact from "./Components/Contacts/ViewContact/Viewcontact";
import Editcontact from "./Components/Contacts/EditContact/Editcontact";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contacts/list"} />} />
        <Route path={"/contacts/list"} element={<ContactList />} />
        <Route path ={"/contacts/add"} element={<Addcontact/>}/> 
        <Route path ={"/contacts/view/:contactId"} element={<Viewcontact/>}/>
        <Route path ={"/contacts/edit/:contactId"} element={<Editcontact/>}/>  
            </Routes>
    </>
  );
};

export default App;
