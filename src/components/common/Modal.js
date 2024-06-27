import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PiXCircle, PiVideoLight } from "react-icons/pi";
import useEditor from "../../hooks/useEditor";

export default function Modal({ isOpen, onClose }) {
  const { editor, name } = useEditor();  
  const downloadRef = useRef(null);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const jsonData = editor.canvas.toJSON(['backgroundImage', 'width', 'height']);
    const jsonContent = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  

  return createPortal(
    <div className="fixed z-[10] top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] overflow-auto">
      <div className="modal-container bg-main rounded border border-[hsla(0,0%,100%,.12)] text-second mx-auto my-[10%] p-[10px] py-5 w-[350px] relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl ">Export as...</h2>
          <PiXCircle
            className="a cursor-pointer w-[1.5em] h-[1.5em] hover:text-white hover:scale-110 transition-all"
            onClick={onClose}
          />
        </div>
        <div className="grid grid-cols-12 gap-3 text-sm mt-4 ">
          <div
          onClick={handleExportJson}
           className="col-span-6 w-full h-full group">
            <div className="p-4 group-hover:text-white transition-all border  hover:bg-[hsla(0,0%,100%,.12)] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
            <a
              ref={downloadRef}
              style={{ display: "none" }}
              download={`${name}.json`}
            />
              JSON
            </div>
          </div>
          <div className="col-span-6 w-full h-full group">
            <div className="p-4 group-hover:text-white h-full transition-all border  hover:bg-[hsla(0,0%,100%,.12)] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
              BluePlate
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-lg">OR</div>
        <div className="flex items-center justify-center gap-3 text-sm w-full">
          <div className="w-full h-full group">
            <div className="p-4 group-hover:text-white h-full text-sm transition-all border  hover:bg-[hsla(0,0%,100%,.12)] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center gap-2  rounded">
             <PiVideoLight className="w-[1.5em] h-[1.5em]"/>
              Create Video
            </div>
          </div>
        </div>
      </div>
      
    </div>,
    document.getElementById("modal")
  );
}
