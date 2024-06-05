import React, { useRef } from "react";
import styled from "styled-components";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const DetectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImageContainer = styled.div`
    min-width: 200px;
    height: 500px;
    border: 3px solid #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; 
`;

const MainImage = styled.img`
    height: 100%;
`;

const FileInput = styled.input`
    display: none;
`;

const ChooseButton = styled.button`
    padding: 7px 10px;
    border: 2px solid transparent;
    background-color: #fff;
    color: BLACK;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    margin-top: 2em;
    cursor: pointer;
    transition: all 260ms ease-in-out;
    &:hover {
        background-color: transparent;
        border: 2px solid #fff;
        color: #fff;
    }
`;
export function ObjectComponent(props) {
    const fileRef = useRef();

    const openFile = () => {
        if(fileRef.current) fileRef.current.click();
    }
    return (
    <DetectorContainer>
        <ImageContainer>Img</ImageContainer>
        <FileInput type="file" ref={fileRef}/>
        <ChooseButton onClick={openFile}>Pick your image</ChooseButton>
    </DetectorContainer>
    );
}