import React, { useContext, useRef } from "react";
import { fabric } from "fabric";
import useEditor from "../../../hooks/useEditor";

const Video = () => {
  const { editor } = useEditor();
  const videoRef = useRef(null);


  const addVideo = (videoUrl) => {

    const getVideoElement = (videoUrl) => {
      const videoE = document.createElement('video');
      videoE.width = editor.canvas.width;
      videoE.height = editor.canvas.height;
      videoE.muted = true;
      videoE.loop = true;
      videoE.autoplay = true
      videoE.crossOrigin = "anonymous";
      const source = document.createElement('source');
      source.src = videoUrl;
      source.type = 'video/mp4';
      videoE.appendChild(source);
      return videoE;
    }

    const videoElement = getVideoElement(videoUrl);
    const fabricVideo = new fabric.Image(videoElement, {left: 0,   top: 0});
    editor.canvas.add(fabricVideo);

    fabricVideo.getElement().play();

    fabric.util.requestAnimFrame(function render() {
      editor.canvas.renderAll();
      fabric.util.requestAnimFrame(render);
   });
  }

  // const addVideoToCanvas = (videoUrl) => {
  //   if (!editor) return; 

  //   const videoElement = document.createElement('video');
  //   videoElement.src = videoUrl;
  //   videoElement.crossOrigin = 'anonymous';
  //   videoElement.autoplay = true
  //   videoElement.loop = true
  //   videoElement.muted = true;

  //   videoElement.addEventListener('loadeddata', () => {
  //     const canvasWidth = editor.canvas.width; 
  //     const canvasHeight = editor.canvas.height; 

  //     videoElement.width = canvasWidth;
  //     videoElement.height = canvasHeight;

  //     const fabricVideo = new fabric.Image(videoElement, {
  //       left: 0,
  //       top: 0,
  //       width: canvasWidth,
  //       height: canvasHeight,
  //       selectable: false,
  //     });

  //     editor.canvas.add(fabricVideo);
  //   });

    

  // };

  return (
    <div className="text-second mt-4">
      <div className="grid grid-cols-12 gap-3">
        <div onClick={()=>addVideo('https://static.videezy.com/system/resources/previews/000/035/086/original/P1170066_9_5.mp4')} className="col-span-6 py-2 w-full">
          <div className="transition-all border mr-2 hover:scale-105 border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
            Video1
          </div>
        </div>
        <div onClick={()=>addVideo('https://static.videezy.com/system/resources/previews/000/038/385/original/Black_Friday.mp4')} className="col-span-6 py-2 w-full">
          <div className="transition-all border mr-2 hover:scale-105 border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
            Video2
          </div>
        </div>
        <div onClick={()=>addVideo('https://videos.pexels.com/video-files/9844511/9844511-hd_1080_1920_30fps.mp4')} className="col-span-6 py-2 w-full">
          <div className="transition-all border mr-2 hover:scale-105 border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
            Video3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
