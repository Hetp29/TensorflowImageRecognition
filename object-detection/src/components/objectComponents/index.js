import React from "react";
import styled from "styled-components";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as Ssd from "@tensorflow-models/coco-ssd";

const detectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const imageContainer = styled.div `
    min-width: 200px;
    height: 500px;
    border: 3px solid #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; 
`;

const mainImage = styled.img`
    height: 100%;
`;

const fileInput = styled.input`
    display: none;
`;

const chooseButton = styled.button`
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
        color: WHITE;
    }
`;
export function objectComponent(props) {
    return (
    <detectorContainer>
        <imageContainer>Img</imageContainer>
        <chooseButton>Pick your image</chooseButton>
    </detectorContainer>
    );
}