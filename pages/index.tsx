import Avatar from '@components/Avatar'
import CustomLink from '@components/Link'
import styles from '@styles/home.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-neutral-900 min-h-screen">
      <Head>
        <title>Inspired pages</title>
        <meta name="description" content="Landing pages collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-2 gap-4 min-h-screen text-white">
        <div className="flex flex-col w-full max-w-md py-12 ring-1 ring-neutral-800">
          <h1 className='text-6xl font-sans font-bold capitalize'>Landing pages</h1>
          <h2 className='text-3xl text-neutral-300 capitalize my-4'>some fancy dandy subtitle</h2>
          <p className={styles.description}>
            Project description perhaps on ye do no. It maids <CustomLink>Decay</CustomLink> as there he.
            Smallest on suitable disposed do although blessing he juvenile in.
            Society or if excited forbade <CustomLink>GitHib Repo</CustomLink>. Here name off yet she long sold easy whom.
            Differed oh cheerful procured pleasure securing suitable in. <CustomLink>Hold rich</CustomLink> on an he oh fine.
          </p>
          <div className="flex items-center space-x-8 mt-auto">
            <Avatar className='bg-neutral-400' src='/profile-image.jpg' />
            <div className="flex items-center space-x-4">
              <VscGithubInverted className='text-2xl'/>
              <CustomLink href="https://github.com/elduwani">Github</CustomLink>
            </div>
            <div className="flex items-center space-x-4">
              <VscGithubInverted className='text-2xl'/>
              <CustomLink href="https://github.com/elduwani">Github</CustomLink>
            </div>
          </div>
        </div>

        <div className="space-y-3 ring-1 ring-neutral-800">
          {
            projects.map(project => (
              <motion.div 
                key={project.url}
                initial={{opacity: 0, x:-15}}
                animate={{opacity: 1, x:0 }}
                whileHover={{scale: 1.1}}
                className="p-6 bg-neutral-800 hover:shadow-2xl hover:z-10 relative capitalize space-y-2"
                onClick={() => router.push(project.url)}
              >
                <p className='uppercase tracking-wider text-sm'>{project.url}</p>
                <h1 className='text-3xl'>{project.title}</h1>
                <p className='text-neutral-400'>{project.description}</p>
              </motion.div>
            ))
          }
        </div>
      </main>
    </div>
  )
}

interface Project {
  title: string
  description: string
  url: string
  referenceUrl?: string
}
const projects: Project[] = [
  {
    title: 'jadoo',
    description: 'inspired by artist',
    url: '/baloo'
  },
  {
    title: 'digitally NFT',
    description: 'inspired by artist',
    url: '/beast'
  },
  {
    title: 'skillex',
    description: 'inspired by artist',
    url: '/quillex'
  },
]