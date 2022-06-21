import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { FiX } from "react-icons/fi"
import { HiMenuAlt3 } from "react-icons/hi"

interface MenuProps {
   links: string[]
   logo?: React.ReactNode
   className?: string
   additional_menu?: React.ReactNode
   attribution?: [string, string]
}

export default function MobileMenu(props: MenuProps) {
   const [isOpen, setIsOpen] = useState(false)
   const closeMenu = () => setIsOpen(false)
   const openMenu = () => setIsOpen(true)

   return (
      <header className="z-[999]">
         <div className={`flex items-center space-x-2 ${props.className}`}>
            <HiMenuAlt3 onClick={openMenu} className="text-2xl cursor-pointer" />
            {props.logo}
         </div>
         {
            isOpen &&
            <motion.div
               initial={{ opacity: 0, x: -40 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -300 }}
               className="min-h-screen w-4/5 max-w-sm flex flex-col p-6 bg-gray-50 fixed top-0 left-0"
            >
               <div className="relative flex-1 flex flex-col">
                  <div
                     onClick={closeMenu}
                     className={`
                        bg-gray-100 border text-gray-600 w-8 h-8 grid place-items-center 
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
                     {props.additional_menu}
                     {
                        props.attribution &&
                        <Link
                           href={props.attribution[1]}
                        >
                           <a
                              className='text-3xl text-gray-700 mt-4 space-y-1'
                              target={"_blank"}
                              rel="noreferrer"
                           >
                              <span className='text-xs mt-3 text-gray-500'>UI Design:</span> <span className='text-sm'>{props.attribution[0]}</span>
                           </a>
                        </Link>
                     }
                  </div>
               </div>
            </motion.div>
         }
      </header>
   );
}