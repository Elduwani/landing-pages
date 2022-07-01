interface Props {
   className?: string
   size?: number
   src?: string
   children?: React.ReactNode
}
export default function Avatar(props: Props) {
   return (
      <div
         style={{
            width: props.size ?? 60,
            height: props.size ?? 60,
            backgroundImage: props.src ? `url("${props.src}")` : undefined
            // backgroundImage: `url("https://fakeface.rest/thumb/view")`
         }}
         className={`rounded-full flex-shrink-0
            grid place-content-center bg-no-repeat bg-cover bg-center ${props.className}
         `}>{props.children}</div>
   )
}