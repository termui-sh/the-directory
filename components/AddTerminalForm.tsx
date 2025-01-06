'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Terminal } from '../utils/parseTerminalData'

interface AddTerminalFormProps {
  onAddTerminal: (terminal: Terminal) => void
}

export default function AddTerminalForm({ onAddTerminal }: AddTerminalFormProps) {
  const [formData, setFormData] = useState<Terminal>({
    name: '',
    type: '',
    connectivity: '',
    userInterface: '',
    operatingSystem: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTerminal(formData)
    setFormData({
      name: '',
      type: '',
      connectivity: '',
      userInterface: '',
      operatingSystem: '',
      description: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Terminal Name"
        required
      />
      <Input
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
        required
      />
      <Input
        name="connectivity"
        value={formData.connectivity}
        onChange={handleChange}
        placeholder="Connectivity"
        required
      />
      <Input
        name="userInterface"
        value={formData.userInterface}
        onChange={handleChange}
        placeholder="User Interface"
      />
      <Input
        name="operatingSystem"
        value={formData.operatingSystem}
        onChange={handleChange}
        placeholder="Operating System"
        required
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <Button type="submit">Add Terminal</Button>
    </form>
  )
}

