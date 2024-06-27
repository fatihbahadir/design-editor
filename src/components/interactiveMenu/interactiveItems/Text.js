import React from "react";
import { v4 as uuid } from "uuid";
import useLayers from "../../../hooks/useLayers";
import useInteractive from "../../../hooks/useInteractive";
import LayerComponent from "../../drag-drop/LayerComponent";
import useEditor from "../../../hooks/useEditor";
import { textItems } from "../../../consts/size-options";

const Text = () => {
  const { addLayer } = useLayers();
  const { menu, setMenu } = useInteractive();
  const { editor , setSize, onAddText } = useEditor();

  return (
    <div className="flex flex-col gap-6 py-2"> 
      <button
        onClick={() => {
          // const newUuid = uuid();
          // addLayer("text", {
          //   id: newUuid,
          //   component: (
          //     <LayerComponent
          //       id={newUuid}
          //       type="text"
          //       bgColor="#D2E3C8"
          //       themeColor="#739072"
          //       extendColor="#4F6F52"
          //     />
          //   ),
          //   start: 1,
          //   end: 3,
          // });
          onAddText(15, "Arial", 500, "#676D8B","Sample Text", 1);
        }}
        className={`bg-second ${
          menu ? "w-full" : "w-0"
        } rounded text-white py-[.4rem] text-[14px]`}
      >
        {menu && `Add ${menu.charAt(0).toUpperCase() + menu.slice(1)}`}
      </button>{" "}
      <div className="flex flex-col gap-3">
        <p className="text-second text-sm font-semibold">Default Text Styles</p>
        {
          textItems.map((item,index)=> (
            <div onClick={()=>onAddText(item.fontSize, "Rubik", 400, "#676D8B", item.text, 1)} key={index} className="w-full hover:bg-[#1A1C24] rounded cursor-pointer transition-all border border-[hsla(0,0%,100%,.12)]   text-second" >
            <h1 className={`text-${item.size} py-3 px-2`}>{item.text}</h1>
          </div>
          ))
        }
       
      </div>
    </div>
  );
};

export default Text;
