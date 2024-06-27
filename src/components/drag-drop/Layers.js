import React, { useState } from "react";
import useLayers from "../../hooks/useLayers";
import { v4 as uuid } from "uuid";
import LayerComponent from "./LayerComponent";

const Layers = () => {
  const { addLayer, layers, updateLayer } = useLayers();
  const [num, setNum] = useState();

  const handleAddElement = (
    type,
    bgColor,
    themeColor,
    extendColor,
    start,
    end
  ) => {
    const newUuid = uuid();
    addLayer(type, {
      id: newUuid,
      component: (
        <LayerComponent
          id={newUuid}
          type={type}
          bgColor={bgColor}
          themeColor={themeColor}
          extendColor={extendColor}
        />
      ),
      start: start,
      end: end,
    });
  };

  const handleAddBackground = () => {
    const newUuid = uuid();
    addLayer("bg", {
      id: newUuid,
      component: (
        <LayerComponent
          id={newUuid}
          type="bg"
          bgColor="#F2EFE5"
          themeColor="#C7C8CC"
          extendColor="#B4B4B8"
        />
      ),
      start: 1,
      end: 3,
    });
  };
  const handleAddMusic = () => {
    const newUuid = uuid();
    addLayer("music", {
      id: newUuid,
      component: (
        <LayerComponent
          id={newUuid}
          type="music"
          bgColor="#FFE7E7"
          themeColor="#B47B84"
          extendColor="#944E63"
        />
      ),
      start: 1,
      end: 3,
    });
  };

  const renderLayerComponents = (layerType) => {
    return layers[layerType].map((obj, index) => (
      <div key={index}>{obj.component}</div>
    ));
  };
  return (
      <div className="w-full bg-main  border-t border-[hsla(0,0%,100%,.12)] px-2">
        <div className="w-full h-[25px] grid grid-cols-100 border-b border-[hsla(0,0%,100%,.12)]">
          {Array.from({ length: 100 }, (_, index) => (
            <div
              key={index + 1}
              className={`bg-main w-full h-full border border-[hsla(0,0%,100%,.12)] border-b-0 ${
                index % 5 == 0
                  ? `${index !== 0 ? 'border-l' : 'border-l-0'}   items-center justify-start py-1 px-[.2em] h-[1rem]`
                  : `border-l-0  items-start  justify-start`
              } border-r-0 border-t-0  text-[12px] flex text-second border-[hsla(0,0%,100%,.12)] col-span-1 `}
            >
              {index % 5 === 0 ? (
                <p className="z-[5]">{index}%</p>
              ) : (
                <div className="w-[.05rem]  h-1 bg-second"></div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col rounded-t-none rounded bg-main pb-12">
          <div className="w-full flex flex-col items-start">
            <h3 className="text-[12px] text-second font-[500] py-2 ">
              Text Layer
            </h3>
            <div className="relative w-full">
              {renderLayerComponents("text")}
            </div>

            <h3 className="text-[12px] text-second font-[500] py-2 ">
              Background Layer
            </h3>
            <div className="relative w-full">{renderLayerComponents("bg")}</div>

            <h3 className="text-[12px] text-second font-[500] py-2 ">
              Music Layer
            </h3>
            <div className="relative w-full">
              {renderLayerComponents("music")}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Layers;
