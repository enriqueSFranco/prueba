import React, { useState } from "react";
import { useGetSkills, useAcademicHistorial } from "hooks";
import { uuid } from "utils";
import { sendStatusApplication } from "services";
import CustomAvatar from "components/Avatar/Avatar";
import Tooltip from "components/Tooltip/TooltipText";
import CustomChip from "components/Chip/Chip";
import { BiDislike } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa";
import { FcBinoculars } from "react-icons/fc";
import { HiDocumentDownload } from "react-icons/hi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from "./Table.module.css";

const TableRow = ({ children, it, index, storedValue, setValue }) => {
  const { t100_id_student, t201_id_application } = it;
  const { t100_name, t100_last_name, t100_profile_picture } = t100_id_student;
  const [open, setOpen] = useState(false);

  const { historial } = useAcademicHistorial(
    it.t100_id_student?.t100_id_student
  );
  const { skills } = useGetSkills(t100_id_student?.t100_id_student);

  const toggle = (index) => {
    if (open === index) return setOpen(null);
    return setOpen(index);
  };

  const handleHireCandidate = () => {
    console.log("contratar candidato");
    sendStatusApplication(
      {
        c205_id_application_state: 4,
      },
      t201_id_application
    )
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const handleFollowUpApplication = () => {
    console.log("dar seguimiento");
    setValue(true);
    sendStatusApplication(
      {
        c205_id_application_state: 2,
      },
      t201_id_application
    )
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const handleRejectApplication = () => {
    console.log("rechazar postulacion");
    sendStatusApplication(
      {
        c205_id_application_state: 5,
      },
      t201_id_application
    )
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  if (!historial) return null;

  console.log("🚀 ~ file: TableRow.js:16 ~ TableRow ~ it", it);

  return (
    <>
      <tr key={uuid()}>
        <td className={styles.td} onClick={() => toggle(index)}>
          {open === index ? (
            <MdKeyboardArrowUp className={styles.arrow} />
          ) : (
            <MdKeyboardArrowDown className={styles.arrow} />
          )}
        </td>
        <td className={styles.td}>
          <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
            <CustomAvatar
              width="50px"
              height="50px"
              username={t100_name}
              picture={t100_profile_picture}
            />
            <span>{`${t100_name} ${t100_last_name}`}</span>
          </div>
        </td>
        <td className={styles.td}>
          {historial[0]?.c109_id_academic_state?.c109_description}
        </td>
        <td className={styles.td}>
          <ul className={styles.list}>
            {skills &&
              skills?.map((skill) => (
                <li key={uuid()} className={styles.listItem}>
                  <CustomChip
                    label={skill?.c116_id_skill?.c116_description}
                    bg="#fff"
                    color="#6D6D6D"
                    outline="1px solid #ccc"
                  />
                </li>
              ))}
          </ul>
        </td>
        <td className={styles.td}>
          <span>{it?.c205_id_application_state?.c205_description}</span>
        </td>
        <td className={styles.td}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title={storedValue ? "Contratar" : `Dar seguimiento`}>
              <button
                className={`btn ${styles.actionsBtn} ${styles.accept}`}
                onClick={
                  storedValue ? handleHireCandidate : handleFollowUpApplication
                }
              >
                {storedValue ? (
                  <FaRegHandshake style={{ fontSize: "22px" }} />
                ) : (
                  <FcBinoculars />
                )}
              </button>
            </Tooltip>
            <Tooltip title="Rechazar candidato">
              <button
                className={`btn ${styles.actionsBtn} ${styles.dismiss}`}
                onClick={handleRejectApplication}
              >
                <BiDislike />
              </button>
            </Tooltip>
            <Tooltip title="Descargar Currículo">
              <button
                className={`btn ${styles.actionsBtn} ${styles.dowloadCV}`}
              >
                <HiDocumentDownload />
              </button>
            </Tooltip>
          </div>
        </td>
      </tr>
      {open === index ? (
        <tr>
          <td colSpan="6">{children}</td>
        </tr>
      ) : null}
    </>
  );
};

export default TableRow;
