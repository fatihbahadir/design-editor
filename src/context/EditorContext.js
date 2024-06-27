import { useFabricJSEditor } from "fabricjs-react";
import { createContext, useEffect, useState } from "react";
import { fabric } from "fabric";
const EditorContext = createContext();

const EditorProvider = ({ children }) => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [cropImage, setCropImage] = useState(true);
  const [isEditorSelected, setIsEditorSelected] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [name, setName] = useState("Untitled BluePlate");

  const [size, setSize] = useState({
    width: 350,
    height: 350
  });

  useEffect(()=>{
    editor?.canvas.setHeight(size.height);
    editor?.canvas.setWidth(size.width);
  }, [size, editor])


  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }


    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function(opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function(opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function(opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function(opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }
    

    editor.canvas.renderAll();
  }, [editor]);


  
  useEffect(() => {
    if (editor) {
      const handleSelection = () => {
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
          setIsEditorSelected(true);
        } else {
          setIsEditorSelected(false); 
        }
      };
  
      const handleSelectionCleared = () => {
        setIsEditorSelected(false); 
      };
  
      editor.canvas.on("selection:created", handleSelection);
      editor.canvas.on("selection:updated", handleSelection);
      editor.canvas.on("selection:cleared", handleSelectionCleared);
  
      return () => {
        editor.canvas.off("selection:created", handleSelection);
        editor.canvas.off("selection:updated", handleSelection);
        editor.canvas.off("selection:cleared", handleSelectionCleared);
      };
    }
  }, [editor]);
  

  const onAddCircle = () => {
    editor.addCircle();
  };

  const onAddRectangle = () => {
    editor.addRectangle();
  };

  const onAddText = (fontSize, fontFamily, fontWeight ,fill, text, lineHeight) => {
    var text = new fabric.Textbox(text, {
      fontSize: fontSize,
      fill: fill,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      lineHeight: lineHeight
    });

    editor?.canvas?.add(text);
  };



  const addBackground = () => {
    fabric.Image.fromURL(
      "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
      (image) => {
        editor.canvas.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas)
        );
      }
    );
  };

  return (
    <EditorContext.Provider value={{ editor, onReady, selectedObjects, setSize, size, onAddText, isEditorSelected, setIsEditorSelected, activeElement, setActiveElement, name, setName }}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorProvider, EditorContext };
