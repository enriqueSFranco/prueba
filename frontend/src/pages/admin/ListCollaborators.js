import React from "react";
import { useModal, useFetch } from "hooks";
import LayoutHome from "Layout/LayoutHome";
import Button from "components/Button/Button";
import Tooltip from "components/Tooltip/TooltipText";
import FormAddCollaborator from "components/Form/FormAddCollaborator";
import ModalPortal from "components/Modal/ModalPortal";
import CardCollaborator from "components/Card/CardCollaborator";
import { MdAddCircleOutline } from "react-icons/md";
import {
  WrapperList,
  HeaderTop,
} from "../styled-components/ListCollaboratorsStyled";

const ListCollaborators = () => {
  const { data } = useFetch(process.env.REACT_APP_URL_MANAGER_ADMINISTRATORS);
  const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false);
  const [isOpenModalDelete, openModalDelete, closeModalDelete] =
    useModal(false);
  const [isOpenModalAdd, openModalAdd, closeModalAdd] = useModal(false);

  if (!data) return null;

  return (
    <LayoutHome>
      <HeaderTop>
        <h2 className="title">Agregar Colaborador</h2>
        <Tooltip title="Agregar un nuevo colaborador">
          <Button
            onClick={openModalAdd}
            text={
              <MdAddCircleOutline
                style={{ fontSize: "2rem", color: "#125dfc" }}
              />
            }
            bgColor="transparent"
            color="#000"
          />
        </Tooltip>
      </HeaderTop>
      <WrapperList>
        {data?.map((el) => (
          <CardCollaborator
            key={`item-collaborator-${crypto.randomUUID()}`}
            userId={el?.t400_id_admin}
            collaboratorName={el?.t400_name}
            position={el?.t400_position}
            openModalDelete={openModalDelete}
            openModalEdit={openModalEdit}
          />
        ))}
      </WrapperList>

      <ModalPortal isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
        <h2 className="title">Editar colaborador</h2>
        <FormAddCollaborator />
      </ModalPortal>

      <ModalPortal isOpen={isOpenModalDelete} closeModal={closeModalDelete}>
        <h2 className="title">Eliminar colaborador</h2>
      </ModalPortal>

      <ModalPortal
        isOpen={isOpenModalAdd}
        closeModal={closeModalAdd}
        minWidth="750px"
      >
        <h2 className="title">Agregar colaborador</h2>
        <FormAddCollaborator />
      </ModalPortal>
    </LayoutHome>
  );
};

export default ListCollaborators;
