import React from 'react'


export const Tabla=(props)=>{
 
  const { diccionario } = props;
 
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