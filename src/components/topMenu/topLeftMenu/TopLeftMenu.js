import { TOP_LEFT_ITEMS } from "../../../consts/menu-items";
import useEditor from "../../../hooks/useEditor";
import { useEffect } from "react";

const TopLeftMenu = () => {
  const { editor, activeElement, setActiveElement } = useEditor();

  useEffect(() => {
    const canvas = editor?.canvas;
    const handleInitialSelection = () => {
      const activeObject = canvas?.getActiveObject();
      if (activeObject) {
        setActiveElement(activeObject);
      } else {
        setActiveElement(null);
      }
    };
  
    if (canvas) {
      handleInitialSelection(); // Yükleme sırasında mevcut durumu kontrol edin
      canvas.on('selection:created', handleInitialSelection);
      canvas.on('selection:updated', handleInitialSelection);
      canvas.on('selection:cleared', handleInitialSelection);
    } 
  
    return () => {
      if (canvas) {
        canvas.off('selection:created', handleInitialSelection);
        canvas.off('selection:updated', handleInitialSelection);
        canvas.off('selection:cleared', handleInitialSelection);
      }
    };
  }, [editor?.canvas]);
  


  return (
    <div className="flex justify-center items-center gap-6 text-second">
      {activeElement?.type && TOP_LEFT_ITEMS[activeElement.type]}
    </div>
  );
};

export default TopLeftMenu;
