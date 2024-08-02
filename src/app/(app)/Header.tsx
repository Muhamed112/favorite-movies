import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FilmIcon, PlusCircleIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex justify-between py-5 px-5 bg-slate-900 text-white rounded-b-xl items-center">
      <div className="flex items-center gap-2">
        <FilmIcon />
        <Link href="/" className="text-xl font-bold">
          <h1>Our Favorite Movies</h1>
        </Link>
      </div>

      <Link href="/add" className="text-xl font-light" passHref>
        <Button className="flex gap-2">
          <PlusCircleIcon />
          Add A Movie
        </Button>
      </Link>
    </header>
  )
}
