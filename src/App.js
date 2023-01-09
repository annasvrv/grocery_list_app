import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import Header from "./Header/Header";
import AddItem from "./AddItem/AddItem";
import SearchItem from "./SearchItem/SearchItem";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import "./App.css";

function App() {
  //  after reloading keep previous list - saved
  // let [items, setItems] = useState(
  //   JSON.parse(localStorage.getItem("shoppinglist") || "[]")
  // );

  // useEffect(() => {
  //   localStorage.setItem("shoppinglist", JSON.stringify(items));
  // }, [items]);

  // changed local storage to data base server - making api requests

  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const ItemsFilter = items.filter((item) =>
    item.item.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
        // console.log(listItems);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    // simulation for rest api
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem([]);
  };

  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && (
          <p className="loadIcon">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="3"
              animationDuration="0.75"
              width="56"
              visible={true}
            />{" "}
            <br />
            Loading Items...
          </p>
        )}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !isLoading && (
          <Content
            items={ItemsFilter}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
