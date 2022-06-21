/**
 * UI designer: https://dribbble.com/halolab
 * Design reference: https://dribbble.com/shots/16358186-Web-site-landing-page
 */

import MobileMenu from '@components/MobileMenu'
import { randomIndices } from '@lib/index'
import { useScreenSize } from '@lib/hooks'
import styles from '@styles/quillex.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'

const attribution: Attribution = {
   name: 'Halo Lab',
   link: 'https://dribbble.com/shots/16358186-Web-site-landing-page',
   homepage: 'https://dribbble.com/halolab'
}

const links = ['all categories', 'pricing', 'for business', 'search']

interface Props {
   filesList: Box['src'][]
}
export default function Quillex(props: Props) {
   const screensize = useScreenSize()
   const isMobile = screensize.match(/xs|sm|md/i)

   const additional_menu = (
      <div className="space-y-8 capitalize mt-auto">
         <Link href="#">
            <a className='block'>log in</a>
         </Link>
         <button className="w-full max-w-[200px] rounded-full p-2 px-6 bg-gray-800 text-white capitalize">free trial</button>
      </div>
   )

   return (
      <div className='h-full overflow-hidden'>
         <Head>
            <title>Watch, Learn, Grow</title>
            <meta name="description" content="Generated by elduwani" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className={styles.main}>
            {
               isMobile ?
                  <MobileMenu
                     logo={<Logo />}
                     className="mb-8 py-8"
                     additional_menu={additional_menu}
                     links={links}
                  /> :
                  <header className='w-full max-w-7xl mx-auto h-24 bg-transparent flex items-center space-x-12 justify-between sticky top-0'>
                     <Logo />
                     <div className="flex items-center capitalize w-full whitespace-nowrap">
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

            <div className='relative flex-1 flex flex-col w-full max-w-7xl mx-auto md:px-20 lg:px-0 ring-green-300'>
               <div className="lg:grid grid-cols-3 min-h-[700px] mb-24">
                  <div className="md:pt-12 lg:pt-24">
                     <div className="space-y-2 mb-28">
                        <p className={styles.headline}>watch.</p>
                        <p className={styles.headline}>learn.</p>
                        <p className={styles.headline}>grow.</p>
                     </div>
                     <div className="mt-auto lg:w-[500px] z-10 relative">
                        <div className="w-full flex h-28 shadow-2xl shadow-slate-500/40">
                           <input
                              type='text'
                              className="pl-12 w-full placeholder:text-gray-500 placeholder:text-2xl text-2xl text-gray-700"
                              placeholder='Find Your Passion...'
                           />
                           <button className="w-[30%] text-4xl font-roboto bg-lime-500">Go</button>
                        </div>
                        {
                           //attribution
                           <Link href={attribution.link} rel="noreferrer">
                              <a className='text-3xl text-gray-700' target={"_blank"}>
                                 <span className='text-xs mt-3 text-gray-400'>UI Design by</span> <span className='text-sm'>{attribution.name}</span>
                              </a>
                           </Link>
                        }
                     </div>
                  </div>
                  <div className="col-span-2 flex space-x-10">
                     <Boxes filesList={props.filesList} />
                  </div>
               </div>

               <div className={styles.services}>
                  <div className="text-center">
                     <p className='uppercase tracking-wider font-bold text-lg text-gray-600'>category</p>
                     <h2 className='text-3xl sm:text-5xl capitalize font-roboto font-bold'>We offer best services</h2>
                  </div>
               </div>

            </div>
         </main>
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   /**
    * Predefined images are stored in public/quillex/... <Ex: img-1.jpg>
    * Get all images that match this filename parameter
    */
   const filesList: Props['filesList'] = []
   const directory = path.join(process.cwd(), 'public/quillex')
   const filenames = fs.readdirSync(directory)

   filenames?.forEach(name => {
      const filePath = path.join(directory, name)
      if (filePath.match(/img-[0-9].jpg/i)) { //KISS!
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
   const [activeIndex, setActiveIndex] = useState(0)
   const indices = useRef(randomIndices(props.filesList.length))

   const mappedBoxes = boxes.map((b, i) => {
      b.src = props.filesList[indices.current[i]]
      return b as Required<Box>
   })

   return (
      <>
         {
            mappedBoxes.map((box, i) => {
               const active = activeIndex === i

               return (
                  <div
                     key={box.title}
                     onMouseEnter={() => setActiveIndex(i)}
                     className={`
                        cursor-pointer rounded-2xl relative bg-gray-300 transition-all overflow-hidden
                        ${active ? 'flex-[3]' : 'flex-1'}
                     `}
                  >
                     <Image
                        layout='fill'
                        className='object-cover top-0 left-0'
                        src={box.src}
                     />
                     <div className="relative h-5/6 ring-inset flex flex-col justify-end text-white font-roboto capitalize text-4xl">
                        {
                           active ? (
                              <motion.div
                                 initial={{ opacity: 0, y: 25 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className={`px-12 flex space-x-4 ${i === 0 && 'pl-24'}`}
                              >
                                 <h2 className=''>{box.title}</h2>
                                 <div className="text-xl">
                                    <h1 className='uppercase text-5xl'>{box.count}</h1>
                                    <p>topics</p>
                                 </div>
                              </motion.div>
                           )
                              : (
                                 <motion.div
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-purple-800 min-h-[150px] w-4/5 p-4"
                                 >
                                    <h2 className='transform -rotate-90 origin-top-left translate-y-24'>{box.title}</h2>
                                 </motion.div>
                              )
                        }
                     </div>
                  </div>
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

const boxes: Partial<Box>[] = [
   {
      count: 100,
      title: 'cooking course',
   },
   {
      count: 135,
      title: 'writing',
   },
   {
      count: 72,
      title: 'business',
   },
]