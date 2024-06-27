import { useContext } from "react";
import { InteractiveContext } from "../context/InteractiveContext";

const useInteractive = () => {
    return useContext(InteractiveContext);
};

export default useInteractive;