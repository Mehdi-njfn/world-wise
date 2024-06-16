import styles from "../starter/components/CityList.module.css";
import Spinner from "../starter/components/Spinner";
import CityItem from "./CityItem";
import Message from '../starter/components/Message'
import { useCities } from "../context/CitiesCtx";

function CityList() {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />;

  if(!cities.length) return <Message message='Add your first city by clicking on a city on the map.'/>
  return (
    <ul className={styles.cityList}>
      {cities.map((c) => (
        <CityItem city={c} key={c.id} />
      ))}
    </ul>
  );
}

export default CityList;
