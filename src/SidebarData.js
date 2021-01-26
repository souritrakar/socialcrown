import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/socialcrown/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  
  {
    title: 'Forum',
    path: '/socialcrown/forum',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/socialcrown/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }, 
   {
    title: 'Profile',
    path: '/socialcrown/profile',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  }
  
];