import styles from "../starter/components/CountryList.module.css";
import Spinner from "../starter/components/Spinner";
import Message from "../starter/components/Message";
import CountryItem from "../starter/components/CountryItem";
import { useCities } from "../context/CitiesCtx";

function CountryList() {
  const { cities, isLoading } = useCities()
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((c) => (
        <CountryItem country={c} key={c} />
      ))}
    </ul>
  );
}

export default CountryList;
