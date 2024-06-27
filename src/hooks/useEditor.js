import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";

const useEditor = () => {
    return useContext(EditorContext);
};

export default useEditor;