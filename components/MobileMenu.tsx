import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { FiX } from "react-icons/fi"
import { HiMenuAlt3 } from "react-icons/hi"
import CustomLink from "./Link"

interface MenuProps {
   links: string[]
   logo?: React.ReactNode
   className?: string
   additionalStyles?: string
   additionalMenu?: React.ReactNode
   attribution?: Attribution
}

export default function MobileMenu(props: MenuProps) {
   const [isOpen, setIsOpen] = useState(false)
   const closeMenu = () => setIsOpen(false)
   const openMenu = () => setIsOpen(true)

   return (
      <header className="z-[999] relative">
         <div className={`lg:hidden flex items-center capitalize ${props.className}`}>
            <div className="flex items-center space-x-2">
               <HiMenuAlt3 onClick={openMenu} className="text-2xl cursor-pointer" />
               {props.logo}
            </div>
            <div className="hidden md:flex items-center ml-auto space-x-8 whitespace-nowrap">
               {
                  //Add far right items on medium sizes
                  props.additionalMenu
               }
            </div>
         </div>
         {
            isOpen &&
            <motion.div
               initial={{ opacity: 0, x: -40 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -300 }}
               className={`
                  min-h-screen w-4/5 max-w-sm flex flex-col p-6 fixed top-0 left-0 shadow-2xl
                  ${props.additionalStyles ?? 'bg-gray-50'}
               `}
            >
               <div className="relative flex-1 flex flex-col">
                  <div
                     onClick={closeMenu}
                     className={`
                        bg-transparent border text-gray-600 w-8 h-8 grid place-items-center 
                        rounded-full cursor-pointer absolute right-0 top-0 z-10
                     `}
                  ><FiX className="text-lg" /></div>
                  <div className="flex-1 flex flex-col capitalize p-4">
                     {
                        props.links.map(route =>
                           <Link href="#" key={route}>
                              <a className='block mb-8'>{route}</a>
                           </Link>
                        )
                     }
                     <div className="space-y-8 mt-auto">
                        {props.additionalMenu}
                     </div>
                     {
                        props.attribution &&
                        <CustomLink 
                           href={props.attribution.link}
                           className='text-3xl text-gray-700 mt-4 space-y-1'
                           external
                        >
                           <span className='text-xs mt-3 text-gray-500'>UI Design:</span> <span className='text-sm'>{props.attribution.name}</span>
                        </CustomLink>
                     }
                  </div>
               </div>
            </motion.div>
         }
      </header>
   );
}