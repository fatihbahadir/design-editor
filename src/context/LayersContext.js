import { createContext, useState } from "react";

const LayersContext = createContext();

const LayersProvider = ({ children }) => {
  const [layers, setLayers] = useState({
    text: [],
    bg: [],
    video: [],
    music: [],
  });

  const addLayer = (layerType, component) => {
    setLayers((prevLayers) => ({
      ...prevLayers,
      [layerType]: [...prevLayers[layerType], component],
    }));
  };

  const updateLayer = (layerType, id ,propName, value) => {
    setLayers(prevLayers => {
      const updatedTextLayers = prevLayers[layerType].map(layer => {
        if (layer.id === id) {
          return { ...layer, [propName]: value };
        }
        return layer; 
      });
  
      return {
        ...prevLayers,
        [layerType]: updatedTextLayers,
      };
    });
  }

  return (
    <LayersContext.Provider value={{ layers, addLayer, setLayers, updateLayer }}>
      {children}
    </LayersContext.Provider>
  );
};

export { LayersProvider, LayersContext };
