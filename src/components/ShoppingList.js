import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then((res) =>res.json())
    .then((data) => {
      setItems(data)
    })
  },[])
//add to cart
  function handleAddToCart(newItem){
    setItems([...items, newItem])
  };
//delete
  function handleDeleteItem(deletedItem) {
    const newItems = items.filter(item => item.id !== deletedItem.id);
    setItems(newItems);
  }
  //update
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item =>{
      if(item.id === updatedItem.id) return updatedItem;
      return item
    });
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
   
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
     
      <ItemForm  onAddItem={handleAddToCart}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
         // <Item key={item.id} item={item} />
          <Item key={item.id} item={item} onDeleteItem={handleDeleteItem}  onUpdateItem={handleUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
