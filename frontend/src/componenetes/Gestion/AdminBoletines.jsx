import { Button, Modal } from 'react-bootstrap';
import AuthContext from '../Ultimo/AuthContext';
import jwt_decode from "jwt-decode";
import React, { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import  {NavbarAdminAcademia} from "../Admin/NavbarAdmin_Academia"


export const AdminBoletines = () => {
 
  return (
    <>
        <NavbarAdminAcademia/>

    </>
  );
};
