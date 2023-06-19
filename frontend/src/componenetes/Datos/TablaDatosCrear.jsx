import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'
import moment from 'moment';

import styled from 'styled-components';
import { VistaDetalleClase } from './VistaDetalleClase';
import { CrearEvento } from './CrearEvento';

import {useNavigate} from 'react-router-dom'

const ModalWrapper = styled.div`
  /* Estilos para el modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  /* Estilos para el contenido del modal */
  background-color: white;
  padding: 20px;
  width: 400px; /* Modifica el ancho del modal según tus necesidades */
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <button onClick={onClose} className ="btn btn-danger" style={{ float: 'right'}}>
        Cerrar
      </button>
      </ModalContent>
    </ModalWrapper>
  );
};

export const HorarioTableCrear = ({eventos=[]}) => {
    // let [eventos, setEventos] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

    const handleTextClick = (evento) => {
        console.log("evento!!!:",evento)
        navigate(`/admin/academia/clases/${evento.curso.id}`)
        // const navigateToRoute = (numero) => {
        //     history.push(`/numero/${numero}`);
        //   };
        // setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    console.log("eventos2:",eventos)
  const diasSemana = ['L', 'M', 'X', 'J', 'V'];
  const semanaMostrar=['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  const horasDia = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    
  ];

  const obtenerIndiceHora = (hora) => {
    return horasDia.findIndex((rango) => rango.split(' - ')[0] === hora);
  };
  return (
    <div className="table-responsive">
  <table className="table table-bordered shadow custom-table">
    <thead className="thead-dark">
      <tr>
        <th className="text-center">Hora</th>
        {diasSemana.map((dia, index) => (
          <th key={index} className="text-center bg-primary text-white">{dia}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {horasDia.map((hora, index) => (
        <tr key={index}>
          <td className="text-center table-active">{hora}</td>
          {diasSemana.map((dia, diaIndex) => (
            <td key={diaIndex} className="text-center col-2">
              {eventos.map((evento) => {
                const horaParseadaInicio = moment(evento.hora_inicio, 'HH:mm');
                const horaReduccionTextoInicio = horaParseadaInicio.format('HH:mm');

                const horaParseadaFin = moment(evento.hora_fin, 'HH:mm');
                const horaReduccionTextoFin = horaParseadaFin.format('HH:mm');

                if (dia === evento.dia_semana && hora >= horaReduccionTextoInicio && hora <= horaReduccionTextoFin) {
                  return (
                    <p className="evento" onClick={() => handleTextClick(evento)}>
                      {evento.curso.nombre} <br />
                    </p>
                  );
                }
                return null;
              })}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

//     <div className="table-responsive">
//     <table className="table table-bordered shadow">
//   <thead className="thead-dark">
//     <tr>
//       <th className="text-center">Hora</th>
//       {diasSemana.map((dia,index) => (
//         <th key={index} className="text-center bg-primary text-white">{dia}</th>
//       ))}
//     </tr>
//   </thead>
//   <tbody>
//     {horasDia.map((hora, index) => (
//       <tr key={index}>
//         <td className="text-center table-active " >{hora}</td>
//         {diasSemana.map((dia, diaIndex) => (
//           <td key={diaIndex} style={{ backgroundColor: '#f2f2f2' }} className="text-center  col-2">
//             {eventos.map((evento) => {
//               const horaParseadaInicio = moment(evento.hora_inicio, 'HH:mm');
//               const horaReduccionTextoInicio = horaParseadaInicio.format('HH:mm');
  
//               const horaParseadaFin = moment(evento.hora_fin, 'HH:mm');
//               const horaReduccionTextoFin = horaParseadaFin.format('HH:mm');
  
//               if (dia === evento.dia_semana && hora >= horaReduccionTextoInicio && hora <= horaReduccionTextoFin) {
//                return <p className="" onClick={() => handleTextClick(evento)}>{evento.curso.nombre} <br/></p>

//               }
//               return null;
//             })}
//           </td>
//         ))}
//       </tr>
//     ))}
//   </tbody>
// </table>
// </div>

    );  
}
