import React from "react";
import {
  PiArrowsInLineHorizontalThin,
  PiArrowsInLineVerticalLight,
} from "react-icons/pi";
import useEditor from "../../../hooks/useEditor";

const FlipElement = () => {
  const { activeElement } = useEditor();
  const handleHorizontalFlip = () => {
    if (activeElement) {
      activeElement.set({ flipX: !activeElement.flipX });
      activeElement.setCoords();
      activeElement.canvas.requestRenderAll();
    }
  };

  const handleVerticalFlip = () => {
    if (activeElement) {
      activeElement.set({ flipY: !activeElement.flipY });
      activeElement.setCoords();
      activeElement.canvas.requestRenderAll();
    }
  };
  return (
    <div className="flex gap-3 items-center justify-center">
      <PiArrowsInLineHorizontalThin
        onClick={handleHorizontalFlip}
        className="w-[1.5em] h-[1.5em] cursor-pointer hover:text-white transition-all"
      />
      <PiArrowsInLineVerticalLight
        onClick={handleVerticalFlip}
        className="w-[1.5em] h-[1.5em] cursor-pointer hover:text-white transition-all"
      />
    </div>
  );
};

export default FlipElement;
