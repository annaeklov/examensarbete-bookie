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
  setShowModal,
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
    //REMOVE anrop

    RemoveBookMove(previousList, bookclubId, clickedBook, setShowModal);

    //ADD anrop
    AddBookMove(clickedBook, selectedOptionMove, bookclubId);
  }

  return (
    <DropdownDiv>
      <div className="optionsDiv">{mappedOptions}</div>
      <button
        className="done"
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
    </DropdownDiv>
  );
}
export default DropdownMove;

const DropdownDiv = styled.div`
  display: flex;
  width: 280px;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 5px;
  .optionsDiv {
    display: flex;
    width: 80%;
    height: 35px;
    button {
      width: 30%;
      margin: 2px;
      height: 100%;
      :focus {
        border-bottom: 2px solid #262824;
        outline: none;
        font-weight: bold;
      }
    }
  }
  .done {
    border: 1px solid grey;
    border-radius: 5px;
    width: 60px;
    height: 40px;
    box-shadow: 2px 0px 4px lightgrey;
    :active,
    :focus {
      outline: none;
    }
  }
`;
