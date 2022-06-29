/**
 * UI designer: https://dribbble.com/Suzauddoula_Bappy
 * Design reference: https://dribbble.com/shots/18335013-NFT-Marketplace-Website
 */

import Avatar from '@components/Avatar'
import MobileMenu from '@components/MobileMenu'
import { useAttribution, useScreenSize } from '@lib/hooks'
import { getFakeFaces } from '@lib/index'
import styles from '@styles/beast.module.scss'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiPlay } from 'react-icons/hi'
import { IoIosArrowRoundForward } from 'react-icons/io'

const links = ['marketplace', 'resources', 'community', 'FAQ']

export default function Digitally({ avatars }: { avatars: FakeFace[] }) {
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm|md/i)
   const attribution = useAttribution('digitally')

   const additionalMenu = (
      <>
         <Link href="#">
            <a className='block'>Sign Up</a>
         </Link>
         <button className="w-full max-w-[200px] rounded-full p-2 px-6 bg-gray-800 text-white">Connect Wallet</button>
      </>
   )

   return (
      <div className='h-full overflow-hidden'>
         <main className='noise-bg min-h-screen flex flex-col bg-gradient-to-br from-teal-100 to-blue-200 px-6'>
            {
               isMobile ?
                  <MobileMenu
                     logo={<Logo />}
                     className="mb-12 py-4"
                     additionalMenu={additionalMenu}
                     attribution={attribution.attribution}
                     links={links}
                  /> :
                  <header className='h-20 bg-transparent flex items-center justify-between px-4 lg:px-14 mb-16 sticky top-0'>
                     <Logo />
                     <div className="flex items-center space-x-8 capitalize">
                        {
                           links.map(link => (
                              <Link href='#' key={link}>
                                 <a>{link}</a>
                              </Link>
                           ))
                        }
                     </div>
                     <div className="flex items-center space-x-4">
                        <Link href='#'>
                           <a className=''>Sign Up</a>
                        </Link>
                        <span>|</span>
                        <button className="rounded-full p-2 px-6 bg-gray-800 text-white">Connect Wallet</button>
                     </div>
                  </header>
            }
            <div className='relative flex-1 flex flex-col w-full max-w-7xl mx-auto'>
               <h3 className="flex items-end justify-between mb-2 font-changa">
                  <span className='text-2xl sm:text-4xl lg:text-5xl text-gray-700'>RARE</span>
                  <span className='sm:text-3xl text-gray-600'>Discover, Collect &amp; Sell</span>
               </h3>
               <div className={styles.nft}></div>
               <div className="flex flex-col md:grid grid-cols-8 flex-1 text-gray-600 font-medium tracking-tight space-y-6 md:space-y-0">
                  <div className="col-span-2 space-y-6 z-20 max-w-sm px-6 sm:px-0 mx-auto text-center md:text-left">
                     <p>The first NFT marketplace that enables creators to choose and embed licenses when they mint NFTs.</p>
                     <Link href='#'>
                        <a className="flex justify-center md:justify-start items-center space-y-2 space-x-4 whitespace-nowrap">
                           <span>Discover Now</span>
                           <span className="text-4xl w-14 h-14 rounded-full ring-2 ring-gray-600 text-gray-600 grid place-content-center">
                              <IoIosArrowRoundForward />
                           </span>
                        </a>
                     </Link>
                  </div>
                  <div className="hidden md:block col-span-2 col-start-7 lg:px-8 space-y-4 z-20">
                     <div className="flex mx-2">
                        {
                           avatars.map(av =>
                              <Avatar
                                 key={av.filename}
                                 src={av.image_url}
                                 size={isMobile ? 40 : undefined}
                                 className='bg-teal-200 md:ring-[6px] ring-4 -mx-2 ring-gray-100'
                              />
                           )
                        }
                        <Avatar
                           size={isMobile ? 40 : undefined}
                           className='bg-gray-800 text-white -mx-2 text-4xl'
                        ><HiPlay /></Avatar>
                     </div>
                     <p className='text-3xl text-gray-700'>
                        <span className="font-changa">10K+ Creators</span>
                        <span className='text-xs block mt-1'>
                           The first NFT marketplace that enables creators to choose
                        </span>
                     </p>
                     {attribution.link}
                  </div>
                  <div className="relative flex-1 w-full md:flex-none md:h-[70%] md:absolute md:bottom-0">
                     <Image
                        layout='fill'
                        src={'/hapebeast.png'}
                        className='z-10 object-contain'
                        objectPosition='bottom center'
                        alt='hapebeast nft of an ape wearing a winter jacket'
                     />
                     <div className="h-[300px] w-[300px] md:h-[420px] md:w-[420px] transform -translate-y-10 md:translate-x-6 mx-auto">
                        <div className={styles.circle}>
                           <div className={'noise-bg h-full w-full bg-gray-100 rounded-full overflow-hidden z-[1]'}></div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="h-24 hidden w-full lg:flex justify-between items-center font-michroma uppercase font-extrabold text-[100px] tracking-widest">
                  <p className='bg-clip-text bg-gradient-to-r from-gray-100 to-blue-200/20 text-transparent'>rare</p>
                  <p className='bg-clip-text bg-gradient-to-r from-gray-100 to-blue-200/20 text-transparent'>nft</p>
               </div>
            </div>
         </main>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async () => {
   const avatars = await getFakeFaces(2)
   return {
      props: {
         avatars
      },
   }
}

function Logo() {
   return (
      <Link href='/'>
         <a className='text-xl md:text-2xl font-changa text-gray-700'>Beast</a>
      </Link>
   )
}