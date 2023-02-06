import React from "react";
import { Collection } from "./Collection";
import "./index.scss";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategory] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [colletction, setCollections] = React.useState([]);

  const category = categoryId ? `category=${categoryId}` : "";
  const pageParam = page ? `category=${page}` : "";
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6370631308218c267efea394.mockapi.io/photos?page=${pageParam}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((error) => {
        console.warn(error);
        alert("Ощибка");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {colletction[0]?.categories.map((item, i) => (
            <li
              onClick={() => setCategory(i)}
              className={categoryId === i ? "active" : ""}
              key={item.name}
            >
              {item?.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h1>Идет загрузка...</h1>
        ) : (
          colletction[0]?.collections
            .filter((obj) => {
              return obj.name
                .toLowerCase()
                .includes(searchValue.toLocaleLowerCase());
            })
            .map((item, index) => (
              <Collection key={index} name={item.name} images={item.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            onClick={() => setPage(index)}
            className={page === index ? "active" : ""}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
