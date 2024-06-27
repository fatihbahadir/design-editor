import React, { useEffect, useState, useRef } from "react";
import {
  PiTrashLight,
  PiCopyLight,
  PiCircleHalfFill,
  PiAlignCenterVerticalLight,
  PiAlignRightLight,
  PiAlignTopSimpleLight,
  PiAlignLeftLight,
  PiAlignLeftSimpleLight,
  PiAlignCenterHorizontalSimpleLight,
  PiAlignRightSimpleLight,
  PiAlignBottomSimpleLight,
  PiStackLight,
  PiSelectionBackgroundLight,
  PiSelectionForegroundLight,
  PiDownloadSimpleLight,
  PiUploadSimpleLight,
  PiFloppyDiskLight,
} from "react-icons/pi";
import useEditor from "../../hooks/useEditor";
import TopLeftMenu from "./topLeftMenu/TopLeftMenu";
import Modal from "../common/Modal";

const TopMenu = () => {
  const {
    editor,
    isEditorSelected,
    setIsEditorSelected,
    name,
    setName,
    setSize,
    activeElement
  } = useEditor();
  const [opacity, setOpacity] = useState(activeElement ? parseInt(activeElement.opacity * 100) : 0);
  const [isOpacityDropdownOpen, setIsOpacityDropdownOpen] = useState();
  const [isAlignDropdownOpen, setIsAlignDropdownOpen] = useState();
  const [isBringDropdownOpen, setIsBringDropdownOpen] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const opacityDropdownRef = useRef(null);
  const alignDropdownRef = useRef(null);
  const bringDropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const deleteSelected = () => {
    const activeObjects = returnActiveObjects();
    if (editor && editor.canvas) {
      activeObjects.forEach((obj) => {
        editor.canvas.remove(obj);
      });
      editor.canvas.discardActiveObject().renderAll();
    }
  };

  useEffect(()=>{
    setOpacity(activeElement ? parseInt(activeElement.opacity * 100) : 0)
  }, [activeElement])

  const duplicateSelected = () => {
    const activeObjects = returnActiveObjects();
    if (editor && editor.canvas && activeObjects.length > 0) {
      activeObjects.forEach(function(object) {
        object.clone(function(clone) {
          editor?.canvas.add(
            clone.set({
              left: object.left + 10,
              top: object.top + 10,
            })
          );
        });
      });
      editor.canvas.renderAll();
    }
  };
  const changeOpacity = (event) => {
    const newOpacity = parseFloat(event.target.value) / 100;
    setOpacity(event.target.value);
    const activeObjects = returnActiveObjects();
    if (editor && editor.canvas && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        obj.set("opacity", newOpacity);
      });
      editor.canvas.renderAll();
    }
  };

  const alignObjects = (alignment) => {
    const activeObjects = returnActiveObjects();
    if (editor && editor.canvas && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        switch (alignment) {
          case "left-top":
            obj.set({
              left: 0,
              top: 0,
            });
            break;
          case "center-top":
            obj.set({
              top: 0,
              left: (editor.canvas.width - obj.width) / 2,
            });
            break;
          case "right-top":
            obj.set({
              left: editor.canvas.width - obj.width,
              top: 0,
            });
            break;
          case "left-center":
            obj.set({
              top: (editor.canvas.height - obj.height) / 2,
              left: 0,
            });
            break;
          case "center-center":
            obj.set({
              top: (editor.canvas.height - obj.height) / 2,
              left: (editor.canvas.width - obj.width) / 2,
            });
            break;
          case "right-center":
            obj.set({
              top: (editor.canvas.height - obj.height) / 2,
              left: editor.canvas.width - obj.width,
            });
            break;

          case "left-bottom":
            obj.set({
              top: editor.canvas.height - obj.height,
              left: 0,
            });
            break;

          case "center-bottom":
            obj.set({
              top: editor.canvas.height - obj.height,
              left: (editor.canvas.width - obj.width) / 2,
            });
            break;

          case "right-bottom":
            obj.set({
              top: editor.canvas.height - obj.height,
              left: editor.canvas.width - obj.width,
            });
            break;

          default:
            break;
        }
      });
      editor.canvas.renderAll();
    }
  };

  const sendToBack = () => {
    const activeObjects = returnActiveObjects();
    if (editor && editor.canvas && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        editor.canvas.sendToBack(obj);
      });
      editor.canvas.renderAll();
    }
  };

  const bringToFront = () => {
    const activeObjects = returnActiveObjects();
    if (editor && editor.canvas && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        editor.canvas.bringToFront(obj);
      });
      editor.canvas.renderAll();
    }
  };

  const returnActiveObjects = () => {
    if (editor && editor.canvas) {
      const activeObjects = editor.canvas.getActiveObjects();
      return activeObjects || [];
    }
    return [];
  };

  const closeOpacityDropdown = (event) => {
    if (
      opacityDropdownRef.current &&
      !opacityDropdownRef.current.contains(event.target)
    ) {
      setIsOpacityDropdownOpen(false);
    }
  };

  const closeAlignDropdown = (event) => {
    if (
      alignDropdownRef.current &&
      !alignDropdownRef.current.contains(event.target)
    ) {
      setIsAlignDropdownOpen(false);
    }
  };

  const closeBringDropdown = (event) => {
    if (
      bringDropdownRef.current &&
      !bringDropdownRef.current.contains(event.target)
    ) {
      setIsBringDropdownOpen(false);
    }
  };

  const discardEditor = () => {
    setIsEditorSelected(false);
    editor.canvas.discardActiveObject();
    editor.canvas.requestRenderAll();
  };

  const handleImportJsonFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            const fileName = file.name.slice(0,-5)
            setName(fileName)
            editor.canvas.loadFromJSON(jsonData);
            setSize({
              width: jsonData.width,
              height: jsonData.height
            })
          } catch (error) {
            console.error("Invalid JSON file:", error);
          }
        };
        reader.readAsText(file);
      } else {
        console.error("Invalid file type. Please select a JSON file.");
      }
    }
  };
  

  useEffect(() => {
    document.addEventListener("mousedown", closeOpacityDropdown);
    return () => {
      document.removeEventListener("mousedown", closeOpacityDropdown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeAlignDropdown);
    return () => {
      document.removeEventListener("mousedown", closeAlignDropdown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeBringDropdown);
    return () => {
      document.removeEventListener("mousedown", closeBringDropdown);
    };
  }, []);

  return (
    <div className="w-full h-[88px] py-5 flex items-center justify-between bg-main border-[hsla(0,0%,100%,.12)] border-b transition-all duration-300 px-5">
      {isEditorSelected ? (
        <>
          <div>
            <TopLeftMenu />
          </div>
          <div>
            <div className="flex justify-center items-center gap-6">
              <div className="relative inline-block text-left">
                <PiStackLight
                  onClick={() => setIsBringDropdownOpen(!isBringDropdownOpen)}
                  className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer transition-all hover:scale-105 hover:text-white"
                />
                <div
                  className={`${
                    isBringDropdownOpen ? "visible" : "invisible"
                  } opacity-dropdown flex flex-col gap-3 z-[5] items-center py-5 px-4 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  ref={bringDropdownRef}
                >
                  <div className="flex items-start justify-center flex-col gap-3 w-full text-second">
                    <div
                      onClick={() => {
                        bringToFront();
                        setIsBringDropdownOpen(false);
                        discardEditor();
                      }}
                      className="flex gap-2 items-center cursor-pointer group hover:text-white"
                    >
                      <PiSelectionBackgroundLight className="text-second w-[1.5rem] h-[1.5rem] group-hover:text-white" />
                      <p className="text-sm">Bring to front</p>
                    </div>
                    <div
                      onClick={() => {
                        sendToBack();
                        setIsBringDropdownOpen(false);
                        discardEditor();
                      }}
                      className="flex gap-2 items-center cursor-pointer group hover:text-white"
                    >
                      <PiSelectionForegroundLight className="text-second w-[1.5rem] h-[1.5rem] group-hover:text-white" />
                      <p className="text-sm">Send to back</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative inline-block text-left">
                <PiAlignCenterVerticalLight
                  onClick={() => setIsAlignDropdownOpen(!isAlignDropdownOpen)}
                  className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer transition-all hover:scale-105 hover:text-white"
                />
                <div
                  className={`${
                    isAlignDropdownOpen ? "visible" : "invisible"
                  }  opacity-dropdown flex flex-col z-[5] gap-3 items-center py-5 px-4 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  ref={alignDropdownRef}
                >
                  <div className="w-full grid grid-cols-6 gap-3">
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignRightLight
                        onClick={() => {
                          alignObjects("left-top");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second -rotate-[180deg] cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignTopSimpleLight
                        onClick={() => {
                          alignObjects("center-top");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignLeftLight
                        onClick={() => {
                          alignObjects("right-top");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second -rotate-[180deg] cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignLeftSimpleLight
                        onClick={() => {
                          alignObjects("left-center");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignCenterHorizontalSimpleLight
                        onClick={() => {
                          alignObjects("center-center");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignRightSimpleLight
                        onClick={() => {
                          alignObjects("right-center");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignLeftLight
                        onClick={() => {
                          alignObjects("left-bottom");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignBottomSimpleLight
                        onClick={() => {
                          alignObjects("center-bottom");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second cursor-pointer hover:text-white "
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <PiAlignRightLight
                        onClick={() => {
                          alignObjects("right-bottom");
                        }}
                        className="w-[1.5em] h-[1.5em] text-second  cursor-pointer hover:text-white "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative inline-block text-left">
                <PiCircleHalfFill
                  onClick={() =>
                    setIsOpacityDropdownOpen(!isOpacityDropdownOpen)
                  }
                  className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer transition-all hover:scale-105 hover:text-white"
                />
                <div
                  className={`${
                    isOpacityDropdownOpen ? "visible" : "invisible"
                  } opacity-dropdown flex flex-col z-[5] gap-3 items-center py-5 px-4 origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-main border border-[hsla(0,0%,100%,.12)]  ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  ref={opacityDropdownRef}
                >
                  <div className="flex items-center justify-between w-full text-second">
                    <h2 className="font-[400]">Opacity</h2>
                    <span className="font-semibold">{opacity}</span>
                  </div>
                  <div
                    className={`py-1`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="opacity-menu"
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={changeOpacity}
                      className="appearance-none w-full h-2 rounded-lg bg-second border border-[hsla(0,0%,100%,.12)] cursor-pointer shadow-inner outline-none"
                    />
                  </div>
                </div>
              </div>
              <PiCopyLight
                onClick={duplicateSelected}
                className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer transition-all hover:scale-105 hover:text-white"
              />
              <PiTrashLight
                onClick={deleteSelected}
                className="text-second w-[1.5rem] h-[1.5rem] cursor-pointer transition-all hover:scale-105 hover:text-white"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-between">
          <div></div>
          <div className="text-second flex items-center justify-center gap-2">
            <input
              className="bg-transparent focus:outline-none w-40 "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-6 items-center justify-center text-second">
            <PiUploadSimpleLight
              onClick={() => {
                fileInputRef.current.click();
              }}
              className="w-[1.5em] h-[1.5em] transition-all hover:text-white hover:scale-105 cursor-pointer"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportJsonFile}
            />
            <PiDownloadSimpleLight
              onClick={() => {
                setIsOpen(true);
              }}
              className="w-[1.5em] h-[1.5em] transition-all hover:text-white hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}></Modal>
    </div>
  );
};

export default TopMenu;
