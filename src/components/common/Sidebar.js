import React from 'react'
import Logo from '../../assets/images/logo.png';
import { VIDEO_PANEL_ITEMS } from '../../consts/add-options';
import useInteractive from '../../hooks/useInteractive';

const Sidebar = () => {
  const { menu, setMenu } = useInteractive();
  return (
    <div className='h-screen w-[90px] bg-main p-2 border-r border-l-0 border-[hsla(0,0%,100%,.12)] z-[2]'>
        <div className='brand'>
            <img src={Logo} className='w-full h-[64px]' />
        </div>
        <div className='w-full flex items-center justify-center mb-2'>
            <div className='w-[40%] h-[.8px] bg-second'>
            </div>
        </div>
 
        <div className=''>
            <ul className='flex flex-col gap-2'>
                {
                    VIDEO_PANEL_ITEMS.map(({Icon, name, id})=>(
                        <li onClick={()=>setMenu(id)} className={`flex flex-col items-center justify-center text-[14px] text-second rounded ${id === menu && 'bg-[#0F1016] text-white'} p-2 cursor-pointer transition-all hover:bg-[#0F1016] hover:text-white w-full px-5`}>
                            <Icon className='w-[20px] h-[20px]'/>
                            <p className='mt-[.15rem]'>{name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className='w-full flex items-center justify-center my-2'>
            <div className='w-[40%] h-[.8px] bg-second'>
            </div>
        </div>
 
    </div>
  )
}

export default Sidebar
