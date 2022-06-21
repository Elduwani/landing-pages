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

export function randomIndices(count: number, minValue = 0): number[] {
   const map = new Map()
   const result: number[] = []

   for (let i = 0; i < count; i++) {
      const n = getRandomInt(minValue, count)

      if (map.has(n)) {
         i--
         continue
      }

      map.set(n, true)
      result.push(n)

   }

   return result
}

function getRandomInt(min: number, max: number) {
   min = Math.ceil(min);
   max = Math.floor(max);
   //The maximum is exclusive and the minimum is inclusive
   return Math.floor(Math.random() * (max - min) + min);
}