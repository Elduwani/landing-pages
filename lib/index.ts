
export function getFakeFaces(count: number): FakeFace[] {
   const url = 'https://fakeface.rest/thumb/view/'

   function randomCharacters() {
      return Array.from({ length: 15 },
         () => String.fromCharCode(getRandomInt(65, 122))
      ).join("")
   }

   const list: FakeFace[] = Array.from({ length: count }, () => {
      const gender = Math.random() > 0.5 ? 'male' : 'female'
      const image_url = url + `${randomCharacters()}?gender=${gender}`
      return {
         gender,
         image_url,
         source: url
      }
   })

   return list
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