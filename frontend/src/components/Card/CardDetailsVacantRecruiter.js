import React, { useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "context/AuthContext";
import {
  useFetch,
  useModal,
  useGetObservationVacant,
  useGetObservationVacantManager,
} from "hooks";
import { stateVacant } from "services";
import { USERS } from "types";
import { formatDate, numberFormat } from "utils";
import Loader from "components/Loader/Loader";
import Chip from "components/Chip/Chip";
import Comment from "components/Comment/Comment";
import NoComment from "./CardNoComment";
import FormAddComment from "components/Form/FormAddComment";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaCalendarAlt, FaBrain } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import {
  WrapperLoader,
  WraperCard,
  WrapperIconEdit,
  WrapperActions,
  WrapperComment,
  Description,
  ContentDescription,
  HeaderInfo,
  ListItems,
  Title,
} from "./styled-components/CardDetailsVacantRecruiterStyled";
import Tooltip from "components/Tooltip/TooltipText";
import ModalPortal from "components/Modal/ModalPortal";
import FormPostJob from "components/Form/postJob/FormPostJob";

function createMarkup(description) {
  return { __html: description };
}

const CardDetailsVacantRecruiter = ({ vacantId }) => {
  const [isOpen, openModal, closeModal] = useModal(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isEdition, setIsEdition] = useState(false);
  const observation = useGetObservationVacant({ vacantId: vacantId });
  const observationManager = useGetObservationVacantManager({
    vacantId: vacantId,
  });
  const { token } = useAuth();
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_URL_VACANTS}${vacantId}/`
  );

  const handlePublish = (e) => {
    e.preventDefault();
    stateVacant(vacantId, {
      t400_id_admin: 1,
      c204_id_vacant_status: 2,
      activate: true,
    })
      .then((response) => toast.success(response.message))
      .catch((error) => toast.error(error.message));
  };

  const handleReject = (e) => {
    e.preventDefault();
    stateVacant(vacantId, {
      t400_id_admin: 1,
      c204_id_vacant_status: 4,
      activate: "",
    })
      .then((response) => toast.error(response.message))
      .catch((error) => toast.error(error.message));
  };

  const observationsRecruiter = useMemo(() => observation, [observation]);
  const observationsManager = useMemo(
    () => observationManager,
    [observationManager]
  );

  if (!data || !token || !observationsRecruiter || !observationManager)
    return null;

  const STATUS = data[0]?.c204_id_vacant_status?.c204_id_status;
  const typeOfUser = token?.user?.user_type;

  return (
    <>
      {loading ? (
        <WrapperLoader>
          <Loader />
        </WrapperLoader>
      ) : (
        <>
          <WraperCard typeOfUser={typeOfUser}>
            <HeaderInfo>
              {typeOfUser === USERS.recruiter && (
                <WrapperIconEdit>
                  {STATUS === 1 && (
                    <Tooltip title="Editar Vacante">
                      <FiEdit
                        className="button-edit"
                        onClick={() => {
                          openModal();
                          setDataToEdit(data[0]);
                          setIsEdition(true)
                        }}
                      />
                    </Tooltip>
                  )}
                </WrapperIconEdit>
              )}
              <Title>{data[0]?.t200_job}</Title>
              <ListItems>
                <li>
                  <Chip
                    label={`${data[0]?.t200_street}`}
                    bg="#fff"
                    color="#6D6D6D"
                    icon={
                      <HiOutlineLocationMarker style={{ fontSize: "1rem" }} />
                    }
                  />
                </li>
                <li>
                  <Chip
                    label={`${data[0]?.c207_id_experience?.c207_description}`}
                    bg="#fff"
                    color="#6D6D6D"
                    icon={<FaBrain style={{ fontSize: "1rem" }} />}
                  />
                </li>
                <li>
                  <Chip
                    label={`Fecha de cierre: ${formatDate(
                      new Date(data[0]?.t200_close_date).toLocaleDateString()
                    )}`}
                    bg="#fff"
                    color="#6D6D6D"
                    icon={<FaCalendarAlt style={{ fontSize: "1rem" }} />}
                  />
                </li>
              </ListItems>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                  marginBottom: "1rem",
                }}
              >
                <span>{`Perfil del candidato: ${data[0]?.c206_id_profile?.c206_description}`}</span>
                <span>{`Contratacion: ${data[0]?.c208_id_contract?.c208_description}`}</span>
                <span>{`Sueldo al mes: $${numberFormat(
                  data[0]?.t200_min_salary
                ).replace("MXM", "")} - $${numberFormat(
                  data[0]?.t200_max_salary
                ).replace("MXM", "")}`}</span>
              </div>
            </HeaderInfo>
            <Description>
              <ContentDescription
                dangerouslySetInnerHTML={createMarkup(
                  data[0]?.t200_description
                )}
              />
            </Description>
            {token.user.user_type === USERS.recruiter ? (
              <WrapperActions>
                {data[0]?.c204_id_vacant_status?.c204_id_status === 1 && (
                  <span>Vacante en revision</span>
                )}
              </WrapperActions>
            ) : (
              <WrapperActions>
                <button
                  className="button_admin publish"
                  onClick={handlePublish}
                >
                  Publicar vacante
                  <BiLike style={{ color: "#fff", fontSize: "1.3rem" }} />
                </button>
                <button className="button_admin reject" onClick={handleReject}>
                  Rechazar vacante
                  <IoCloseOutline
                    style={{ color: "#fff", fontSize: "1.3rem" }}
                  />
                </button>
              </WrapperActions>
            )}
          </WraperCard>
          {token.user.user_type === USERS.recruiter ? (
            <WrapperComment typeOfUser={typeOfUser}>
              <header>
                <Title>Observaciones de la Vacante {data[0]?.t200_job}</Title>
              </header>
              <>
                {!observationsManager.length ? (
                  <article
                    style={{
                      height: "calc(100% - 9.3rem)",
                      display: "grid",
                      placeContent: "center",
                    }}
                  >
                    <NoComment />
                    <div
                      style={{
                        position: "relative",
                        bottom: "1rem",
                        left: "3rem",
                      }}
                    >
                      <NoComment borderColor="#3D50D9" />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        position: "relative",
                        top: "1rem",
                        left: "2rem",
                        textAlign: "center",
                      }}
                    >
                      No hay observaciones para esta vacante
                    </h3>
                  </article>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      overflowY: "auto",
                      height: "600px",
                      padding: ".5rem",
                    }}
                  >
                    {observationsRecruiter?.map((el) => (
                      <Comment
                        key={`comment-id-${el?.t223_id_comment}`}
                        comment={el?.t223_comment}
                        date={el?.t223_sent_date}
                        username={token?.user?.first_name}
                        typeUser={el?.t301_id_recruiter?.t301_id_recruiter}
                      />
                    ))}
                  </div>
                )}
              </>
              <FormAddComment
                typeUser={token.user.user_type}
                userId={token.user.id}
                vacantId={vacantId}
              />
            </WrapperComment>
          ) : (
            // TODO: Pasar a un componente independiente
            <WrapperComment typeOfUser={typeOfUser}>
              <Title>Observaciones de la Vacante {data[0]?.t200_job}</Title>
              <>
                {!observationManager.length ? (
                  <div
                    style={{
                      height: "calc(100% - 10rem)",
                      display: "grid",
                      placeContent: "center",
                    }}
                  >
                    <NoComment />
                    <div
                      style={{
                        position: "relative",
                        bottom: ".5rem",
                        left: "3rem",
                      }}
                    >
                      <NoComment borderColor="#3D50D9" />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        position: "relative",
                        top: "1rem",
                        left: "2rem",
                        textAlign: "center",
                      }}
                    >
                      No hay observaciones para esta vacante
                    </h3>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      overflowY: "auto",
                      height: "700px",
                    }}
                  >
                    {observationsManager.map((observation) => (
                      <Comment
                        key={`comment-id-${observation?.t223_id_comment}`}
                        comment={observation?.t223_comment}
                        date={observation?.t223_sent_date}
                        username={token?.user?.first_name}
                        typeUser={
                          observation?.t301_id_recruiter?.t301_id_recruiter
                        }
                      />
                    ))}
                  </div>
                )}
              </>
              <FormAddComment
                typeUser={token.user.user_type}
                userId={token.user.id}
                vacantId={vacantId}
              />
            </WrapperComment>
          )}
        </>
      )}
      <ModalPortal isOpen={isOpen} closeModal={closeModal} minWidth="1000px">
        <div
          style={{
            height: "85vh",
            width: "100%",
            overflowY: "scroll",
            position: "relative",
          }}
        >
          <FormPostJob
            top="0"
            vacantId={data[0]?.t200_id_vacant}
            isEdition={isEdition}
            dataToEdit={dataToEdit}
            nameJob={data[0]?.t200_job}
          />
        </div>
      </ModalPortal>
      <Toaster position="top-right" />
    </>
  );
};

export default CardDetailsVacantRecruiter;
