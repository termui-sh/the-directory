'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface SuggestionFormProps {
  terminalName: string
}

export default function SuggestionForm({ terminalName }: SuggestionFormProps) {
  const [suggestion, setSuggestion] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real-world scenario, you would send this data to your backend
    // For now, we'll just simulate the process
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast({
      title: "Suggestion submitted",
      description: "Thank you for your contribution!",
    })

    setSuggestion('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        placeholder={`Suggest improvements for ${terminalName}...`}
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={!suggestion.trim()}>
        Submit Suggestion
      </Button>
    </form>
  )
}

