import Image from 'next/image'

interface Terminal {
  id: number
  name: string
  year: number
  description: string
  image: string
}

export default function TerminalItem({ terminal }: { terminal: Terminal }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <Image
        src={terminal.image}
        alt={terminal.name}
        width={100}
        height={100}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{terminal.name}</h3>
        <p className="text-gray-400 mb-2">Year: {terminal.year}</p>
        <p className="text-gray-300">{terminal.description}</p>
      </div>
    </div>
  )
}

