'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { ThumbsUp, ThumbsDown, PlusIcon } from 'lucide-react'

// type Idea = {
//     id: number
//     title: string
//     description: string
//     upvotes: number
//     downvotes: number
// }

export default function DiscussionsPage() {
    const [ideas, setIdeas] = useState([])
    const [newIdea, setNewIdea] = useState({ title: '', description: '' })
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddIdea = () => {
        if (newIdea.title && newIdea.description) {
            setIdeas([
                ...ideas,
                {
                    id: Date.now(),
                    title: newIdea.title,
                    description: newIdea.description,
                    upvotes: 0,
                    downvotes: 0
                }
            ])
            setNewIdea({ title: '', description: '' })
            setIsDialogOpen(false)
        }
    }

    const handleVote = (id, voteType) => {
        setIdeas(ideas.map(idea => {
            if (idea.id === id) {
                if (voteType === 'upvote') {
                    return { ...idea, upvotes: idea.upvotes + 1 }
                } else {
                    return { ...idea, downvotes: idea.downvotes + 1 }
                }
            }
            return idea
        }))
    }

    const calculatePercentage = (upvotes, downvotes) => {
        const total = upvotes + downvotes
        if (total === 0) return { upPercentage: 0, downPercentage: 0 }
        const upPercentage = Math.round((upvotes / total) * 100)
        return { upPercentage, downPercentage: 100 - upPercentage }
    }

    return (
        <div className="container mx-auto p-4 space-y-6 bg-white text-black min-h-screen w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Discussions</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-500 hover:bg-blue-400">
                            <PlusIcon className="mr-2 h-4 w-4" /> Post New Idea
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white text-black">
                        <DialogHeader>
                            <DialogTitle>Post a New Idea</DialogTitle>
                            <DialogDescription>
                                Share your idea with the community. Be clear and concise.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="title" className="text-right">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    value={newIdea.title}
                                    onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="description" className="text-right">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    value={newIdea.description}
                                    onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose className="bg-gray-200 hover:bg-gray-100 p-2 rounded-lg">
                                Cancel
                            </DialogClose>
                            <Button type="submit" onClick={handleAddIdea} className="bg-blue-500 hover:bg-blue-400">Post Idea</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {ideas.map((idea) => {
                    const { upPercentage, downPercentage } = calculatePercentage(idea.upvotes, idea.downvotes)
                    return (
                        <Card key={idea.id} className="w-full">
                            <CardHeader>
                                <CardTitle>{idea.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{idea.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleVote(idea.id, 'upvote')}
                                        className="flex items-center space-x-1"
                                    >
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{idea.upvotes}</span>
                                        <span className="text-muted-foreground">({upPercentage}%)</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleVote(idea.id, 'downvote')}
                                        className="flex items-center space-x-1"
                                    >
                                        <ThumbsDown className="h-4 w-4" />
                                        <span>{idea.downvotes}</span>
                                        <span className="text-muted-foreground">({downPercentage}%)</span>
                                    </Button>
                                </div>
                                <CardDescription>
                                    Total votes: {idea.upvotes + idea.downvotes}
                                </CardDescription>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}