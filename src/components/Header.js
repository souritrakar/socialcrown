import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {SidebarData} from "../SidebarData"
import {Avatar} from "@material-ui/core"
import '../Header.css';
import { IconContext } from 'react-icons';

function Header({photo}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
     
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Avatar alt="Cindy Baker" src={photo} className="avatar" style={{borderColor:"green",marginLeft:"2.5%",marginBottom: "0.3%"}} />
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
    
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>

           <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Header;