import React, { useEffect, useState } from "react";
import FlipElement from "./FlipElement";
import useEditor from "../../../hooks/useEditor";

const ShapeMenu = () => {
  const { activeElement } = useEditor();
  const [color, setColor] = useState();


  useEffect(() => {
    if (activeElement) {
      setColor(activeElement.fill || "#000000");
    }
  }, [activeElement]);


  const handleColorChange = (e) => {
    setColor(e.target.value);
    if (activeElement) {
      activeElement.set({ fill: e.target.value });
      activeElement.canvas.requestRenderAll();
    }
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <div style={{
        'backgroundColor' : color
      }} className={`w-[1.5em] h-[1.5em] relative rounded cursor-pointer hover:scale-105 transition-all`}>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
      />
      </div>

      <FlipElement />
    </div>
  );
};

export default ShapeMenu;
