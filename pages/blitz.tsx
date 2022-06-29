import Avatar from "@components/Avatar";
import MobileMenu from "@components/MobileMenu";
import { getFakeFaces } from "@lib/index";
import attributions from "@lib/attributions";
import { useScreenSize } from "@lib/hooks";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaQuoteRight } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { RiMessage3Fill } from "react-icons/ri";
import { GetServerSideProps } from "next";

const attribution = attributions['jadoo']
const links = ['services', 'projects', 'about']

export default function Blitz({ avatars }: { avatars: FakeFace[] }) {
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm|md/i)

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
      <div className="bg-gray-50 min-h-screen">
         <Head>
            <title>Watch, Learn, Grow</title>
         </Head>

         <main className="w-full max-w-7xl mx-auto px-8">
            {
               isMobile ?
                  <MobileMenu
                     logo={<Logo />}
                     className="mb-8 py-8"
                     additionalMenu={additionalMenu}
                     links={links}
                  /> :
                  <header className='w-full max-w-7xl mx-auto h-24 bg-transparent flex items-center justify-between space-x-24 sticky top-0'>
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
                           <div className="flex flex-col space-y-2 w-[70px] flex-shrink-0">
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

            <div className="bg-neutral-800">
               <div className="min-h-[550px] grid grid-cols-3 gap-0.5 p-0.5">
                  <div className="bg-gray-50 col-span-2 rounded-3xl p-8 py-14 flex flex-col justify-between">
                     <h1 className={`
                        font-roboto font-bold text-[50px] leading-[50px] 
                        md:text-[80px] md:leading-[80px]
                        lg:text-[100px] lg:leading-[100px] max-w-sm
                     `}>Look beyond limits</h1>
                     <div className="flex space-x-4">
                        <button className="noise-bg overflow-hidden rounded-full px-12 bg-gradient-to-tr from-orange-100 to-red-400 font-bold text-lg">
                           <span className="relative z-[2]">Get in touch</span>
                        </button>
                        <span className="text-3xl w-14 h-14 rounded-full ring-2 ring-gray-600 text-neutral-800 grid place-content-center">
                           <RiMessage3Fill />
                        </span>
                     </div>
                  </div>
                  <div className="bg-gray-50 rounded-3xl"></div>
               </div>
               <div className="grid grid-cols-3 min-h-[300px] gap-0.5 px-0.5">
                  <div className="bg-gray-200 rounded-t-3xl p-8 flex flex-col justify-between relative">
                     <p className="text-2xl max-w-[230px] text-gray-600">
                        They are very proactive and work to make your product even better.
                     </p>
                     <div className="relative h-8 w-full max-w-xs">
                        <Image
                           src='/blitz/appletv-logo.png'
                           objectFit="contain"
                           objectPosition="left center"
                           layout="fill"
                        />
                     </div>
                     <FaQuoteRight className="absolute text-xl right-8" />
                  </div>
                  <div className="bg-gray-50 rounded-t-3xl p-8 flex flex-col justify-between relative">
                     <div className="space-y-3">
                        <p className="text-2xl font-bold">
                           The most experienced, specialised team across the industry.
                        </p>
                        <p className="text-sm text-gray-600 underline">
                           Work with us
                        </p>
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
                  </div>
                  <div className="bg-gray-50 rounded-t-3xl"></div>
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
