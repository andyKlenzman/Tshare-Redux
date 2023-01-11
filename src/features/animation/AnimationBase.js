import React from "react";
import styles from "../animation/canvas.module.css";
import { useRef, useEffect } from "react";
import { BlobMovement } from "./objects/BlobMovement";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAnimation } from "./data/animationSlice";

const AnimationBase = () => {
  const canvasRef = useRef(null);
  const blob = useSelector(selectAnimation)
  



  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
      };
      const blobObj = {
        width: canvas.width,
        height: canvas.height,
        maxColor: blob.maxColor,
        minColor: blob.minColor,
        rad: blob.rad,
        speedXMult: 1,
        speedX: 0,
        bgColor: blob.bgColor,
        bgSat: blob.bgSat,
        bgLight: blob.bgLight,

      };
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `hsl(${blobObj.bgColor}, ${blobObj.bgSat}, ${blobObj.bgLight})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      BlobMovement(ctx, blobObj);
      requestAnimationFrame(render);
    };
    render();
  
  }, []);
  return <canvas ref={canvasRef} className ="fixed block overflow-hidden"></canvas>;
  
};

export default AnimationBase;
