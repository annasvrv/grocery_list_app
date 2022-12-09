import React from "react";
import LineItem from "../LineItem/LineItem";
import "./Itemlist.css";

const Itemlist = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul className="Itemlist">
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default Itemlist;
