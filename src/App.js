import { useEffect, useState } from "react";
import Sidebar from "./components/common/Sidebar";
import Layers from "./components/drag-drop/Layers";
import InteractiveMenu from "./components/interactiveMenu/InteractiveMenu";
import TopMenu from "./components/topMenu/TopMenu";
import useInteractive from "./hooks/useInteractive";
import { FabricJSCanvas } from "fabricjs-react";
import useEditor from "./hooks/useEditor";
import fabric from "fabric";

const App = () => {
  const { menu } = useInteractive();
  const {
    editor,
    onReady,
    isEditorSelected,
    setIsEditorSelected,
  } = useEditor();

  return (
    <div className="w-screen h-screen bg-black flex transition-all duration-300">
      <Sidebar />
      <InteractiveMenu />
      <div
        className={`flex flex-col w-full max-h-screen items-center`}
      >
        <TopMenu />
        <div className="w-full h-full flex items-center justify-center relative">
          <div
            onClick={() => {
              setIsEditorSelected(false);
              if (editor && editor.canvas) {
                editor.canvas.discardActiveObject();
                editor.canvas.requestRenderAll();
              }
            }}
            className="w-full h-full absolute top-0 left-0 z-[1]"
          ></div>
          <FabricJSCanvas
            className={`bg-main ${isEditorSelected &&
              "border-2 border-second"} z-[2]`}
            onReady={onReady}
          />
        </div>
        {/* <div className="mt-auto transition-all duration-300">
          <Layers />
        </div> */}
      </div>

    </div>
  );
};

export default App;
