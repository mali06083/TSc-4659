import React, { useState, useEffect, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { nanoid } from "nanoid";
import IconButton from "./IconButton";
import confetti from "canvas-confetti";

interface Product {
  id: string;
  name: string;
  shop: string;
  category: string;
  isBought: boolean;
}

interface Shop {
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredShopId, setFilteredShopId] = useState<string>("");
  const [filteredCategoryId, setFilteredCategoryId] = useState<string>("");
  const [filteredStatus, setFilteredStatus] = useState<string>("all");
  const [filteredName, setFilteredName] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);

  const shops: Shop[] = [
    { id: 1, name: "migros" },
    { id: 2, name: "A 101" },
    { id: 3, name: "Bim" },
    { id: 4, name: "File" },
    { id: 5, name: "CarrefourSa" },
    { id: 6, name: "Şok" },
  ];
  const categories: Category[] = [
    { id: 1, name: "Fruits and Vegetables" },
    { id: 2, name: "Bakery Products" },
    { id: 3, name: "Beverages" },
    { id: 4, name: "Butcher" },
    { id: 5, name: "Canned Spices" },
    { id: 6, name: "Cleaning Products" },
    { id: 7, name: "Electronics" },
    { id: 8, name: "Camping Supplies" },
    { id: 9, name: "Chocolate and Sweets" },
  ];

  const addProduct = () => {
    if (inputValue.trim() && selectedShop && selectedCategory) {
      setProducts([
        ...products,
        {
          name: inputValue,
          shop: selectedShop,
          category: selectedCategory,
          isBought: false,
          id: nanoid(),
        },
      ]);
      setInputValue("");
      setSelectedShop("");
      setSelectedCategory("");
    }
  };
  const toggleBought = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isBought: !product.isBought }
          : product
      )
    );
  };

  const deleteProduct = (productToDelete: Product) => {
    setProducts(
      products.filter((product) => product.id !== productToDelete.id)
    );
  };

  useEffect(() => {
    const isAllBought =
      products.length > 0 && products.every((product) => product.isBought);
    if (isAllBought && !isAlertShown) {
      alert("shopping completed");
      setIsAlertShown(true);
      const fireConfetti = () => {
        confetti({
          particleCount: 200,
          startVelocity: 30,
          spread: 360,
          decay: 0.9,   scalar: 1.2,
        });
      };
      fireConfetti();
    }
  }, [products, isAlertShown]);

  const filteredProducts = products.filter((product) => {
    const matchesShop = filteredShopId ? product.shop === filteredShopId : true;
    const matchesCategory = filteredCategoryId
      ? product.category === filteredCategoryId
      : true;

    const matchesStatus =
      filteredStatus === "all"
        ? true
        : filteredStatus === "bought"
        ? product.isBought
        : !product.isBought;

    const matchesName = product.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());

    return matchesShop && matchesCategory && matchesStatus && matchesName;
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredName(filteredName);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filteredName]);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>SHOPPING LIST</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="product name"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <select
          className="form-select"
          value={selectedShop}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedShop(e.target.value)
          }
        >
          <option value="">select shop</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.name}>
              {shop.name}
              </option>
          ))}
        </select>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="">select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={addProduct}>
          add
        </button>
      </div>

      <div className="filter-group mb-3">
        <select
          className="form-select"
          value={filteredShopId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilteredShopId(e.target.value)
          }
        >
          <option value="">All Shops</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.name}>
              {shop.name}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={filteredCategoryId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilteredCategoryId(e.target.value)
          }
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <div>
          <label>
            <input
              type="radio"
              value="all"
              checked={filteredStatus === "all"}
              onChange={() => setFilteredStatus("all")}
            />
              All
          </label>
          <label>
            <input
              type="radio"
              value="bought"
              checked={filteredStatus === "bought"}
              onChange={() => setFilteredStatus("bought")}
            />
            Purchased
          </label>
          <label>
            <input
              type="radio"
              value="notBought"
              checked={filteredStatus === "notBought"}
              onChange={() => setFilteredStatus("notBought")}
            />
            Not Purchased
          </label>
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="product name"
          value={filteredName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilteredName(e.target.value)
          }
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Shopping List</th>
            <th>product</th>
            <th>shop</th>
            <th>category</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredShopId ||
          filteredCategoryId ||
          filteredStatus !== "all" ||
          filteredName
            ? filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.shop}</td>
                  <td>{product.category}</td>
                  <td>
                    <IconButton onClick={() => deleteProduct(product)} product={product} />
                  </td>
                </tr>
              ))
            : products.map((product, index) => ( <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.shop}</td>
              <td>{product.category}</td>
              <td>
                <IconButton onClick={() => deleteProduct(product)} product={product} />
              </td>
            </tr>
          ))}
    </tbody>
  </table>
  <ul className="list-group">
    {products.map((product, index) => (
      <li
        key={index}
        className="list-group-item"
        style={{
          textDecoration: product.isBought ? "line-through" : "none",
        }}
        onClick={() => toggleBought(product.id)}
      >
        {product.name} - {product.shop} - {product.category}
      </li>
    ))}
  </ul>
</div>
);
}

export default App;