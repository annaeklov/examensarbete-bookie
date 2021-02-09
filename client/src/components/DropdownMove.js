import React, { useState } from "react";
import styled from "styled-components";
import { AddBookMove } from "./AddBook.js";
import { RemoveBookMove } from "./RemoveBook.js";

function DropdownMove({
  options,
  selectedOptionMove,
  onSelectedChange,
  previousList,
  bookclubId,
  setShowDropdown,
  clickedBook,
  setShowModal
}) {
  let mappedOptions = options.map((option) => {
    return (
      <button key={option.value} onClick={() => onSelectedChange(option.value)}>
        {option.label}
      </button>
    );
  });

  function onClickMoveBook(
    previousList,
    bookclubId,
    selectedOptionMove,
    clickedBook, 
    setShowModal
  ) {
    setShowDropdown(false);

    //ADD anrop
    AddBookMove(clickedBook, selectedOptionMove, bookclubId);

    //REMOVE anrop
    RemoveBookMove(previousList, bookclubId, clickedBook, setShowModal);
  }

  return (
    <>
      {mappedOptions}
      <button
        onClick={() =>
          onClickMoveBook(
            previousList,
            bookclubId,
            selectedOptionMove,
            clickedBook, 
            setShowModal
          )
        }
      >
        Done
      </button>
    </>
  );
}
export default DropdownMove;
