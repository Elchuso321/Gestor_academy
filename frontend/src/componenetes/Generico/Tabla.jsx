import React from 'react'


export const Tabla=(props)=>{
 
  const { diccionario } = props;
  
  // Extraemos las keys del diccionario
  // const keys = Object.keys(diccionario);

  // Obtenemos la lista de elementos en todas las keys
  // const elementos = [...new Set(keys.map((key) => Object.keys(diccionario[key])).flat())];

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {keys.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {elementos.map((elemento) => (
          <tr key={elemento}>
            <td>{elemento}</td>
            {keys.map((key) => (
              <td key={`${key}-${elemento}`}>{diccionario[key][elemento]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}