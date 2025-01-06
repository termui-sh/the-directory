'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Suggestion {
  id: string
  terminalName: string
  content: string
  createdAt: string
}

export default function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
 const {toast}=useToast()
  useEffect(() => {
    // In a real application, this would fetch from your API
    const mockSuggestions: Suggestion[] = [
      {
        id: '1',
        terminalName: 'PuTTY',
        content: 'PuTTY now supports SSH-2 as well.',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        terminalName: 'iTerm2',
        content: 'iTerm2 has recently added support for graphics protocol.',
        createdAt: new Date().toISOString(),
      },
    ]
    setSuggestions(mockSuggestions)
  }, [])

  const handleApprove = (id: string) => {
    // In a real application, this would send an API request to approve the suggestion
    toast({
      title: "Suggestion approved",
      description: "The suggestion has been approved and the terminal entry updated.",
    })
    setSuggestions(suggestions.filter(s => s.id !== id))
  }

  const handleReject = (id: string) => {
    // In a real application, this would send an API request to reject the suggestion
    toast({
      title: "Suggestion rejected",
      description: "The suggestion has been rejected.",
    })
    setSuggestions(suggestions.filter(s => s.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Moderate Suggestions
      </h1>
      {suggestions.map(suggestion => (
        <Card key={suggestion.id} className="mb-4 bg-background/60 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle>{suggestion.terminalName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{suggestion.content}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Submitted on: {new Date(suggestion.createdAt).toLocaleString()}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button onClick={() => handleReject(suggestion.id)} variant="destructive">
              Reject
            </Button>
            <Button onClick={() => handleApprove(suggestion.id)}>
              Approve
            </Button>
          </CardFooter>
        </Card>
      ))}
      {suggestions.length === 0 && (
        <p className="text-center text-muted-foreground">No pending suggestions.</p>
      )}
    </div>
  )
}

