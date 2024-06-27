import { useContext } from "react";
import { LayersContext } from "../context/LayersContext";

const useLayers = () => {
    return useContext(LayersContext);
};

export default useLayers;