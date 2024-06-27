import React from "react";
import useEditor from "../../../hooks/useEditor";
import { fabric } from "fabric";
import SerhatImage from "../../../assets/uploads/serhat.png"
const Image = () => {
  const { editor } = useEditor();

  const addImage = (imagePath) => {
    if (!editor) return;

    fabric.Image.fromURL(imagePath, (img) => {
      img.set({
        left: 100, // X koordinatı
        top: 100, // Y koordinatı
        scaleX: 0.5, // X ekseninde ölçek
        scaleY: 0.5, // Y ekseninde ölçek
        angle: 0, // Döndürme açısı
      });

      editor.canvas.add(img); // Resmi canvas'a ekle
    });
  };

  return (
    <div className="text-second mt-4">
      <div className="grid grid-cols-12 gap-3">

        <div
          onClick={() => {
            addImage("https://webinen.com/static/media/serhat.afb03284b9b03fbe6e18.jpeg");
          }}
          className="col-span-6 py-2 w-full"
        >
          <div className="transition-all border mr-2 hover:scale-105 border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
            <img src={SerhatImage} className= "w-full h-full "/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
