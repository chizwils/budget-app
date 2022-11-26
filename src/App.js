import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ItemDetails } from './pages/ItemDetails';
import { Home } from './pages/Home';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App({signOut}) {
//@todo
/*
  onchange for input functionality 
  figure out how to clear 
  display all input 
  have a link to all input 
  get an bill detail page
  in detail page 
    edit bill or initial price 
    make payments made with timestamp 
    and have list of payments ordered by time stamp 
    total left 

  redux for state mamgemnt for all components 
  a lot of redux reading 

  then design 





*/ 

  return (

    <BrowserRouter>
    <View className="App">
    
      <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route  path="/company/:id/:bill/:price" element={<ItemDetails/>}/>

      </Routes>
      {/* /company/:${item.id}:/${item.bill}:/${item.price} */}
      <Button onClick={signOut}>Sign Out</Button>
      
    </View>
    </BrowserRouter>

  );
}

export default withAuthenticator(App);
