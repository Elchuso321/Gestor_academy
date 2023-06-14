
import React, { useState, useEffect,useContext } from 'react';
import AuthContext from '../Ultimo/AuthContext';
import { NavbarAdminAcademia } from './NavbarAdmin_Academia';
import { ComponenteChanel1 } from '../Chat2/ComponenteChat2';
import { NavbarAdminHome } from './NavBarAdmin_Home';

export const ConversacionesAdmin = () => {

  
  return (
    <>
    <NavbarAdminAcademia/>
    <ComponenteChanel1/>
    
    </>
  );
};