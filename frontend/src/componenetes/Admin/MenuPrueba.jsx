import React from 'react';
import { scaleRotate as SlideMenu } from 'react-burger-menu';

export class Menu1 extends React.Component {
  showSettings(event) {
    event.preventDefault();
    // Aquí puedes agregar la lógica para mostrar los ajustes
  }

  render() {
    const menuStyles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '20px',
        top: '20px',
      },
      bmBurgerBars: {
        background: '#373a47',
      },
      bmBurgerBarsHover: {
        background: '#a90000',
      },
      bmCrossButton: {
        height: '24px',
        width: '24px',
      },
      bmCross: {
        background: '#bdc3c7',
      },
      bmMenuWrap: {
        position: 'fixed',
        height: '100%',
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
      },
      bmMorphShape: {
        fill: '#373a47',
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
      },
      bmItem: {
        display: 'inline-block',
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
      },
    };

    return (
      <SlideMenu styles={menuStyles}>
        <ul className="dropdown-menu__list">
          <li className="dropdown-menu__item">Item 1</li>
          <li className="dropdown-menu__item">Item 2</li>
          <li className="dropdown-menu__item">Item 3</li>
          <li className="dropdown-menu__item">Item 4</li>
          <li className="dropdown-menu__item"> 
            <a
            onClick={this.showSettings}
            className="menu-item--small"
            href=""
          >Settings
          </a>
        </li>
        </ul>
        <a
          onClick={this.showSettings}
          className="menu-item--small"
          href=""
        >
          Settings
        </a>
      </SlideMenu>
    );
  }
}


// import React from 'react';
// import { slide as SlideMenu } from 'react-burger-menu';

// export class Menu1 extends React.Component {
//   showSettings(event) {
//     event.preventDefault();
//     // Aquí puedes agregar la lógica para mostrar los ajustes
//   }

//   render() {
//     // NOTA: También necesitas proporcionar estilos, consulta https://github.com/negomi/react-burger-menu#styling
//     return (
//       <SlideMenu>
//         <a id="home" className="menu-item" href="/">
//           Home
//         </a>
//         <a id="about" className="menu-item" href="/about">
//           About
//         </a>
//         <a id="contact" className="menu-item" href="/contact">
//           Contact
//         </a>
//         <a
//           onClick={this.showSettings}
//           className="menu-item--small"
//           href=""
//         >
//           Settings
//         </a>
//       </SlideMenu>
//     );
//   }
// }








// import React, { useContext, useEffect, useState } from 'react';
// import { scaleRotate as Menu } from 'react-burger-menu'

// export class Menu1 extends React.Component {
//   showSettings (event) {
//     event.preventDefault();
    
//   }

//   render () {

//     return (

//       <Menu>
//         <a id="home" className="menu-item" href="/">Home</a>
//         <a id="about" className="menu-item" href="/about">About</a>
//         <a id="contact" className="menu-item" href="/contact">Contact</a>
//         <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
//       </Menu>
//     );
//   }
// }