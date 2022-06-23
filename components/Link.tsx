import Link from 'next/link'

interface Props {
   children: React.ReactNode
   href?: string
   external?: boolean
   className?: React.HTMLAttributes<HTMLAnchorElement>['className']
}
export default function CustomLink(props: Props) {
   const attrs = props.external ? { target: "_blank", rel: "noreferrer" } : {}
   return (
      <Link href={props.href ?? "#"}>
         <a {...attrs} className={props.className}>
            {props.children}
         </a>
      </Link>
   )
}
