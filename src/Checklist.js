import React, { useState, useEffect } from "react";

const Checklist = () => {
  const [input, setInput] = useState("");
  const [listItems, setListItems] = useState([]);

  //   Function for Adding item form the list
  const addItem = () => {
    if (input) {
      let value = { name: input, status: 0 };
      listItems.push(value);
      localStorage.setItem("Items", JSON.stringify(listItems));
      setListItems(JSON.parse(localStorage.getItem("Items")) || []);
      setInput("");
    }
  };
  //   Function for removing item form the list
  const removeItem = (index) => {
    listItems.splice(index, 1);
    localStorage.setItem("Items", JSON.stringify(listItems));
    setListItems(JSON.parse(localStorage.getItem("Items")) || []);
  };
  //   Function for updating item form the list
  const WorkComplete = (index) => {
    if (listItems[index].status === 0) {
      listItems[index].status = 1;
    } else {
      listItems[index].status = 0;
    }
    localStorage.setItem("Items", JSON.stringify(listItems));
    setListItems(JSON.parse(localStorage.getItem("Items")) || []);
  };
  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      addItem();
    }
  };
  useEffect(() => {
    setListItems(JSON.parse(localStorage.getItem("Items")) || []);
  }, []);
  return (
    <>
      <div className="checklistBox">
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={onKeyDown}
          value={input}
          placeholder="Enter item name here. . ."
        />
        <p>Total Items - {listItems.length}</p>
        <button
          onClick={() => {
            addItem();
          }}
        >
          Add
        </button>
        {/* <div className="all_list">{allCards}</div> */}
        <div className="all_list">
          {listItems.map((list, i) =>
            list.status === 0 ? (
              <div key={i} className="list_item">
                <div
                  className="item_check"
                  onClick={() => {
                    WorkComplete(i);
                  }}
                >
                  <i className="far fa-square"></i>
                </div>
                <div className="item_name">{listItems[i].name}</div>
                <div
                  className="item_cross"
                  onClick={() => {
                    removeItem(i);
                  }}
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
            ) : null
          )}
          {listItems.map((list, i) =>
            list.status === 1 ? (
              <div key={i} className="list_item">
                <div
                  className="item_check"
                  onClick={() => {
                    WorkComplete(i);
                  }}
                >
                  <i className="fas fa-check-square"></i>
                </div>
                <div className="item_name">{listItems[i].name}</div>
                <div
                  className="item_cross"
                  onClick={() => {
                    removeItem(i);
                  }}
                >
                  <i className="fas fa-times"></i>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default Checklist;
