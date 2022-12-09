import React from "react";
import Itemlist from "../Itemlist/Itemlist";
import "./Content.css";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <Itemlist
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "50px" }}>Your list is empty</p>
      )}
    </main>
  );
};

export default Content;
