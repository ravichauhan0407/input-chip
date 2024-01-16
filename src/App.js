import logo from "./logo.svg";
import "./App.css";
import MulipleChipInput from "./Component/MulipleChipInput";
import { autocompleteSuggestions } from "./constants";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function App() {
  const [selectedValues, setSelectedValues] = useState([]);
  const options = useMemo(() => {
    const newData = Array.from({ length: 10 }, () => ({
      name: faker.internet.userName(),
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
    }));

    return newData;
  }, []);


  return (
    <MulipleChipInput
      options={options}
      searchKeys={["name", "email"]}
      renderValue={(item) => <div>{item?.name}</div>}
      onChange={(values) => setSelectedValues(values)}
    />
  );
}

export default App;
