import Avatar from "@components/Avatar";
import MobileMenu from "@components/MobileMenu";
import { useAttribution, useScreenSize } from "@lib/hooks";
import { getFakeFaces } from "@lib/index";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaQuoteRight } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { RiMessage3Fill } from "react-icons/ri";
import { BsArrowUpRight } from "react-icons/bs";

const links = ['services', 'projects', 'about']

export default function Blitz({ avatars }: { avatars: FakeFace[] }) {
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm|md/i)
   const attribution = useAttribution('blitz')

   const additionalMenu = (
      <>
         <Link href="#">
            <a className='block'>Sign Up</a>
         </Link>
         <Link href="#">
            <a className='block'>Sign Up</a>
         </Link>
      </>
   )

   return (
      <div className="bg-gray-50 h-screen">
         <Head>
            <title>Look beyong limits</title>
         </Head>

         <main className="w-full max-w-6xl mx-auto px-8 flex flex-col min-h-full">
            {
               isMobile ?
                  <MobileMenu
                     logo={<Logo />}
                     className="mb-8 py-8"
                     additionalMenu={additionalMenu}
                     links={links}
                  /> :
                  <header className='w-full max-w-7xl mx-auto h-24 bg-gray-50 flex items-center justify-between space-x-24'>
                     <Logo />
                     <div className="flex items-center uppercase text-sm tracking-wide w-full whitespace-nowrap">
                        {
                           links.map(link => (
                              <Link href='#' key={link}>
                                 <a className="flex items-center space-x-2 mr-6">
                                    <span>{link}</span>
                                    <HiChevronDown className="text-md" />
                                 </a>
                              </Link>
                           ))
                        }
                        <div className="flex items-center space-x-8 ml-auto">
                           <div className="flex flex-col space-y-2 w-[40px] flex-shrink-0">
                              <span className="border-t-2 border-gray-900"></span>
                              <span className="border-t-2 border-gray-900"></span>
                           </div>
                           <Link href='#'>
                              <a className='bg-gray-800 rounded-full h-9 grid place-content-center px-4 py-1 text-white'>
                                 Contact Us
                              </a>
                           </Link>
                        </div>
                     </div>
                  </header>
            }

            <div className="bg-neutral-800 flex-1 flex flex-col">
               <div className="flex-1 grid grid-cols-3 gap-0.5 p-0.5">
                  <div className="bg-gray-50 col-span-2 rounded-2xl p-8 py-14 flex flex-col justify-between relative z-10">
                     <h1 className={`
                        font-roboto font-bold text-[50px] leading-[50px] 
                        md:text-[80px] md:leading-[80px]
                        lg:text-[100px] lg:leading-[100px] max-w-md
                     `}>Futurist of smart design</h1>
                     <div className="flex space-x-4">
                        <button className="noise-bg overflow-hidden rounded-full px-12 bg-gradient-to-tr from-orange-100 to-red-400 font-bold text-lg">
                           <span className="relative z-[2]">Get in touch</span>
                        </button>
                        <span className="text-3xl w-14 h-14 rounded-full ring-2 ring-gray-600 text-neutral-800 grid place-content-center">
                           <RiMessage3Fill />
                        </span>
                     </div>
                     <div className="absolute h-full w-full max-w-xl top-0 right-0 transform translate-x-1/2">
                        <div className="relative h-full w-full">
                           <div className="text-[100px] text-neutral-300 relative transform translate-y-1/2 translate-x-8 h-1/2 max-w-min">
                              <BsArrowUpRight />
                           </div>
                           <Image
                              layout="fill"
                              src="/blitz/hero-image.png"
                              objectFit="contain"
                              objectPosition="bottom right"
                              // link="https://unsplash.com/photos/aoEwuEH7YAs"
                              alt='man wearing black sweater'
                           />
                        </div>
                     </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl relative overflow-hidden">
                     <Image
                        layout="fill"
                        src="/blitz/artificial.png"
                        alt='artificial text on grunge background'
                        objectPosition="center"
                        objectFit="cover"
                     />
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-0.5 px-0.5">
                  <Box className="bg-gray-200">
                     <p className="text-2xl max-w-[230px] text-gray-600">
                        They are very proactive and work to make your product even better.
                     </p>
                     <div className="relative h-8 w-full max-w-xs">
                        <Image
                           src='/blitz/appletv-logo.png'
                           objectFit="contain"
                           objectPosition="left center"
                           alt="apple tv+ logo"
                           layout="fill"
                        />
                     </div>
                     <FaQuoteRight className="absolute text-xl right-8" />
                  </Box>
                  <Box className="bg-gray-50">
                     <div className="space-y-3">
                        <p className="text-2xl font-bold">
                           The most experienced, specialised team across the industry.
                        </p>
                        {
                           //attribution
                           attribution.link
                        }
                     </div>
                     <div className="relative h-8 w-full max-w-xs flex items-center space-x-4">
                        <div className="flex m-1">
                           {
                              avatars.map(av =>
                                 <Avatar
                                    key={av.filename}
                                    src={av.image_url}
                                    size={40}
                                    className='bg-green-200 ring-2 -mx-1 ring-white'
                                 />
                              )
                           }
                        </div>

                        <Link href='#'>
                           <a className="uppercase text-xs w-[100px] font-medium underline">
                              Meet our developers
                           </a>
                        </Link>
                     </div>
                  </Box>
                  <Box className="bg-gray-50 relative noise-bg overflow-hidden">
                     <div className="space-y-3 relative z-10">
                        <h1 className="text-[120px] leading-none font-bold shadow-2xl p-2">3D</h1>
                     </div>
                     <Image
                        src='/blitz/3d.jpg'
                        objectFit="cover"
                        objectPosition="center"
                        alt="3d render of girl with floating cars"
                        layout="fill"
                        className="opacity-20"
                     />
                  </Box>
               </div>
            </div>
         </main>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   const avatars = await getFakeFaces(3)
   return {
      props: {
         avatars
      },
   }
}

function Logo() {
   return (
      <Link href='/'>
         <a className='text-2xl lg:text-4xl font-changa'>Blitz</a>
      </Link>
   )
}

interface BoxProps {
   children: React.ReactNode
   className?: string
}
function Box(props: BoxProps) {
   return (
      <div className={`rounded-t-2xl p-8 flex flex-col justify-between relative h-[300px] ${props.className}`}>
         {props.children}
      </div>
   )
}
