import Image from 'next/image'
import { notFound } from 'next/navigation'

import type { Media } from 'payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { ThumbsUpIcon } from 'lucide-react'

export default async function MovieDetails({ params }: { params: { slug: string } }) {
  const { slug } = params
  const payload = await getPayloadHMR({ config: configPromise })

  const movies = await payload.find({
    collection: 'movies',
    where: {
      slug: { equals: slug },
    },
  })

  if (movies.docs.length === 0) {
    return notFound()
  }

  const movie = movies.docs[0]

  return (
    <div className="flex gap-12 mt-5">
      <Image
        src={(movie.poster as Media)?.url ?? ''}
        alt={(movie.poster as Media)?.text ?? ''}
        width={(movie.poster as Media)?.width ?? 100}
        height={(movie.poster as Media)?.height ?? 100}
        className="w-1/3 rounded-3xl"
      />
      <div className="flex flex-col gap-2 w-2/3">
        <div className="flex justify-between items-center border-b-2 pb-2">
          <h1 className="font-bold text-4xl">{movie.name}</h1>
          <div className="flex gap-2 items-center">
            <ThumbsUpIcon />
            <div>{movie.votes}</div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          {movie.tagline && <h2 className="font-light text-3xl mb-3">{movie.tagline}</h2>}
          <p className="font-light mb-3">{movie.genres.map(({ name }) => name).join(', ')}</p>
        </div>

        <p className="italic">{movie.overview}</p>
      </div>
    </div>
  )
}
