// import React from "react";

// function Item({ item }) {
//   return (
//     <li className={item.isInCart ? "in-cart" : ""}>
//       <span>{item.name}</span>
//       <span className="category">{item.category}</span>
//       <button className={item.isInCart ? "remove" : "add"}>
//         {item.isInCart ? "Remove From" : "Add to"} Cart
//       </button>
//       <button className="remove">Delete</button>
//     </li>
//   );
// }

// export default Item;
import React from "react";

//function Item({ item }) {
function Item({ item,onDeleteItem, onUpdateItem }) {

  const handleAddToCart=()=>{
    console.log(item.isInCart);
    const itemData={
      isInCart: !item.isInCart
    }
    fetch(`http://localhost:4000/items/${item.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  })
  .then((r) => r.json())
  .then((updatedItem) =>  onUpdateItem(updatedItem));

  } 
  const handleDelete=()=>{
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((item) => onDeleteItem(item));

  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
    
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
    
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}


export default Item; 