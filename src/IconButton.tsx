import React from "react";
import { FaTrash } from "react-icons/fa";
import { ProductType } from './path/to/ProductType';

const IconButton: React.FC<{ onClick: (product: ProductType) => void; product: ProductType }> = ({ onClick, product }) => {
  return (
    <button onClick={() => onClick(product)} className="btn btn-danger">
      <FaTrash />
    </button>
  );
};

export default IconButton;
