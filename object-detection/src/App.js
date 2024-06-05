import React from "react";
import './App.css';
import styled from "styled-components";
import { ObjectComponent } from './components/objectComponents/';

const IContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1c2127;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;

`;
function App() {
  return (
    <IContainer>
      <ObjectComponent/>
    </IContainer>
  );
}

export default App;
