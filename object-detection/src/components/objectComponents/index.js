import React, { useRef, useState } from "react";
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

const Target = styled.div`
    position: absolute;
    left: ${({ x }) => x + "px"};
    top: ${({ y }) => y + "px"};
    width: ${({ width }) => width + "px"};
    height: ${({ height }) => height + "px"};
    border: 4px solid #1ac71a;
    background-color: transparent;
    z-index: 20;
    &::before {
        content: "${({ classType, score }) => `${classType} ${score.toFixed(2)}`}";
        color: #1ac71a;
        font-weight: 500;
        font-size: 16px;
        position: absolute;
        top: -1.5em;
        left: -5px;
    }
`;

export function ObjectComponent() {
    const fileRef = useRef();
    const [imgD, setImgD] = useState(null);
    const [detected, setDetected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openFile = () => {
        if (fileRef.current) fileRef.current.click();
    };

    const objDetection = async (element) => {
        setLoading(true);
        setError(null);
        try {
            const model = await cocoSsd.load();
            const predictions = await model.detect(element, 10);
            setDetected(predictions);
        } catch (err) {
            setError("Error during detection. Please try again.");
        }
        setLoading(false);
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
        };
    };

    return (
        <DetectorContainer>
            <ImageContainer>
                {imgD && <MainImage src={imgD} />}
                {detected.map((item, index) => (
                    <Target
                        key={index}
                        x={item.bbox[0]}
                        y={item.bbox[1]}
                        width={item.bbox[2]}
                        height={item.bbox[3]}
                        classType={item.class}
                        score={item.score}
                    />
                ))}
            </ImageContainer>
            <FileInput type="file" ref={fileRef} onChange={onSelect} />
            <ChooseButton onClick={openFile}>Pick your image</ChooseButton>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </DetectorContainer>
    );
}
