import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";

const ProfilePage = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState(-1);

  const getdata = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "GET",
      });
      const result = await resp.json();
      console.log(result.data.products);
      setProducts(result.data.products);
    } catch (err) {
      console.log("getting error", err.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.title.value;
      const price = e.target.price.value;
      const description = e.target.description.value;
      const quantity = e.target.quantity.value;
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title,
          price,
          description,
          quantity,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (resp.status == "201") {
        alert("product added!");
        getdata();
        console.log(resp);
      } else {
        const result = await resp.json();
        alert(`invalid data : ${result.message}`);
      }
    } catch (err) {
      console.log("Cannot create product  -->  ", err.message);
    }
    // console.log(title, price, description, quantity);
  };

  const handelEdit = async (productId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            price: updatedPrice,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("success fully updated");
        alert("success fully updated");
        setEditProductId("");
        getdata();
      } else {
        const result = res.json();
        console.log(result.message);
      }
    } catch (err) {
      console.log("error in editing product  -->  ", err.message);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <form
          onSubmit={handleSubmit}
          className=" mx-auto my-4 flex flex-col gap-5 p-6 bg-blue-200 max-w-150"
        >
          <div className="flex gap-4">
            <label>Title</label>
            <input
              className="border-1 py-1 px-2 rounded-md"
              name="title"
              type="text"
            ></input>
          </div>
          <div className="flex gap-4">
            <label>Price</label>
            <input
              className="border-1  py-1 px-2 rounded-md"
              name="price"
              type="number"
            ></input>
          </div>
          <div className="flex gap-4">
            <label>Description</label>
            <input
              className="border-1 py-1 px-2 border-blue-800 rounded-md"
              name="description"
              type="text"
            ></input>
          </div>
          <div className="flex gap-4">
            <label>quantity</label>
            <input
              className="border-1 py-1  border-blue-800 px-2 rounded-md"
              name="quantity"
              type="number"
            ></input>
          </div>
          <button className="border-1 py-1 px-2 rounded-md ">
            Add products
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-6 justify-center py-6 px-4">
        {products.map((elem) => {
          return (
            <div
              key={elem._id}
              className="w-64 bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                {elem.title}
              </h1>

              {elem._id === editProductId ? (
                <>
                  <input
                    className="border-1  py-1 px-2 rounded-md"
                    name="price"
                    type="number"
                    value={updatedPrice}
                    onChange={(e) => {
                      setUpdatedPrice(e.target.value);
                    }}
                  ></input>
                  <button
                    onClick={() => {
                      setEditProductId("");
                    }}
                    className="border-1 py-1 px-2 rounded-md "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handelEdit(elem._id);
                    }}
                    className="border-1 py-1 px-2 rounded-md "
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-1"> Price: ₹{elem.price}</p>
                  <button
                    onClick={() => {
                      setEditProductId(elem._id);
                    }}
                    className="border-1 py-1 px-2 rounded-md "
                  >
                    Edit
                  </button>
                </>
              )}

              <p className="text-gray-600 mb-1">
                {" "}
                Description: {elem.description}
              </p>
              <p className="text-gray-600"> Quantity: {elem.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProfilePage };
