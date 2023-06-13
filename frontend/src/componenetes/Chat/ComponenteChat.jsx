import React, { useEffect } from 'react';

export const ChatComponent = () => {
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/647a33ab7c7b15544f3eaa9a/1h1uljm40';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }, []);

  return (
    <div>
      <h1>Prueba de componente de chat en vivo</h1>
      <p>Este es un componente de prueba para mostrar el chat en vivo de Tawk.to.</p>
      <p>El chat en vivo debe cargarse y estar disponible en esta sección.</p>
    </div>
  );
};

