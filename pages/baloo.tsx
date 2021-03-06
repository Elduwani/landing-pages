/**
 * UI designer: https://www.instagram.com/p/CQ2gb41q_Ky/
 * Design reference: https://www.arshakir.com/uploads/projects/travel-agency-landing-page-freebie.jpg
 * Hero image: https://depositphotos.com/187701826/stock-photo-beautiful-smiling-girl-bikini-posing.html
 * Image options: [
 *    https://depositphotos.com/436142118/stock-photo-full-length-body-size-view.html,
 *    https://www.shutterstock.com/image-photo/full-length-traveler-tourist-woman-casual-1995126203?irclickid=3lZ1ug2M3xyIWOVwaRzAaxogUkDzGMSGxxW6yg0&irgwc=1&utm_medium=Affiliate&utm_campaign=picjumbo%20%2F%20Viktor%20Hanacek&utm_source=1982588&utm_term=
 * ]
 */

import MobileMenu from '@components/MobileMenu'
import { useAttribution, useScreenSize } from '@lib/hooks'
import styles from '@styles/baloo.module.scss'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi'
import { RiPlayFill } from 'react-icons/ri'
import imageHero from "@public/baloo/hero.png"

const links = ['destinations', 'hotels', 'flights', 'bookings', 'login']

export default function Baloo() {
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm|md/i)
   const attribution = useAttribution('jadoo')

   const additionalMenu = (
      <>
         <Link href="#">
            <a className='block'>Sign Up</a>
         </Link>
         <p className='flex items-center space-x-1'>
            <span>EN</span>
            <HiChevronDown />
         </p>
      </>
   )

   return (
      <div className='h-full overflow-hidden'>
         <Head>
            <title>Best destinations around the world</title>
         </Head>
         <main className={styles.main}>
            {
               isMobile ?
                  <MobileMenu
                     logo={<Logo />}
                     className="mb-8 py-8"
                     additionalMenu={additionalMenu}
                     links={links}
                  /> :
                  <header className='w-full max-w-7xl mx-auto h-24 bg-transparent flex items-center justify-between sticky top-0'>
                     <Logo />
                     <div className="flex items-center space-x-14 capitalize justify-end w-full whitespace-nowrap">
                        {
                           links.map(link => (
                              <Link href='#' key={link}>
                                 <a>{link}</a>
                              </Link>
                           ))
                        }
                        <Link href='#'>
                           <a className='border rounded-md border-gray-600 h-10 grid place-content-center px-4'>Sign Up</a>
                        </Link>
                        <p className='flex items-center space-x-1'>
                           <span>EN</span>
                           <HiChevronDown />
                        </p>
                     </div>
                  </header>
            }

            <div className='relative flex-1 flex flex-col w-full max-w-7xl mx-auto md:px-20 lg:px-0'>
               <div className="lg:grid grid-cols-2 min-h-[800px] mb-24">
                  <div className="md:pt-12 lg:pt-24 space-y-4">
                     <p className='uppercase tracking-widest text-xl font-bold text-red-500'>
                        best destinations around the world
                     </p>
                     <h1 className={`
                        font-roboto font-bold text-[50px] leading-[50px] 
                        md:text-[80px] md:leading-[80px] tracking-tighter 
                        lg:text-[100px] lg:leading-[100px]
                     `}>
                        Travel, <span className={styles.stroke}>enjoy</span> and live a new and full life
                     </h1>
                     <p className='py-4 text-gray-500 max-w-lg md:text-lg md:tracking-wide'>
                        Eius sed sit, unde animi reiciendis, deserunt rem odit delectus dolor exercitationem impedit non mollitia, deleniti veritatis veniam. Unde placeat minima voluptatem.
                     </p>
                     <div className="flex items-center space-x-8">
                        <button className='h-14 bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-6 shadow-xl shadow-orange-300/30'>Find out more</button>
                        <div className="flex items-center space-x-2 text-gray-500">
                           <button className='h-14 w-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-3xl grid place-content-center shadow-xl shadow-orange-500/30'>
                              <RiPlayFill />
                           </button>
                           <span>Play demo</span>
                        </div>
                     </div>
                     {
                        //attribution
                        attribution.link
                     }
                  </div>
                  <div className="mt-8 lg:mt-0">
                     <Image
                        src={imageHero}
                        width={600}
                        height={800}
                        objectFit='contain'
                        objectPosition='top center'
                        alt='girl in bikini travelling with suitcase and passport'
                     />
                  </div>
               </div>

               <div className={styles.services}>
                  <div className="text-center">
                     <p className='uppercase tracking-wider font-bold text-lg text-gray-600'>category</p>
                     <h2 className='text-3xl sm:text-5xl capitalize font-roboto font-bold'>We offer best services</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                     {
                        boxes.map(box => <Box key={box.title} {...box} />)
                     }
                  </div>
               </div>

            </div>
         </main>
      </div>
   )
}

interface BoxProps {
   src: `/baloo/${string}`
   title: string
   text: string
   highlighted?: boolean
}
function Box(props: BoxProps) {
   return (
      <div className={`relative px-6`}>
         <motion.div
            className={`p-6 bg-white cursor-pointer rounded-2xl hover:shadow-2xl hover:shadow-orange-400/40 shadow-orange-400/40 z-10 relative ${props.highlighted && 'shadow-2xl'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -10 }}
         >
            <Image
               width={100}
               height={100}
               objectFit='contain'
               src={props.src}
               alt={props.title + " icon"}
            />
            <h3 className='text-lg capitalize font-bold text-gray-700 mb-2'>{props.title}</h3>
            <p className='text-gray-600'>{props.text}</p>
         </motion.div>
         {
            props.highlighted &&
            <span className="absolute w-24 h-24 bottom-0 left-0 z-0 bg-orange-500 rounded-tl-3xl rounded-br-md"></span>
         }
      </div>
   )
}

function Logo() {
   return (
      <Link href='/'>
         <a className='text-2xl lg:text-5xl font-changa text-gray-700'>Baloo</a>
      </Link>
   )
}

const boxes: BoxProps[] = [
   {
      title: 'calculated weather',
      src: '/baloo/weather.png',
      text: 'Inhabit hearing perhaps on ye do no. It maids decay as there he. Smallest on suitable disposed do although blessing theatrics service.'
   },
   {
      title: 'best flights',
      src: '/baloo/flights.png',
      text: 'Occasional preference fat remarkably now projecting uncommonly dissimilar. Sentiments projection particular companions.',
      highlighted: true
   },
   {
      title: 'local events',
      src: '/baloo/events.png',
      text: 'Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off.'
   },
   {
      title: 'customization',
      src: '/baloo/settings.png',
      text: 'Improve up at to on mention perhaps raising. Way building not get formerly her peculiar. Up uncommonly prosperous sentiments.'
   },
]