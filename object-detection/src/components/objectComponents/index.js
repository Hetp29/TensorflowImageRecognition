import React, { useRef } from "react";
import { useState } from "react";
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
    const [imgD, setImgD] = useState(null);

    const openFile = () => {
        if(fileRef.current) fileRef.current.click();
    }
    const objDetection = async (element) => {
        const image = await cocoSsd.load({    })
        const detected = await image.detect(element, 10);
        console.log("Predictions: ", detected);

    };
    const readI = (file) => {
        return new Promise((resolve, reject) => {
            const fileRead = new FileReader();
            fileRead.onload = () => resolve(fileRead.result);
            fileRead.onerror = () => reject(fileRead.error);
            fileRead.readAsDataURL(file);
        });
    };
    const onSelect = async (e) => {
        const file = e.target.files[0];
        const imgD = await readI(file);
        setImgD(imgD);
        const element = document.createElement("img");
        element.src = imgD;
        element.onload = async () => {
            await objDetection(element);
        }
    };
    return (
    <DetectorContainer>
        <ImageContainer> {imgD && <MainImage src={imgD}/>}</ImageContainer>
        <FileInput type="file" ref={fileRef} onChange={onSelect} />
        <ChooseButton onClick={openFile}>Pick your image</ChooseButton>
    </DetectorContainer>
    );
}