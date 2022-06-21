import axios from 'axios'
import fakeFaces from './fakeFaces'

export async function getFakeFaces(count: number): Promise<FakeFace[]> {
   const url = process.env.NODE_ENV === 'development' ? 'https://fakeface.rest/face/json' : 'https://fakeface.rest/thumb/view'
   const arr: FakeFace[] = new Array(count)

   try {
      for (let i = 0; i < arr.length; i++) {
         const data = await axios.get(url)
         arr[i] = data.data
         console.log('DONE', i);
      }
   } catch (e: any) {
      //Don't return undefined
      console.log(e.message)
      const faces = Array.from({ length: count }, () => {
         const i = Math.round(Math.random() * count)
         return fakeFaces[i]
      })

      return faces
   }


   return arr
}

export function randomIndices(count: number, ignore?: (n: number) => boolean): number[] {
   const map = new Map()
   const result = [1, 2, 3]

   // while (result.length < count) {
   //    const n = Math.floor(Math.random() * count)
   //    if (map.has(n) || ignore?.(n)) {
   //       console.log("Skipping...")
   //       continue
   //    }
   //    map.set(n, true)
   //    result.push(n)
   // }

   return result
}