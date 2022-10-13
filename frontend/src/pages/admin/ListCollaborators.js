import React from "react";
import { useModal, useFetch } from "hooks";
import Button from "components/Button/Button"
import LayoutAdmin from "Layout/LayoutAdmin";
import FormAddCollaborator from 'components/Form/FormAddCollaborator'
import ModalPortal from "components/Modal/ModalPortal";
import CardCollaborator from "components/Card/CardCollaborator";
import { MdAddCircleOutline } from "react-icons/md"
import { WrapperList, HeaderTop } from '../styled-components/ListCollaboratorsStyled'

const ListCollaborators = () => {
  const { data, error, loading } = useFetch(process.env.REACT_APP_URL_MANAGET_ADMINISTRATORS)
  const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false);
  const [isOpenModalDelete, openModalDelete, closeModalDelete] =
    useModal(false);
  const [isOpenModalAdd, openModalAdd, closeModalAdd] = useModal(false)

  if (!data) return null

  console.log(data)

  return (
    <>
      <LayoutAdmin>
        <HeaderTop>
          <Button onClick={openModalAdd} text={<MdAddCircleOutline style={{fontSize: '2rem'}} />} bgColor="transparent" color="#000" />
        </HeaderTop>
        <WrapperList>
          {
            data?.map(el => (
              <CardCollaborator
                key={`item-collaborator-${el?.t400_emal}`}
                collaboratorName={el?.t400_name}
                position={el?.t400_position}
                openModalDelete={openModalDelete}
                openModalEdit={openModalEdit}
              />
            ))
          }
        </WrapperList>
      </LayoutAdmin>


      <ModalPortal isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
        <h1>Editar Informacion de colaborador</h1>
      </ModalPortal>

      <ModalPortal isOpen={isOpenModalDelete} closeModal={closeModalDelete}>
      <h1>Eliminar colaborador</h1>

      </ModalPortal>


      <ModalPortal isOpen={isOpenModalAdd} closeModal={closeModalAdd}>
        <h2 style={{textAlign: 'center'}}>Agregar colaborador</h2>
        <FormAddCollaborator />
      </ModalPortal>
    </>
  );
};

export default ListCollaborators;
