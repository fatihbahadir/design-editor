import React from 'react'
import { PiCircle, PiCircleFill, PiHeartFill, PiHexagonFill, PiRectangle, PiRectangleFill, PiSquareFill, PiStarFill, PiTriangle, PiTriangleFill } from 'react-icons/pi'
import useEditor from '../../../hooks/useEditor'
import { fabric } from "fabric";

const Elements = () => {
  const { editor } = useEditor();

  const addSquare = () => {
    if ( editor ) {
      const rect = new fabric.Rect({
        width: 45,
        height: 45,
        fill: '#676d8b', 
        left: 10,
        top: 10,
      });
      editor.canvas.add(rect);
    }
  }

  const addRectangle = () => {
    if ( editor ) {
      const rect = new fabric.Rect({
        width: 60,
        height: 45,
        fill: '#676d8b', 
        left: 10,
        top: 10,
      });
      editor.canvas.add(rect);
    }
  }


  const addTriangle = () => {
    if (!editor) return;
  
    const triangle = new fabric.Triangle({
      left: 100, // X koordinatı
      top: 100, // Y koordinatı
      width: 45, // Üçgenin genişliği
      height: 45, // Üçgenin yüksekliği
      fill: '#676d8b', 

    });
  
    editor.canvas.add(triangle); // Üçgeni canvas'a ekle
  };
  

  const addCircle = () => {
    if (!editor) return;
  
    const radius = 22.5; // Dairenin yarıçapı
    const circle = new fabric.Circle({
      left: 100, // X koordinatı
      top: 100, // Y koordinatı
      radius: radius, // Dairenin yarıçapı
      fill: '#676d8b', 
    });
  
    editor.canvas.add(circle); // Daireyi canvas'a ekle
  };

  
  const addHexagon = () => {
    if (!editor) return;
  
    const sideLength = 45; // Altıgenin kenar uzunluğu
    const radius = sideLength / Math.sqrt(3); // Dairenin yarıçapı
    const hexagon = new fabric.Polygon([
      { x: radius, y: 0 },
      { x: radius / 2, y: sideLength / 2 },
      { x: -radius / 2, y: sideLength / 2 },
      { x: -radius, y: 0 },
      { x: -radius / 2, y: -sideLength / 2 },
      { x: radius / 2, y: -sideLength / 2 }
    ], {
      left: 100, // X koordinatı
      top: 100, // Y koordinatı
      fill: '#676d8b', 

    });
  
    editor.canvas.add(hexagon); // Altıgeni canvas'a ekle
  };
  
  const addStar = () => {
    if (!editor) return;
  
    const outerRadius = 30; // Dış yarıçap
    const innerRadius = 15; // İç yarıçap
    const numPoints = 5; // Yıldızın köşe sayısı
    const rotation = 55; // Dönüş açısı (derece cinsinden)
  
    const points = [];
    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = ((Math.PI / numPoints) * i) + fabric.util.degreesToRadians(rotation);
      const x = 100 + radius * Math.cos(angle);
      const y = 100 + radius * Math.sin(angle);
      points.push({ x, y });
    }
  
    const star = new fabric.Polygon(points, {
      left: 100, // X koordinatı
      top: 100, // Y koordinatı
      fill: '#676d8b', 

    });
  
    editor.canvas.add(star); // Yıldızı canvas'a ekle
  };

  
  return (
    <div className="text-second mt-4"> 
          <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-6 py-2 w-full' onClick={()=>{
              addSquare()
            }}>
              <div className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
                <PiSquareFill className='w-[4rem] h-[4rem]' />
              </div>
            </div>

            <div className='col-span-6 py-2 w-full' onClick={()=>{
              addRectangle()
            }}>
              <div className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
                <PiRectangleFill className='w-[4rem] h-[4rem]' />
              </div>
            </div>

            <div className='col-span-6 py-2 w-full' onClick={()=>{
              addCircle()
            }}>
              <div className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
                <PiCircleFill className='w-[4rem] h-[4rem]'/>
              </div>
            </div>
            <div className='col-span-6 py-2 w-full' onClick={()=>{
              addTriangle()
            }}>
              <div className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
                <PiTriangleFill className='w-[4rem] h-[4rem]'/>
              </div>
            </div>
            <div className='col-span-6 py-2 w-full' onClick={()=>{
              addHexagon()
            }}>
              <div className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
                <PiHexagonFill className='w-[4rem] h-[4rem] rotate-90'/>
              </div>
            </div>
            <div className='col-span-6 py-2 w-full' onClick={()=>{
              addStar()
            }}>
              <div className="p-4 transition-all border mr-2 hover:bg-[#1A1C24] border-[hsla(0,0%,100%,.12)] cursor-pointer w-full flex items-center justify-center flex-col gap-3  rounded">
                <PiStarFill className='w-[4rem] h-[4rem]'/>
              </div>
            </div>
          
          </div>
    </div>
  )
}

export default Elements
