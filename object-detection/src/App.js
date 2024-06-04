import './App.css';
import styled from "styled-components";
import { objectComponent } from './components/objectComponents/';

const iContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1c2127;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;

`;
function App() {
  return (
    <iContainer>
      <objectComponent/>
    </iContainer>
  );
}

export default App;
