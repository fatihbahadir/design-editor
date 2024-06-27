import React, { useContext, useState, useEffect, useRef } from "react";
import useEditor from "../../../hooks/useEditor";
import {
  PiTriangleFill,
  PiTextBBold,
  PiTextItalicLight,
  PiTextAaLight,
  PiTextUnderlineLight,
  PiTextAlignCenterLight,
  PiTextAlignJustifyLight,
  PiTextAlignLeftLight,
  PiTextAlignRightLight,
  PiSplitVerticalLight,
  PiTextTLight,
} from "react-icons/pi";
import { MdFormatColorText, MdFormatLineSpacing } from "react-icons/md";
import { act } from "react-dom/test-utils";

const TextMenu = () => {
  const { activeElement, editor } = useEditor();
  const [fontFamily, setFontFamily] = useState(
    activeElement ? activeElement.fontFamily : ""
  );
  const [fontSize, setFontSize] = useState(
    activeElement && activeElement.fontSize
  );
  const [strokeWidth, setStrokeWidth] = useState(
    activeElement && activeElement.strokeWidth
  );
  const [strokeColor, setStrokeColor] = useState(
    activeElement && activeElement.stroke
  )
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);
  const [spaceDropdown, setSpaceDropdown] = useState(false);
  const [strokeDropdown, setStrokeDropdown] = useState(false);

  const [lineHeight, setLineHeight] = useState(
    activeElement && activeElement.lineHeight
  );
  const [charSpacing, setCharSpacing] = useState(
    activeElement && activeElement.charSpacing
  );

  const [isBold, setIsBold] = useState(
    activeElement && activeElement.fontWeight === "bold"
  );
  const [isItalic, setIsItalic] = useState(
    activeElement && activeElement.fontStyle === "italic"
  );
  const [isUnderline, setIsUnderline] = useState(
    activeElement && activeElement.textDecoration === "underline"
  );
  const [color, setColor] = useState();

  const sizeDropdownRef = useRef(null);
  const showAlignDropdownRef = useRef(null);
  const spaceDropdownRef = useRef(null);
  const strokeDropdownRef = useRef(null);

  useEffect(() => {
    if (activeElement) {
      setColor(activeElement.fill || "#000000");
    }
  }, [activeElement]);

  const handleFontFamilyChange = (e) => {
    const selectedFontFamily = e.target.value;
    setFontFamily(selectedFontFamily);
    if (activeElement) {
      activeElement.set("fontFamily", selectedFontFamily);
      activeElement.canvas.requestRenderAll();
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    if (activeElement) {
      activeElement.set({ fill: e.target.value });
      activeElement.canvas.requestRenderAll();
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set({ fontSize: newSize });
      editor.canvas.requestRenderAll();
    }
  };

  const handleStrokeWidthChange = (e) => {
    const newStrokeWidth = parseInt(e.target.value);
    setStrokeWidth(newStrokeWidth);
    if (activeElement && activeElement.type === "textbox") {
      activeElement.set({
        strokeWidth: newStrokeWidth,
      });
      editor.canvas.requestRenderAll();
    }
  };

  const handleBold = () => {
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const isBold = activeObject.get("fontWeight") === "bold";
      if (!isBold) {
        setIsBold(true);
      } else {
        setIsBold(false);
      }
      activeObject.set("fontWeight", isBold ? "normal" : "bold");
      editor.canvas.requestRenderAll();
    }
  };

  const handleItalic = () => {
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const isItalic = activeObject.get("fontStyle") === "italic";
      if (!isItalic) {
        setIsItalic(true);
      } else {
        setIsItalic(false);
      }
      activeObject.set("fontStyle", isItalic ? "normal" : "italic");
      editor.canvas.requestRenderAll();
    }
  };

  const handleUnderline = () => {
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const styles = activeObject.getSelectionStyles();
      const isUnderline = styles.some((style) => style.underline === true);
      activeObject.setSelectionStyles({ underline: !isUnderline });
      editor.canvas.requestRenderAll();
    }
  };

  const handleLetterCase = () => {
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const text = activeObject.text;
      const lowerCaseCount = (text.match(/[a-z]/g) || []).length;
      const upperCaseCount = (text.match(/[A-Z]/g) || []).length;

      let newText;
      if (lowerCaseCount > upperCaseCount) {
        newText = text.toUpperCase();
      } else {
        newText = text.toLowerCase();
      }

      activeObject.set("text", newText);
      editor.canvas.requestRenderAll();
    }
  };

  const handleTextAlign = (textAlign) => {
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("textAlign", textAlign);
      editor.canvas.requestRenderAll();
    }
  };

  const changeLineHeight = (event) => {
    const newLineHeight = (parseInt(event.target.value) / 100) * 6 + 1;
    setLineHeight(event.target.value);
    if (activeElement && activeElement.type === "textbox") {
      activeElement.set("lineHeight", newLineHeight);
      editor.canvas.requestRenderAll();
    }
  };

  const changeCharSpacing = (event) => {
    const newCharSpacing = parseInt(event.target.value) * 10;
    setCharSpacing(event.target.value);
    if (activeElement && activeElement.type === "textbox") {
      activeElement.set("charSpacing", newCharSpacing);
      editor.canvas.requestRenderAll();
    }
  };

  const handleStrokeColorChange = (e) => {
    setStrokeColor(e.target.value);
    if (activeElement) {
      activeElement.set({ stroke: e.target.value });
      activeElement.canvas.requestRenderAll();
    }
  };


  const closeSizeDropdown = (event) => {
    if (
      sizeDropdownRef.current &&
      !sizeDropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  const closeAlignDropdown = (event) => {
    if (
      showAlignDropdownRef.current &&
      !showAlignDropdownRef.current.contains(event.target)
    ) {
      setShowAlignDropdown(false);
    }
  };

  const closeSpaceDropdown = (event) => {
    if (
      spaceDropdownRef.current &&
      !spaceDropdownRef.current.contains(event.target)
    ) {
      setSpaceDropdown(false);
    }
  };

  const closeStrokeDropdown = (event) => {
    if (
      strokeDropdownRef.current &&
      !strokeDropdownRef.current.contains(event.target)
    ) {
      setStrokeDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSizeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeSizeDropdown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeAlignDropdown);
    return () => {
      document.removeEventListener("mousedown", closeAlignDropdown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeSpaceDropdown);
    return () => {
      document.removeEventListener("mousedown", closeSpaceDropdown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeStrokeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeStrokeDropdown);
    };
  }, []);

  useEffect(() => {
    setFontFamily(activeElement ? activeElement.fontFamily : "");
    setFontSize(activeElement ? activeElement.fontSize : 16);
    setIsBold(activeElement && activeElement.fontWeight === "bold");
    setIsItalic(activeElement && activeElement.fontStyle === "italic");
    setLineHeight(
      activeElement && parseInt(((activeElement.lineHeight - 1) / 6) * 100)
    );
    setCharSpacing(activeElement && activeElement.charSpacing / 10);
    setStrokeWidth(activeElement && activeElement.strokeWidth);
    setStrokeColor(activeElement && activeElement.stroke || "#000000")
  }, [activeElement]);

  return (
    <div className="flex gap-3 items-center justify-center">
      <select
        className="bg-transparent cursor-pointer border-[hsla(0,0%,100%,.12)] border text-second py-1 text-sm px-3 rounded focus:outline-none focus:border-second transition-all"
        value={fontFamily}
        onChange={handleFontFamilyChange}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
      <div className="relative inline-block text-left">
        <div className="flex items-center justify-center cursor-pointer">
          <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            min={1}
            step={1}
            className="bg-transparent w-20 border-[hsla(0,0%,100%,.12)] border text-second py-1 text-sm px-3 rounded focus:outline-none focus:border-second transition-all"
          />
          <PiTriangleFill
            className="absolute right-[.6em] w-[.6em] h-[.6em] rotate-180 "
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          />
        </div>
        <div
          ref={sizeDropdownRef}
          className={`${
            showDropdown ? "visible" : "invisible"
          } opacity-dropdown flex flex-col gap-3 z-[5] items-center py-1 origin-top-right absolute right-0 mt-2 w-20 h-60 overflow-y-scroll rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <ul className="w-full flex items-center flex-col justify-center text-sm cursor-pointer text-left">
            {[
              8,
              10,
              12,
              16,
              20,
              24,
              30,
              36,
              48,
              60,
              72,
              96,
              120,
              144,
              192,
              240,
            ].map((size, index) => (
              <li
                key={index}
                onClick={() => {
                  handleFontSizeChange({ target: { value: size } });
                  setShowDropdown(false);
                }}
                className="py-1 w-full pl-3 hover:bg-[#0F1016]"
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-[22px] w-[.05em] bg-second rounded"></div>

      <div className="relative">
        <MdFormatColorText
          style={{
            color: color,
          }}
          className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer "
        />
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
        />
      </div>

      <PiTextBBold
        className={`text-${
          isBold ? "white" : "second"
        } w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-white`}
        onClick={handleBold}
      />
      <PiTextItalicLight
        className={`text-${
          isItalic ? "white" : "second"
        } w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-white`}
        onClick={handleItalic}
      />

      <PiTextUnderlineLight
        className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-white"
        onClick={handleUnderline}
      />

      <PiTextAaLight
        className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-white"
        onClick={handleLetterCase}
      />

      <div className="h-[22px] w-[.05em] bg-second rounded"></div>

      <div className="relative">
        <PiTextAlignCenterLight
          onClick={() => setShowAlignDropdown(!showAlignDropdown)}
          className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer hover:text-white"
        />
        <div
          className={`${
            showAlignDropdown ? "visible" : "invisible"
          } opacity-dropdown flex items-center justify-center  gap-6  z-[5]  py-2 px-4 origin-top-center absolute  mt-2 rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
          ref={showAlignDropdownRef}
        >
          <div className="flex items-center justify-center">
            <PiTextAlignLeftLight
              onClick={() => handleTextAlign("left")}
              className="w-[1.5em] h-[1.5em] text-second hover:text-white cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-center">
            <PiTextAlignCenterLight
              onClick={() => handleTextAlign("center")}
              className="w-[1.5em] h-[1.5em] text-second hover:text-white cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center">
            <PiTextAlignRightLight
              onClick={() => handleTextAlign("right")}
              className="w-[1.5em] h-[1.5em] text-second hover:text-white cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center">
            <PiTextAlignJustifyLight
              onClick={() => handleTextAlign("justify")}
              className="w-[1.5em] h-[1.5em] text-second hover:text-white cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <PiSplitVerticalLight
          onClick={() => setSpaceDropdown(!spaceDropdown)}
          className="w-[1.5em] h-[1.5em] text-second hover:text-white cursor-pointer"
        />
        <div
          className={`${
            spaceDropdown ? "visible" : "invisible"
          } opacity-dropdown flex text-sm flex-col w-48 items-center justify-center  gap-5  z-[5]  py-2 origin-top-center absolute  mt-2 rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
          ref={spaceDropdownRef}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full text-second">
              <h2 className="font-[400]">Line Height</h2>
              <span className="font-semibold">{lineHeight}</span>
            </div>

            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={lineHeight}
                onChange={changeLineHeight}
                className="appearance-none w-full h-2 rounded-lg bg-second border border-[hsla(0,0%,100%,.12)] cursor-pointer shadow-inner outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between w-full text-second">
              <h2 className="font-[400]">Char Spacing</h2>
              <span className="font-semibold">{charSpacing}</span>
            </div>

            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={charSpacing}
                onChange={changeCharSpacing}
                className="appearance-none w-full h-2 rounded-lg bg-second border border-[hsla(0,0%,100%,.12)] cursor-pointer shadow-inner outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <PiTextTLight
          onClick={() => setStrokeDropdown(!strokeDropdown)}
          className="w-[1.5em] h-[1.5em] text-second hover:text-white cursor-pointer"
        />
        <div
          className={`${
            strokeDropdown ? "visible" : "invisible"
          } opacity-dropdown flex text-sm flex-col items-center justify-center w-48 px-4  gap-5  z-[5]  py-2 origin-top-center absolute  mt-2 rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
          ref={strokeDropdownRef}
        >
          <div className="flex items-center justify-between w-full text-second">
            <h2 className="font-[400]">Stroke Width</h2>
            <input
              type="number"
              min={0}
              max={30}
              className="py-1 pl-3 m bg-transparent rounded border border-[hsla(0,0%,100%,.12)] w-8 focus:outline-none focus:border-second"
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
            />
          </div>
          <div className="flex items-center justify-between w-full text-second">
            <h2 className="font-[400]">Stroke Color</h2>
            <div
              style={{
                backgroundColor: strokeColor,
              }}
              className="w-[1.5em] h-[1.5em] relative rounded cursor-pointer hover:scale-105 transition-all"
            >
              <input
                type="color"
                value={strokeColor}
                onChange={handleStrokeColorChange}
                className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[22px] w-[.05em] bg-second rounded"></div>
    </div>
  );
};

export default TextMenu;
