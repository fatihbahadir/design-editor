import React, { useEffect, useState } from "react";
import { PiTriangleFill } from "react-icons/pi";
import { Transition } from "@headlessui/react";
import useInteractive from "../../hooks/useInteractive";
import useLayers from "../../hooks/useLayers";
import LayerComponent from "../drag-drop/LayerComponent";
import { v4 as uuid } from "uuid";
import { useFabricJSEditor } from "fabricjs-react";
import useEditor from "../../hooks/useEditor";
import { fabric } from "fabric";
import { MENU_ITEMS } from "../../consts/menu-items";

const InteractiveMenu = () => {
  const { menu, setMenu } = useInteractive();
  const { addLayer } = useLayers();
  const { editor , setSize} = useEditor();

  const ActiveMenu = MENU_ITEMS[menu];

  return (
    <div className="relative">
      <Transition
        show={menu === "" ? false : true}
        enter="transition-transform duration-300 ease-out -z-[1]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300 ease-in -z-[1]"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {(ref) => (
          <>
            <div
              ref={ref}
              className={`bg-[#1D1F29] w-[250px] h-screen px-5 py-2 border-r border-[hsla(0,0%,100%,.12)] transform `}
            >
              <div className="h-[64px] flex items-center">
                <h2 className="text-white font-[400]">{menu.charAt(0).toUpperCase() + menu.slice(1,)}</h2>
              </div>
              <div className="w-full flex items-center justify-center mb-2">
                <div className="w-[100%] h-[.8px] bg-second"></div>
              </div>
              {/* <button onClick={()=>{
                  const newUuid = uuid();
                  addLayer("text", {
                    id: newUuid,
                    component: (
                      <LayerComponent
                        id={newUuid}
                        type="text"
                        bgColor="#D2E3C8"
                        themeColor="#739072"
                        extendColor="#4F6F52"
                      />
                    ),
                    start: 1,
                    end: 3,
                  });
                  editor?.addText("Your sample text")
              }} className={`bg-second ${menu ? 'w-full' : 'w-0'} rounded text-white py-[.4rem] text-[14px]`}>
                {menu && `Add ${menu.charAt(0).toUpperCase() + menu.slice(1,)}` } 
              </button> */}
              {
                  ActiveMenu && <ActiveMenu/>
                }
            </div>

            <div
              onClick={() => setMenu("")}
              className={`absolute bg-[#1D1F29] top-1/2 -translate-y-1/2 cursor-pointer -right-[.90rem] z-[4] h-[50px] w-[15px] rounded-r-3xl flex items-center justify-center border-r border-t border-b border-[hsla(0,0%,100%,.12)]`}
            >
              <PiTriangleFill
                className={`w-[.5rem] h-[.5rem] -rotate-[90deg] text-second`}
              />
            </div>
          </>
        )}
    
      </Transition>

    </div>
  );
};

export default InteractiveMenu;


