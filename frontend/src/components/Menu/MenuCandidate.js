import React from "react";
import { useAuth } from "context/AuthContext";
// import { getStudent } from "services/students";
import CustomAvatar from "components/Avatar/Avatar";
import { IoMdSettings, IoMdLogOut, IoMdBriefcase } from "react-icons/io";
import { HiOutlineHome } from 'react-icons/hi'

import {
  Logo,
  NavLeft,
  NavList,
  NavItem,
  NavLink,
} from "./styled-components/MainMenuStyled";

const MenuCandidate = ({ username }) => {
  const { logout } = useAuth();
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   getStudent(student?.user?.user_id).then((response) => {
  //     setUser(response);
  //   });
  // }, [student?.user?.user_id]);

  // console.log(token.user.first_name)

  return (
    <>
      <NavLeft>
        <NavLink to="/">
          <Logo>ESCOM</Logo>
        </NavLink>
      </NavLeft>
      <NavList>
        <NavItem>
          <NavLink to="/">
            <HiOutlineHome />
            Inicio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/mis-postulaciones">
            <IoMdBriefcase />
            Mis Postulaciones
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/configuracion">
            <IoMdSettings />
            Configuracion
          </NavLink>
        </NavItem>
        <NavLink to="/perfil">
          <CustomAvatar username={username} width="35px" height="35px" />
        </NavLink>
        <NavItem>
          <NavLink to="/" onClick={logout}>
            <IoMdLogOut />
            Cerrar sesion
          </NavLink>
        </NavItem>
      </NavList>
    </>
  );
};

export default MenuCandidate;
