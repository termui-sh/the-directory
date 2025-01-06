import TerminalItem from './TerminalItem'

const terminals = [
  {
    id: 1,
    name: 'DEC VT100',
    year: 1978,
    description: 'One of the most popular and influential computer terminals.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'IBM 3270',
    year: 1971,
    description: 'A class of block oriented computer terminals.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'ADM-3A',
    year: 1976,
    description: 'A popular video display terminal by Lear Siegler.',
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 4,
    name: 'Datapoint 3300',
    year: 1969,
    description: 'One of the earliest computer terminals with a CRT display.',
    image: '/placeholder.svg?height=100&width=100',
  },
]

export default function TerminalList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {terminals.map((terminal) => (
        <TerminalItem key={terminal.id} terminal={terminal} />
      ))}
    </div>
  )
}

