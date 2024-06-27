import {
  COLOR_ITEMS,
  SIZE_ITEMS,
  colorItems,
} from "../../../consts/size-options";
import {
  PiPlusBold,
  PiPlusCircleDuotone,
  PiPlusCircleFill,
  PiPlusFill,
  PiPlusThin,
  PiRectangleDuotone,
} from "react-icons/pi";
import useEditor from "../../../hooks/useEditor";
import { useRef, useState } from "react";

const Size = () => {
  const { size, setSize, editor } = useEditor();
  const [color, setColor] = useState("#ffffff");
  const colorInputRef = useRef(null);

  const handleColorDivClick = () => {
    colorInputRef.current.click();
  };

  const handleChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    if (editor) {
        changeColor(newColor)
    }
  };

  const changeColor = (color) => {
    editor.canvas.setBackgroundColor(
      color,
      editor.canvas.renderAll.bind(editor.canvas)
    );
  }

  return (
    <div className="mt-4 text-second">
      <div className="grid grid-cols-12">
        <div className="col-span-12 border py-2 px-3 mb-2  hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] rounded">
          <h2 className="text-sm font-semibold">Background Color</h2>
          <div className="mt-2">
            <div className="grid grid-cols-10 gap-2">
              <div
                className="col-span-2 w-7 h-7 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 relative bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded"
                onClick={handleColorDivClick}
              >
                <input
                  ref={colorInputRef}
                  type="color"
                  value={color}
                  onChange={handleChange}
                  className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
                />
                <div>
                  <PiPlusFill className="w-[1.5em] h-[1.5em] text-second" />
                </div>
              </div>
              {COLOR_ITEMS.map((color) => (
                <div
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={()=>changeColor(color)}
                  className={`bg-[${color}] col-span-2 rounded w-7 h-7 cursor-pointer hover:scale-105 transition-all duration-300`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {SIZE_ITEMS.map((item, index) => {
          const width = `${item.size.width / 35}`;
          const height = `${item.size.height / 35}`;
          return (
            <div
              className={`col-span-6 py-2 w-full ${
                index % 2 === 0 ? "pr-1" : "pl-1"
              }`}
            >
              <div
                onClick={() => {
                  setSize({
                    width: width * 9,
                    height: height * 9,
                  });
                }}
                className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded"
              >
                <div className="h-[50px] flex items-center justify-center">
                  <div
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                    className="bg-second rounded border-2 border-[#A3A9AD]"
                  />
                </div>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Size;
