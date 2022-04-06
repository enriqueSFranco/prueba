import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { motion } from "framer-motion" ;
import TextField from "@mui/material/TextField";
import Label from "../Input/Label";
import Switch from "../Input/Switch";
import { updateStudentInitialForm } from "./schemes";
import * as BiIcon from "react-icons/bi";
import styles from "./FormUpdateDataStudent.module.css";


const validateForm = form => {
  let errors = {};
  let regex = {
    t100_name: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,16}$/,
    t100_specialty: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,16}$/,
    t100_location: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,16}$/,
    t100_phone: "",
  }
};

const FormUpdateDataStudent = ({ student, handleBackToProfile }) => {
  const { form, handleChange, handleChecked } = useForm(updateStudentInitialForm, validateForm);
  const [file, setfile] = useState(null);

  return (
    <>
      <motion.div
        className={styles.wrapper}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        duration={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>editar informacion</h1>
        <form className={`container ${styles.form}`}>
          <div className="mb-4">
            <TextField
              label="Nombre"
              id="name"
              name="name"
              sx={{ width: 450, maxWidth: "100%" }}
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Especialidad"
              id="specialty"
              name="specialty"
              sx={{ width: 450, maxWidth: "100%" }}
              value={form.specialty}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Donde vives"
              id="location"
              name="location"
              sx={{ width: 450, maxWidth: "100%" }}
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <Switch
            label="Disponibilidad para viajar"
            name="travel"
            id="travel"
            value={form.travel}
            onChange={handleChecked}
          />
          <div className="mb-4">
            <TextField
              type="tel"
              label="Telefono/Whatsapp"
              id="phone"
              name="phone"
              sx={{ width: 450, maxWidth: "100%" }}
              value={form.phone}
              onChange={handleChange}
              
            />
          </div>
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
          <div>{/* links de redes sociales */}</div>
        </form>
        <div className="container w-100">
          <div className="row">
            <div className="col">
              <button className="btn btn-outline-primary w-100 my-1">
                <div className="row align-items-center">
                  <div className="col-12 col-md-10 text-center">Actualizar</div>
                </div>
              </button>
            </div>
            <div className="col">
              <button
                onClick={handleBackToProfile}
                className="btn btn-outline-danger w-100 my-1"
              >
                <div className="row align-items-center">
                  <div className="col-12 col-md-10 text-center">Cancelar</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FormUpdateDataStudent;
