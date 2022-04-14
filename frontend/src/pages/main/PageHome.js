import { useState, useEffect } from "react";
import { getAllJobs } from "services/jobs/index";
import { getAllStates } from "services/catalogs/index";
import Search from "components/Search/Search";
import FilterProfile from "components/Filter/FilterProfile";
import FilterCompany from "components/Filter/FilterCompany";
import JobList from "components/Card/JobList/JobList";
import FilterHomeOffice from "components/Filter/FilterHomeOffice";
import Deck from "components/Deck/Deck";
import Footer from "components/Footer/Footer";
import homeStyles from "./PageHome.module.css";

const Home = () => {
  const [, setSearch] = useState(""); // estado de la busqueda
  const [dataList, setDataList] = useState([]); // lista de vacantes
  const [isFiltered, setIsFiltered] = useState(false); // boolean para saber si la informacion se tiene que filtrar
  const [data, setData] = useState(null); // lista filtrada
  const [loading, setLoading] = useState(true);

  const [isFilteredBusiness, setIsFilteredBusiness] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // informacion filtrada
  const [totalJobs, setTotalJobs] = useState(0); // estado para el total de vacantes

  /**
   * Funcion para filtrar las vacantes por nombre
   * @param {String} value
   **/
  const filteredData = (value) => {
    setSearch(value);
    if (value === "") {
      setData(dataList);
    } else {
      const filteredData = dataList.filter((el) => {
        let regex = new RegExp(`${value}`, "gi");
        return el?.t200_job.match(regex);
      });
      setTotalJobs(filteredData.length);
      setData(filteredData);
    }
  };

  useEffect(() => {
    getAllJobs()
      .then((response) => {
        setDataList(response.data);
        setTotalJobs(response.data.length);
        setLoading(false); // desactivamos el modo "cargando"
      })
      .catch((error) => console.error(error));

      return () => null;
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    filteredData(value);
    /**
     * Si el valor introduciodo en el campo ded busqueda es diferente
     * a una cadena vacia, entonces filtramos los datos.
     **/
    setIsFiltered(value !== "");
  };

  /**
   * Filtra los empleos que tengan la etiqueta t200_home_office === true
   * @return devuelve los empleos que sean con modalidada home office
   **/
  const handleChecked = () => {
    console.log(isChecked)
    setIsChecked(!isChecked);
    if (!isChecked) {
      // mostramos las vacantes que son home office
      let newData = dataList.filter((data) => {
        return data?.t200_home_ofice;
      });
      setData(newData);
      setTotalJobs(newData.length);
    } else {
      // mostramos todas las vacantes
      setDataList(dataList);
      setTotalJobs(dataList.length);
    }
  };

  /**
   * Filtra los empleos por empresa
   * @return devuleve los empleos publicados por una empresa seleccionada
   **/
  const filterBusiness = (e) => {
    let input = e.target.value;
    if (input === "") {
      setData(dataList);
      setTotalJobs(dataList.length);
    } else {
      setIsFilteredBusiness(true);
      let newData = dataList.filter((data) => {
        return data?.t300_id_company.t300_name === input;
      });
      setData(newData);
      setTotalJobs(newData.length);
    }
  };

  if (!dataList && !data) return null;

  return (
    <main className={homeStyles.home}>
      {/* barra de busqueda  */}
      <Search handleSearch={handleSearch} data={dataList} />

      {/* control de filtros */}
      <div className={homeStyles.filteredControls}>
        <span className={homeStyles.textFilter}>Filtros</span>
        <FilterProfile />
        <FilterCompany onChange={filterBusiness} />
        <FilterHomeOffice value={isChecked} onChange={handleChecked} />
      </div>

      {/* renderizado de los empleos */}
      <article className={homeStyles.wrapperJobList}>
        <p className={homeStyles.totalJobs}>
          Total de vacantes: <em>{totalJobs}</em>
        </p>
        <JobList
          jobs={
            !isFiltered && !isChecked && !isFilteredBusiness ? dataList : data
          }
          loading={loading}
        />
      </article>

      {/* comunicados */}
      <article className={`${homeStyles.wrapperDeck}`}>
        <h2>Comunicados Recientes</h2>
        <Deck />
      </article>

      {/* pie de pagina */}
      <Footer />
    </main>
  );
};

export default Home;
