/**
 * UI designer: https://dribbble.com/halolab
 * Design reference: https://dribbble.com/shots/16358186-Web-site-landing-page
 */

import MobileMenu from '@components/MobileMenu'
import attributions from '@lib/attributions'
import { useAttribution, useInterval, useScreenSize } from '@lib/hooks'
import { randomIndices } from '@lib/index'
import styles from '@styles/quillex.module.scss'
import { motion } from 'framer-motion'
import fs from 'fs'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import path from 'path'
import { useRef, useState } from 'react'

const links = ['all categories', 'pricing', 'for business', 'search']

interface Props {
   filesList: Box['src'][]
}
export default function Quillex(props: Props) {
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm|md/i)
   const attribution = useAttribution('skillex')

   const palette = [
      'bg-gradient-to-t from-orange-400 to-orange-300',
      'bg-gradient-to-t from-lime-400 to-lime-300',
      'bg-gradient-to-t from-gray-400 to-gray-300',
      'bg-gradient-to-t from-teal-400 to-teal-300',
   ]

   const additionalMenu = (
      <>
         <Link href="#">
            <a className='block'>log in</a>
         </Link>
         <button className="w-full max-w-[200px] rounded-full p-2 px-6 bg-gray-800 text-white capitalize">free trial</button>
      </>
   )

   return (
      <div className='h-full overflow-hidden'>
         <Head>
            <title>Watch, Learn, Grow</title>
         </Head>
         <main className={styles.main}>
            {
               isMobile ?
                  <MobileMenu
                     logo={<Logo />}
                     className="mb-8 py-8"
                     additionalStyles='bg-lime-50'
                     additionalMenu={additionalMenu}
                     links={links}
                  /> :
                  <header className='w-full max-w-7xl mx-auto h-24 bg-transparent flex items-center space-x-12 justify-between sticky top-0'>
                     <Logo />
                     <div className="flex items-center capitalize w-full whitespace-nowrap text-gray-600">
                        {
                           links.map(link => (
                              <Link href='#' key={link}>
                                 <a className='mx-8'>{link}</a>
                              </Link>
                           ))
                        }
                        <div className="flex items-center space-x-10 ml-auto">
                           <Link href='#'>
                              <a className=''>log in</a>
                           </Link>
                           <button className="w-full max-w-sm rounded-full p-2 px-8 bg-gray-800 text-white capitalize">free trial</button>
                        </div>
                     </div>
                  </header>
            }

            <div className='relative flex-1 flex flex-col w-full max-w-7xl mx-auto lg:pt-12'>
               <div className="lg:grid grid-cols-3 min-h-[700px] mb-16 md:mb-32 space-y-12 lg:space-y-0">
                  <div className="md:pt-12 lg:pt-24">
                     <div className="space-y-2 md:flex md:space-x-4 md:justify-center md:space-y-0 lg:block mb-10 lg:mb-28 text-center lg:text-left">
                        <p className={styles.headline}>watch.</p>
                        <p className={styles.headline}>learn.</p>
                        <p className={styles.headline}>grow.</p>
                     </div>
                     <div className="mt-auto lg:w-[500px] z-10 relative space-y-4">
                        <div className="w-full flex h-28 shadow-2xl shadow-slate-500/40">
                           <input
                              type='text'
                              className="px-4 pl-12 w-full placeholder:text-gray-500 placeholder:text-2xl text-2xl text-gray-700 focus:outline-none"
                              placeholder='Find Your Passion...'
                           />
                           <button className="w-[30%] text-2xl md:text-4xl font-roboto bg-lime-500">Go</button>
                        </div>
                        {
                           //attribution
                           attribution.link
                        }
                     </div>
                  </div>
                  <div className="col-span-2 flex space-x-4 lg:space-x-8">
                     <Boxes filesList={props.filesList} />
                  </div>
               </div>

               <div className={'space-y-6'}>
                  <h2 className='text-center text-3xl sm:text-5xl capitalize font-roboto'>
                     Unlimited access to 100+ instructors.
                  </h2>
                  <div className="flex items-center lg:justify-center space-x-2 lg:space-x-4 whitespace-nowrap overflow-x-auto scrollbar border-b">
                     <Tabs />
                  </div>
                  <div className="flex space-x-4">
                     {
                        palette.map((p, i) => (
                           <div key={i} className={`${p} w-full min-h-[100px] rounded-t-2xl md:rounded-t-3xl`}></div>
                        ))
                     }
                  </div>
               </div>

            </div>
         </main>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   /**
    * Predefined images are stored in public/quillex/... <Ex: hero-img-1.jpg>
    * Get all images that match this filename parameter
    */
   const filesList: Props['filesList'] = []
   const directory = path.join(process.cwd(), 'public/quillex')
   const filenames = fs.readdirSync(directory)

   filenames?.forEach(name => {
      const filePath = path.join(directory, name)
      if (filePath.match(/hero-image-[0-9]/i)) { //KISS!
         filesList.push(`/quillex/${name}`)
      }
   })

   return {
      props: { filesList },
   }
}

interface Box {
   src: `/quillex/${string}`
   title: string
   count: number
   active?: boolean
}
function Boxes(props: Props) {
   const [isDirty, setIsDirty] = useState(false)
   const [activeIndex, setActiveIndex] = useState(0)
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm/i)
   const indices = useRef(randomIndices(props.filesList.length))

   function handleInteraction(index: number) {
      if (index !== activeIndex) setActiveIndex(index)
      setIsDirty(true)
   }

   const boxes: Partial<Box>[] = [
      { count: 100, title: 'cooking' },
      { count: 135, title: 'writing' },
      { count: 46, title: 'design' },
      { count: 72, title: 'business' },
   ]

   const mappedBoxes = boxes
      .slice(0, isMobile ? 3 : boxes.length)
      .map((b, i) => {
         b.src = props.filesList[indices.current[i]]
         return b as Required<Box>
      })

   useInterval(() => {
      //Automatically cycle through boxes if there's been no user interaction.
      setActiveIndex(st => (st + 1) % mappedBoxes.length)
   }, isDirty ? null : 4000)

   useInterval(() => {
      //Restart cycling through boxes 5s after last user interaction.
      isDirty && setIsDirty(false)
   }, isDirty ? 5000 : null)

   return (
      <>
         {
            mappedBoxes.map((box, i) => {
               const active = activeIndex === i

               return (
                  <motion.div
                     key={box.title}
                     onMouseEnter={() => handleInteraction(i)}
                     onClick={() => handleInteraction(i)}
                     className={`
                        cursor-pointer rounded-2xl relative bg-gray-300 transition-all 
                        overflow-hidden transform min-h-[250px] md:min-h-[400px]
                        ${active ? 'flex-[3] rotate-0 shadow-2xl shadow-teal-800/40' : 'flex-1 -rotate-2'}
                     `}
                  >
                     {
                        box.src ?
                           <Image
                              layout='fill'
                              className='object-cover top-0 left-0'
                              src={box.src}
                              alt={'hero image for' + box.title}
                           /> : null
                     }
                     <div className={`relative h-[90%] lg:h-5/6 flex flex-col 
                        justify-end text-white font-roboto capitalize text-2xl md:text-4xl z-10
                     `}>
                        {
                           active ? (
                              <motion.div
                                 key={i}
                                 initial={{ opacity: 0, y: -25 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className={`flex space-x-4 justify-between px-2 md:px-8 ${i === 0 && 'lg:pl-24'}`}
                              >
                                 <h2>{box.title} course</h2>
                                 <div>
                                    <h1 className='md:text-5xl'>
                                       {box.count}
                                    </h1>
                                    <p className='text-xs md:text-lg'>topics</p>
                                 </div>
                              </motion.div>
                           )
                              : (
                                 <motion.div
                                    key={i + 1}
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="grid place-items-end bg-purple-800/80 min-h-[150px] w-4/5 px-1 md:px-4"
                                 >
                                    <h2 className='lg:text-5xl transform -rotate-90 origin-top-left stranslate-x-1/2 mds:translate-y-16'>
                                       {box.title}
                                    </h2>
                                 </motion.div>
                              )
                        }
                     </div>
                     <span className="absolute bottom-0 left-0 h-3/5 w-full bg-gradient-to-t from-gray-800 to-transparent"></span>
                  </motion.div>
               )
            })
         }
      </>
   )
}

function Logo() {
   return (
      <Link href='/'>
         <a className='text-2xl lg:text-4xl font-roboto font-bold text-gray-700 whitespace-nowrap'>
            Quillex<span className='text-green-600 ml-0.5'>.</span>
         </a>
      </Link>
   )
}

function Tabs() {
   const router = useRouter()
   const categories = ['all-categories', 'entertainment', 'lifestyle', 'writing', 'business', 'food', 'music', 'design', 'more']

   return (
      <>
         {
            categories.map(category => {
               const active = router.query.category === category
               return (
                  <button
                     key={category}
                     onClick={() => router.push(`/quillex?category=${category}`, undefined, { shallow: true })}
                     className={`
                        text-gray-700 capitalize p-4 hover:opacity-100
                        ${active ? 'border-b-4 border-gray-500' : 'opacity-70'}
                     `}
                  >{category.replace(/-/gi, " ")}</button>
               )
            })
         }
      </>
   )
}