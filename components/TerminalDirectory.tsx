'use client'

import { useState, useMemo } from 'react'
import { Terminal } from '../utils/parseTerminalData'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TerminalIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface TerminalDirectoryProps {
  terminals: Terminal[]
}

export default function TerminalDirectory({ terminals }: TerminalDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [osFilter, setOsFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const uniqueOS = useMemo(() => {
    const osSet = new Set(terminals.map(t => t.operatingSystem))
    return Array.from(osSet).sort()
  }, [terminals])

  // const uniqueTypes = useMemo(() => {
  //   const typeSet = new Set(terminals.map(t => t.type))
  //   return Array.from(typeSet).sort()
  // }, [terminals])

  const filteredAndSortedTerminals = useMemo(() => {
    return terminals
      .filter(terminal => {
        const matchesSearch = 
          terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          terminal.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          terminal.connectivity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          terminal.userInterface.toLowerCase().includes(searchTerm.toLowerCase()) ||
          terminal.operatingSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
          terminal.description.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesOS = osFilter === 'all' || terminal.operatingSystem.includes(osFilter)
        const matchesType = typeFilter === 'all' || terminal.type.includes(typeFilter)

        return matchesSearch && matchesOS && matchesType
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name)
        } else if (sortBy === 'os') {
          return a.operatingSystem.localeCompare(b.operatingSystem)
        }
        return 0
      })
  }, [terminals, searchTerm, osFilter, typeFilter, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          ls -a ~/.terminals
        </h1>
        <p className="text-muted-foreground mb-8">
          A comprehensive collection of {terminals.length} terminal emulators and applications
        </p>
        
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search terminals by name, connectivity, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background/60 backdrop-blur border-border/40"
            />
            <div className="absolute right-4 top-3 text-muted-foreground">
              <TerminalIcon size={20} />
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Select value={osFilter} onValueChange={setOsFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Operating Systems</SelectItem>
                {uniqueOS.map(os => (
                  <SelectItem key={os} value={os}>{os}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="os">Sort by OS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTerminals.map((terminal, index) => (
          <Card key={index} className="bg-background/60 backdrop-blur border-border/40 hover:border-green-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{terminal.name}</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div>
                <span className="text-sm font-medium text-muted-foreground">Type:</span>
                <p className="text-sm">{terminal.type}</p>
              </div> */}
              <div>
                <span className="text-sm font-medium text-muted-foreground">Connectivity:</span>
                <p className="text-sm">{terminal.connectivity}</p>
              </div>
              {terminal.userInterface && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">User Interface:</span>
                  <p className="text-sm">{terminal.userInterface}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-muted-foreground">OS:</span>
                <p className="text-sm">{terminal.operatingSystem}</p>
              </div>
              {terminal.description && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Description:</span>
                  <p className="text-sm line-clamp-2">{terminal.description}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {/* <Link href={`/terminal/${encodeURIComponent(terminal.name.toLowerCase())}`} className="w-full">
                <Button variant="outline" className="w-full">
                  <Edit3Icon className="mr-2 h-4 w-4" />
                  Suggest Improvements
                </Button>
              </Link> */}
              <Link href={`https://duckduckgo.com/?q=`+terminal.name} className="w-full">
                <Button variant="outline" className="w-full">
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </Link> 
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8 text-muted-foreground">
        Showing {filteredAndSortedTerminals.length} of {terminals.length} terminals
      </div>
    </div>
  )
}

