import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { AddBook } from "./AddBook.js";

function AddModal({
  showAddModal,
  setShowAddModal,
  clickedBookToAdd,
  userInfo,
}) {
  const [activeTab, setActiveTab] = useState("");
  const [selectedBookclubId, setSelectedBookclubId] = useState("");

  function changeTab(e) {
    setActiveTab(e.target.value);
    setSelectedBookclubId(e.target.id);
  }
/*   console.log("activeTab", activeTab);
  console.log("bookclub id", selectedBookclubId);
  console.log("clickedBookToAdd", clickedBookToAdd);
 */
  let mappedBookclubs;

  if (userInfo.bookclubs) {
    mappedBookclubs = userInfo.bookclubs.map((club) => {
      return (
        <Tabs>
          <p key={club.bookclub_id}>{club.name}</p>
          <Button
            active={activeTab === `read${club.bookclub_id}`}
            value="booksRead"
            onClick={changeTab}
            id={club.bookclub_id}
          >
            READ
          </Button>
          <Button
            active={activeTab === `toRead${club.bookclub_id}`}
            value="booksToRead"
            onClick={changeTab}
            id={club.bookclub_id}
          >
            TO READ
          </Button>
          <Button
            active={activeTab === `currently${club.bookclub_id}`}
            value="currentlyReading"
            onClick={changeTab}
            id={club.bookclub_id}
          >
            CURRENTLY
          </Button>
        </Tabs>
      );
    });
  }

  function onClickAddTo(clickedBookToAdd, activeTab, selectedBookclubId) {
    console.log("clicked add", clickedBookToAdd, activeTab, selectedBookclubId);
    AddBook(clickedBookToAdd, activeTab, selectedBookclubId);
  }

  return (
    <ModalContainer>
      <ModalDiv>
        <TopDiv>
          <button onClick={() => setShowAddModal(false)}>
            <GrClose />
          </button>
          <p>
            Add <strong>{clickedBookToAdd.volumeInfo.title}</strong> to...
          </p>
        </TopDiv>
{/*         <Tabs>
          <p>{userInfo.username}: </p>
          <Button
            active={activeTab === `read${userInfo._id}`}
            value="read"
            onClick={changeTab}
            id={userInfo._id}
          >
            READ
          </Button>
          <Button
            active={activeTab === `toRead${userInfo._id}`}
            value="toRead"
            onClick={changeTab}
            id={userInfo._id}
          >
            TO READ
          </Button>
          <Button
            active={activeTab === `currently${userInfo._id}`}
            value="currently"
            onClick={changeTab}
            id={userInfo._id}
          >
            CURRENTLY
          </Button>
        </Tabs> */}
        {mappedBookclubs}

        <button
          style={{ marginTop: "15px" }}
          onClick={() => {
            onClickAddTo(clickedBookToAdd, activeTab, selectedBookclubId);
          }}
        >
          ADD
        </button>
      </ModalDiv>
    </ModalContainer>
  );
}
export default AddModal;

const Tabs = styled.nav`
  width: 100%;
  height: 30px;
  border-top: 1px solid lightgrey;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0 10px 0;
`;

const Button = styled.button`
  border: none;
  color: #262824;
  background-color: transparent;
  :focus {
    border-bottom: 2px solid #262824;
    outline: none;
    font-weight: bold;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  //backdrop-filter: blur(3px);
  padding: 10px;
  z-index: 1;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 50%;
  background-color: white;
  padding: 10px;
  z-index: 2;
  overflow: auto;
  border-radius: 5px;
`;

const TopDiv = styled.div`
  margin: 10px 0;
  button {
    width: 50px;
    height: 30px;
    border: none;
    background-color: transparent;
    svg {
      font-size: 20px;
    }
  }
`;
