import React, { useEffect, useState, useContext } from "react";
import useLayers from "../../hooks/useLayers";

const LayerComponent = ({id, type, bgColor, themeColor, extendColor}) => {
  const [isResizing, setIsResizing] = useState();
  const {layers, updateLayer} = useLayers();
  const thisObj = layers[type]?.find(layer => layer.id === id)
  

  const handleDragStart = (e) => {
    if (!isResizing) {
      e.dataTransfer.setData("text/plain", "text");
    } 
  };

  const handleDragOver = (e) => {
    if (!isResizing) {
      e.preventDefault();
    }
  };

  const handleResizeStart = (e) => {
    setIsResizing(true);
  };

  const handleResizeEnd = (e) => {
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const parentElement = e.currentTarget; 
      const cellWidth = parentElement.offsetWidth / 100;
      const dragOffset = e.clientX - parentElement.getBoundingClientRect().left;
      let newColEnd = Math.floor((dragOffset - cellWidth / 2) / cellWidth) + 1;
      if (newColEnd > 100) {
        newColEnd = 100;
      }
      if (newColEnd < thisObj?.start + 1) {
        newColEnd =  thisObj?.start + 1;
      }
      updateLayer(type, id ,'end', newColEnd);
    }
  };

  const handleDrag = (e) => {
    if (!isResizing) {
      e.preventDefault();
      const parentElement = e.currentTarget;
      const cellWidth = parentElement.offsetWidth / 100;
      const dragOffset = e.clientX - parentElement.getBoundingClientRect().left;
      const colStartIndex =
        Math.floor((dragOffset - cellWidth / 2) / cellWidth) + 1;
      const newColStart = Math.max(
        1,
        Math.min(100 - ( thisObj?.end -  thisObj?.start), colStartIndex)
      );
      const newColEnd = newColStart + ( thisObj?.end -  thisObj?.start);
      updateLayer(type, id, 'start', newColStart);
      updateLayer(type, id ,'end', newColEnd);
    }
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrag={e => handleDrag(e)}
        className={`w-full h-[30px] py-1  grid grid-cols-100`}
        onMouseMove={e => handleMouseMove(e)}
      >
        <div
          draggable
          onDragStart={handleDragStart}
          className={`text-component bg-[#FEFE05]  text-[#FEFE05] z-[2] relative flex items-center justify-center rounded text-xs`}
          style={{
            gridColumnStart: thisObj?.start,
            gridColumnEnd: thisObj?.end + 1,
          }}
        >
          <div
            className={`absolute -right-1 bottom-0 w-2 h-full bg-[#FB9B07] rounded-r text-white cursor-col-resize`}
            onClick={()=>{
              if(isResizing) {
                handleResizeEnd()
              }
              else {
                handleResizeStart()
              }
            }}
          />
          .
        </div>
      </div>
    </>
  );
};

export default LayerComponent;
