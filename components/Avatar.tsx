interface Props {
   className?: string
   size?: number
   src?: string
   children?: React.ReactNode
}
export default function Avatar(props: Props) {
   // const [face, setFace] = useState<FakeFace | undefined>()
   // const shouldFetch = !props.src && !props.children
   // const url = props.src ?? face?.image_url

   // useEffect(() => {
   //    if (shouldFetch) {
   //       const url = process.env.NODE_ENV === 'development' ?
   //          'https://fakeface.rest/face/json' :
   //          'https://fakeface.rest/thumb/view'
   //       axios.get(url)
   //          .then(res => setFace(res.data as FakeFace))
   //          .catch(e => console.log(e.message))
   //    }
   // }, [props.src])

   return (
      <div
         style={{
            width: props.size ?? 60,
            height: props.size ?? 60,
            backgroundImage: props.src ? `url("${props.src}")` : undefined
         }}
         className={`rounded-full flex-shrink-0
            grid place-content-center bg-no-repeat bg-cover bg-center ${props.className}
         `}>{props.children}</div>
   )
}