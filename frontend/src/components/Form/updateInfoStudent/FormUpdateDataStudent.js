import { useContext, useEffect, useState } from "react";
import { useForm } from "hooks/useForm";
import AuthContext from "context/AuthContext";
import { Toaster } from "react-hot-toast";
import { updateStudent, getLinks } from "services/students/index";
import { updateStudentInitialForm } from "../schemes";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Label from "../../Element/Label/Label";
import Switch from "../../Element/Switch/Switch";
import * as BiIcon from "react-icons/bi";
import styles from "./FormUpdateDataStudent.module.css";

const validateForm = (form) => {
  let errors = {};
  let regex = {
    t100_name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,16}$/,
    t100_specialty: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,16}$/,
    t100_location: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,16}$/,
    t100_phone: "",
  };

  if (!form.t100_name.trim()) errors.t100_name = "";
  else if (!regex.t100_name.test(form.t100_name.trim())) errors.t100_name = "";

  return errors;
};

const FormUpdateDataStudent = ({ student }) => {
  const [links, setLinks] = useState(null);
  const { token } = useContext(AuthContext);
  const { form, handleChange, handleChecked } = useForm(
    updateStudentInitialForm,
    validateForm
  );

  let studentCopy = {
    ...form,
    t100_boleta: student[0]?.t100_boleta,
    t100_email: student[0]?.t100_email,
  };

  let id = token?.user?.user_id;

  useEffect(() => {
    getLinks()
      .then((response) => {
        setLinks(response);
      })
      .catch((error) => console.log(error));
  }, []);

  //TODO: redireccion despues de haber actualizado los datos del alumno.
  function handleSubmit(e) {
    e.preventDefault();
    updateStudent(id, studentCopy)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log(links);

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>editar perfil</h1>
        </header>
        <form onSubmit={handleSubmit} className={`container ${styles.form}`}>
          <div className={styles.inputGroup}>
            <div className={styles.inputGroupFlex}>
              <TextField
                size="small"
                label="Nombre"
                id="t100_name"
                name="t100_name"
                autoComplete="off"
                sx={{ width: "280px", maxWidth: "100%" }}
                // defaultValue={student[0]?.t100_name}
                value={form.t100_name}
                onChange={handleChange}
              />
              <TextField
                size="small"
                label="Apellido"
                id="t100_last_name"
                name="t100_last_name"
                autoComplete="off"
                sx={{ width: "280px", maxWidth: "100%" }}
                // defaultValue={student[0]?.t100_last_name}
                value={form.t100_last_name}
                onChange={handleChange}
              />
            </div>

            <TextField
              size="small"
              label="Especialidad"
              id="t100_speciality"
              name="t100_speciality"
              autoComplete="off"
              sx={{ width: "280px", maxWidth: "100%" }}
              // defaultValue={student[0]?.t100_speciality ?? ""}
              value={form.t100_speciality}
              onChange={handleChange}
            />

            <div className={styles.flexInput}>
              <TextField
                size="small"
                label="Donde vives"
                id="t100_residence"
                name="t100_residence"
                autoComplete="off"
                sx={{ width: "280px", maxWidth: "100%" }}
                // defaultValue={student[0]?.t100_residence ?? ""}
                value={form.t100_residence}
                onChange={handleChange}
              />
              <Switch
                label="Disponibilidad para viajar"
                name="t100_travel"
                id="t100_travel"
                value={form.t100_travel}
                onChange={handleChecked}
                checked={form.t100_travel}
              />
            </div>

            <TextField
              size="small"
              type="text"
              label="Telefono/Whatsapp"
              id="t100_phonenumber"
              name="t100_phonenumber"
              autoComplete="off"
              sx={{ width: "280px", maxWidth: "100%" }}
              // defaultValue={student[0]?.t100_phonenumber}
              value={form.t100_phonenumber}
              onChange={handleChange}
            />
            <div>
              <input
                type="file"
                name="cv"
                id="cv"
                className={`${styles.inputFile}`}
                value={form.file}
                onChange={handleChange}
              />
              <Label htmlFor="cv">
                <BiIcon.BiCloudUpload />
                subir cv
              </Label>
            </div>
            <div className={styles.inputGroupFlex_1_3}>
              <h3 className={styles.titleH3}>Cuentas con alguna red social?</h3>
              <div className={styles.flexInput}>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  margin="dense"
                >
                  <InputLabel id="c115_id_plataform">Red Social</InputLabel>
                  <Select
                    labelId="c115_id_plataform"
                    id="c115_id_plataform"
                    value={form.c115_id_plataform}
                    label="Red Social"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Red Social</em>
                    </MenuItem>
                    {links &&
                      links?.map((link) => (
                        <MenuItem
                          key={link?.c115_description}
                          value={link?.c115_description}
                        >
                          {link?.c115_description}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  sx={{ width: "300px" }}
                  size="small"
                  label="link"
                  autoComplete="off"
                  id="t113_link"
                  name="t113_link"
                  value={form?.t113_link}
                  onChange={handleChange}
                />
                <button type="button" className={styles.btnAdd}>
                  +
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.btnUpdate}>
            Actualizar
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default FormUpdateDataStudent;
