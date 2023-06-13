import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../Ultimo/AuthContext'
import moment from 'moment';
import "../estilos/boton.css"
import styled from 'styled-components';

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
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <button onClick={onClose}>Cerrar</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export const HorarioTable = ({eventos=[]}) => {
    // let [eventos, setEventos] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    console.log("eventos2:",eventos)
    const [isModalOpenDetalle, setIsModalOpenDetalle] = useState(false);
    const handleTextClicDetalle = () => {
      setIsModalOpenDetalle(true);
    };
    const handleCloseModal = () => {
      setIsModalOpenDetalle(false);
      
  
    };

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
    <table className="table table-bordered shadow">
  <thead className="thead-dark">
    <tr>
      <th className="text-center  col-2">Hora</th>
      {diasSemana.map((dia) => (
        <th key={dia} className="text-center bg-primary text-white">{dia}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {horasDia.map((hora, index) => (
      <tr key={hora}>
        <td className="text-center table-active " >{hora}</td>
        {diasSemana.map((dia, diaIndex) => (
          <td key={dia} style={{ backgroundColor: '#f2f2f2' }} className="text-center  col-2">
            {eventos.map((evento) => {
              const horaParseadaInicio = moment(evento.hora_inicio, 'HH:mm');
              const horaReduccionTextoInicio = horaParseadaInicio.format('HH:mm');
              const horaParseadaFin = moment(evento.hora_fin, 'HH:mm');
              const horaReduccionTextoFin = horaParseadaFin.format('HH:mm');
              if (dia === evento.dia_semana && hora >= horaReduccionTextoInicio && hora <= horaReduccionTextoFin) {
                return <div className="" >
                  <p onClick={() => handleTextClicDetalle()}>{evento.curso.nombre} - Aula:{evento.aula}</p>
                  <Modal isOpen={isModalOpenDetalle} onClose={handleCloseModal}>
                  {/* <CrearCurso/> */}
                    editar
                  </Modal>
                </div>;
                
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
    // <table className="table table-bordered">
    //   <thead className="thead-light">
    //     <tr>
    //       <th className="text-center">Hora</th>
    //       {diasSemana.map((dia) => (
    //         <th key={dia} className="text-center">{dia}</th>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {horasDia.map((hora, index) => (
    //       <tr key={hora}>
    //         <td className="text-center">{hora}</td>
    //         {diasSemana.map((dia, diaIndex) => (
    //           <td key={dia} className="text-center">
    //             {eventos.map((evento) => {
    //               const horaParseadaInicio = moment(evento.hora_inicio, 'HH:mm');
    //             //   const horaReducidaInicio = horaParseadaInicio.subtract(0, 'hours');
    //               const horaReduccionTextoInicio = horaParseadaInicio.format('HH:mm');
  
    //               const horaParseadaFin = moment(evento.hora_fin, 'HH:mm');
    //             //   const horaReducidaFin = horaParseadaFin.subtract(0, 'hours');
    //               const horaReduccionTextoFin = horaParseadaFin.format('HH:mm');
  
    //               if (dia === evento.dia_semana && hora >= horaReduccionTextoInicio && hora <= horaReduccionTextoFin) {
    //                 return evento.nombre;
    //               }
    //               return null;
    //             })}
    //           </td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};

//   return (
//     <table className="table table-bordered">
//     <thead className="thead-light">
//       <tr>
//         <th>Hora</th>
//         {diasSemana.map((dia) => (
//           <th key={dia}>{dia}</th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       {horasDia.map((hora, index) => (
//         <tr key={hora}>
//           <td>{hora}</td>
//           {diasSemana.map((dia, diaIndex) => (
//             <td key={dia}>
//               {eventos.map((evento) => {
//                 const horaParseadaInicio = moment(evento.hora_inicio, 'HH:mm');
//                 const horaReducidaInicio = horaParseadaInicio.subtract(1, 'hours');
//                 const horaReduccionTextoInicio = horaReducidaInicio.format('HH:mm');

//                 const horaParseadaFin = moment(evento.hora_fin, 'HH:mm');
//                 const horaReducidaFin = horaParseadaFin.subtract(1, 'hours');
//                 const horaReduccionTextoFin = horaReducidaFin.format('HH:mm');

//                 if (dia === evento.dia_semana && hora >= horaReduccionTextoInicio && hora <= horaReduccionTextoFin) {
//                   return evento.nombre;
//                 }
//                 return null;
//               })}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   </table>
//     );
// };

    //     <table>
//       <thead>
//         <tr>
//           <th>Hora</th>
//           {diasSemana.map((dia) => (
//             <th key={dia}>{dia}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {horasDia.map((hora, index) => (
//           <tr key={hora}>
//             <td>{hora}</td>
//             {diasSemana.map((dia, diaIndex) => (
//               <td key={dia}>
//                 {eventos.map((evento) => {
//                 //   const horaInicioIndex = obtenerIndiceHora(evento.hora_inicio);
//                 //   const horaFinIndex = obtenerIndiceHora(evento.hora_fin);
//                 //   const horaInicioIndex = horasDia.findIndex(hora => hora === evento.hora_inicio);
//                 //   const horaFinIndex = horasDia.findIndex(hora => hora === evento.hora_fin);
//                 const horaParseadaInicio = moment(evento.hora_inicio, 'HH:mm');
//                 const horaReducidaInicio = horaParseadaInicio.subtract(0, 'hours');
//                 const horaReduccionTextoInicio = horaReducidaInicio.format('HH:mm');

//                 const horaParseadaFin = moment(evento.hora_fin, 'HH:mm');
//                 const horaReducidaFin = horaParseadaFin.subtract(0, 'hours');
//                 const horaReduccionTextoFin = horaReducidaFin.format('HH:mm');

//                   if (dia === evento.dia_semana && hora >= horaReduccionTextoInicio  && hora <=horaReduccionTextoFin) {
//                     return evento.nombre;
//                   }
//                   return null;
//                 })}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


// import React from 'react';

// export const HorarioTable = () => {
//   const evento = {
//     id: 2,
//     dia_semana: 'J',
//     nombre: 'Jueves Movers1',
//     descripcion: '',
//     hora_inicio: '16:00',
//     hora_fin: '18:00',
//     curso: 1,
//     profesor: 1,
//     aula: 1
//   };
 

//   const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'J', 'Viernes', 'Sábado', 'Domingo'];

//   const horasDia = [
//     '08:00 - 09:00',
//     '09:00 - 10:00',
//     '10:00 - 11:00',
//     '11:00 - 12:00',
//     '12:00 - 13:00',
//     '13:00 - 14:00',
//     '14:00 - 15:00',
//     '15:00 - 16:00',
//     '16:00 - 17:00',
//     '17:00 - 18:00',
//     '18:00 - 19:00',
//     '19:00 - 20:00'
//   ];


//   const horaInicioIndex = horasDia.findIndex(hora => hora.split(' - ')[0] === evento.hora_inicio);
//   const horaFinIndex = horasDia.findIndex(hora => hora.split(' - ')[1] === evento.hora_fin);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Hora</th>
//           {diasSemana.map(dia => (
//             <th key={dia}>{dia}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {horasDia.map((hora, index) => (
//           <tr key={hora}>
//             <td>{hora}</td>
//             {diasSemana.map((dia, diaIndex) => (
//               <td key={dia}>
//                 {dia === evento.dia_semana && index >= horaInicioIndex && index <= horaFinIndex ? evento.nombre : null}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


// import React from 'react';

// export const HorarioTable = () => {
//   const evento = {
//     id: 2,
//     dia_semana: 'J',
//     nombre: 'Jueves Movers1',
//     descripcion: '',
//     hora_inicio: '16:15:00',
//     hora_fin: '18:15:00',
//     curso: 1,
//     profesor: 1,
//     aula: 1
//   };

//   const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'J', 'Viernes', 'Sábado', 'Domingo'];

//   const horasDia = [
//     '08:00 - 09:00',
//     '09:00 - 10:00',
//     '10:00 - 11:00',
//     '11:00 - 12:00',
//     '12:00 - 13:00',
//     '13:00 - 14:00',
//     '14:00 - 15:00',
//     '15:00 - 16:00',
//     '16:00 - 17:00',
//     '17:00 - 18:00',
//     '18:00 - 19:00',
//     '19:00 - 20:00'
//   ];

//   const diaIndex = diasSemana.findIndex(dia => dia === evento.dia_semana);
//   console.log("diaIndex:",diaIndex)
//   const horaInicioIndex = horasDia.findIndex(hora => hora === evento.hora_inicio);
//   const horaFinIndex = horasDia.findIndex(hora => hora === evento.hora_fin);
  
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Hora</th>
//           {diasSemana.map(dia => (
//             <th key={dia}>{dia}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {horasDia.map((hora, index) => (
//           <tr key={hora}>
//             <td>{hora}</td>
//             {diasSemana.map((dia, diaIndex) => (
//               <td key={dia}>
//                 {diaIndex === diaIndex && index >= horaInicioIndex && index <= horaFinIndex ? evento.nombre : null}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


// import React from 'react';

// export const HorarioTable = () => {
  
//   const evento = {
//     id: 2,
//     dia_semana: 'J',
//     nombre: 'Jueves Movers1',
//     descripcion: '',
//     hora_inicio: '16:15:00',
//     hora_fin: '18:15:00',
//     curso: 1,
//     profesor: 1,
//     aula: 1
//   };

//   // Supongamos que tienes una matriz de días de la semana en el orden correcto
//   const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

//   // Supongamos que tienes una matriz de horas disponibles
//   const horasDia = [
//     '08:00 - 09:00',
//     '09:00 - 10:00',
//     '10:00 - 11:00',
//     '11:00 - 12:00',
//     '12:00 - 13:00',
//     '13:00 - 14:00',
//     '14:00 - 15:00',
//     '15:00 - 16:00',
//     '16:00 - 17:00',
//     '17:00 - 18:00',
//     '18:00 - 19:00',
//     '19:00 - 20:00'
//   ];

//   // Obtén el índice del día de la semana del evento
//   const diaIndex = diasSemana.findIndex(dia => dia === evento.dia_semana);

//   // Obtén el rango de horas correspondiente al evento
//   const horaInicioIndex = horasDia.findIndex(hora => hora === evento.hora_inicio);
//   const horaFinIndex = horasDia.findIndex(hora => hora === evento.hora_fin);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Hora</th>
//           {diasSemana.map(dia => (
//             <th key={dia}>{dia}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {horasDia.map((hora, index) => (
//           <tr key={hora}>
//             <td>{hora}</td>
//             {diasSemana.map((dia, diaIndex) => (
//               <td key={dia}>
//                 {diaIndex === diaIndex && index >= horaInicioIndex && index <= horaFinIndex && evento.nombre}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };
