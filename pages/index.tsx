import Avatar from '@components/Avatar'
import CustomLink from '@components/Link'
import styles from '@styles/home.module.scss'
import { VscGithubInverted, VscTwitter } from 'react-icons/vsc'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import attributions from '@lib/attributions'

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-neutral-900 min-h-screen">
      <Head>
        <title>Landing Pages</title>
        <meta name="description" content="Landing pages collection | Elduwani's #100daysofcode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-5xl mx-auto md:flex md:space-x-12 lg:space-x-36 text-white px-8">
        <div className="flex flex-col w-full max-w-md py-12 md:py-32 min-h-[600px] md:min-h-screen">
          <h1 className='text-6xl font-sans font-bold capitalize'>Landing pages</h1>
          <h2 className='text-xl text-neutral-400 uppercase tracking-widest my-4'>#100DaysOfCode</h2>
          <p className={styles.description}>
            This project is an open-source collection of statically generated, mobile responsive landing pages I&apos;m building with <CustomLink href='https://nextjs.org/' external>Nextjs</CustomLink> and <CustomLink href='https://tailwindcss.com/' external>Tailwind CSS</CustomLink>. 
            Some of the UI designs were created by other designers, and are used with attribution.
          </p>
          <p className={styles.description}>
            All source code available on <CustomLink href="https://github.com/Elduwani/landing-pages" external>GitHub</CustomLink>. This page is inspired by <CustomLink href={attributions['index'].link} external>{attributions['index'].name}</CustomLink>.
          </p>
          <div className="flex items-center space-x-8 mt-auto">
            <Avatar className='bg-neutral-400' src='/profile-image.jpg' />
            <p className="flex items-center space-x-3 md:space-x-4">
              <VscGithubInverted className='text-2xl'/>
              <CustomLink href="https://github.com/elduwani" external>GitHub</CustomLink>
            </p>
            <p className="flex items-center space-x-3 md:space-x-4">
              <VscTwitter className='text-2xl'/>
              <CustomLink href="https://twitter.com/elduwani" external>Twitter</CustomLink>
            </p>
          </div>
        </div>

        <div className='w-full py-12 md:py-32'>
          <div className={styles.projectsContainer}>
          {
            projects.map((project, i) => (
              <motion.div 
              key={project.url}
              initial={{y:-15}}
              animate={{y:0 }}
              whileHover={{scale: 1.1}}
              className="p-8 bg-neutral-800 hover:shadow-2xl hover:z-10"
              >
                <CustomLink external href={project.url} className="space-y-2 cursor-default">
                  <p className='uppercase tracking-wider text-sm text-neutral-600'>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h1 className='text-3xl capitalize '>
                    {project.label ?? project.id}
                  </h1>
                  <p className='text-neutral-400'>
                    {project.description}
                  </p>
                </CustomLink>
              </motion.div>
            ))
          }
          </div>
        </div>
      </main>
    </div>
  )
}

interface Project {
  id: keyof typeof attributions
  label?: string
  description: string
  url: string
  referenceUrl?: string
}
const projects: Project[] = [
  {
    id: 'jadoo',
    description: 'A travel destination landing page.',
    url: '/baloo'
  },
  {
    id: 'digitally',
    label: 'digitally',
    description: 'An NFT marketplace landing page.',
    url: '/digitally'
  },
  {
    id: 'skillex',
    description: 'A landing page for premium educational courses.',
    url: '/quillex'
  },
]