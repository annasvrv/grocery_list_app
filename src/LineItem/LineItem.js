import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./LineItem.css";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li
      className="item"
      onChange={() => {
        handleCheck(item.id);
      }}
    >
      <input type="checkbox" default={item.checked} />
      <label
        htmlFor=""
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
