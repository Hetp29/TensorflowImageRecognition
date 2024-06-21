import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const DetectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.5s ease-in-out;
`;

const ImageContainer = styled.div`
    width: 80%;
    max-width: 600px;
    height: 500px;
    border: 3px solid #3b3b3b;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #ffffff;
`;

const MainImage = styled.img`
    height: 100%;
    border-radius: 10px;
`;

const FileInput = styled.input`
    display: none;
`;

const ChooseButton = styled.button`
    padding: 10px 20px;
    border: 2px solid #3b3b3b;
    background-color: #3b3b3b;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    border-radius: 30px;
    outline: none;
    margin-top: 20px;
    cursor: pointer;
    transition: all 260ms ease-in-out;
    &:hover {
        background-color: #ffffff;
        color: #3b3b3b;
    }
`;

const Target = styled.div`
    position: absolute;
    left: ${({ x }) => x + "px"};
    top: ${({ y }) => y + "px"};
    width: ${({ width }) => width + "px"};
    height: ${({ height }) => height + "px"};
    border: 4px solid #ff6347;
    background-color: transparent;
    z-index: 20;
    &::before {
        content: "${({ classType, score }) => `${classType} ${score.toFixed(2)}`}";
        color: #ff6347;
        font-weight: 600;
        font-size: 14px;
        position: absolute;
        top: -1.5em;
        left: -5px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 2px 5px;
        border-radius: 5px;
    }
`;

const LoadingSpinner = styled.div`
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3b3b3b;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
            const predictions = await model.detect(element);
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
                {loading && <LoadingSpinner />}
            </ImageContainer>
            <FileInput type="file" ref={fileRef} onChange={onSelect} />
            <ChooseButton onClick={openFile}>Pick your image</ChooseButton>
            {error && <p>{error}</p>}
        </DetectorContainer>
    );
}
