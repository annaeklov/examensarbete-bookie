import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

function AddModal({
  showAddModal,
  setShowAddModal,
  clickedBookToAdd,
  userInfo,
}) {
  const [active, setActive] = useState("");


  function changeTab(e) {
    console.log(e.target.value);
    setActive(e.target.value);
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
        <Tabs>
          <p>{userInfo.username}: </p>
          <Button
            active={active === "readProfile"}
            value="readProfile"
            onClick={changeTab}
          >
            READ
          </Button>
          <Button
            active={active === "toReadProfile"}
            value="toReadProfile"
            onClick={changeTab}
          >
            TO READ
          </Button>
          <Button
            active={active === "currentlyProfile"}
            value="currentlyProfile"
            onClick={changeTab}
          >
            CURRENTLY
          </Button>
        </Tabs>
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
  border-bottom: ${(props) => (props.active ? "2px solid #262824" : "")};
  outline: ${(props) => (props.active ? "none" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
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
