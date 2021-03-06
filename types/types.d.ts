type ArrayMember<ArrayType extends readonly unknown[]> =
   ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

interface FakeFace {
   gender: string
   image_url: string
   source: string
}

interface _Route {
   label: string,
   path?: string,
   icon?: IconType
   onClick?: () => void
}

interface Attribution {
   name: string
   link: `https://${string}`
   homepage?: `https://${string}`
}