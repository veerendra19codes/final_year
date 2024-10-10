'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Plus, Search, Edit, Trash2 } from "lucide-react"



export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newAnnouncement, setNewAnnouncement] = useState({ id: null, title: '', content: '' })
    const [isEditing, setIsEditing] = useState(false)

    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(Number(value))
        setCurrentPage(1)
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const handleAnnouncementChange = (event) => {
        setNewAnnouncement({ ...newAnnouncement, [event.target.name]: event.target.value })
    }

    const handleSubmitAnnouncement = (event) => {
        event.preventDefault()
        if (isEditing) {
            setAnnouncements(announcements.map(announcement =>
                announcement.id === newAnnouncement.id ? { ...announcement, ...newAnnouncement } : announcement
            ))
        } else {
            const newId = Math.max(...announcements.map(a => a.id)) + 1
            const currentDate = new Date().toISOString().split('T')[0]
            const announcementToAdd = {
                id: newId,
                title: newAnnouncement.title,
                content: newAnnouncement.content,
                date: currentDate
            }
            setAnnouncements([announcementToAdd, ...announcements])
        }
        resetAnnouncementForm()
    }

    const resetAnnouncementForm = () => {
        setNewAnnouncement({ id: null, title: '', content: '' })
        setIsDialogOpen(false)
        setIsEditing(false)
    }

    const handleEdit = (announcement) => {
        setNewAnnouncement(announcement)
        setIsEditing(true)
        setIsDialogOpen(true)
    }

    const handleDelete = (id) => {
        setAnnouncements(announcements.filter(announcement => announcement.id !== id))
    }

    useEffect(() => {
        // Generating announcements in useEffect ensures they are only generated on the client-side
        const generatedAnnouncements = Array(100).fill(null).map((_, i) => ({
            id: i + 1,
            title: `Announcement ${i + 1}`,
            content: `This is the content for announcement ${i + 1}. It contains important information.`,
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
        }))
        setAnnouncements(generatedAnnouncements)
    }, [])


    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold">Announcements</h1>
                <div className="flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full sm:w-64"
                    />
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => { setIsEditing(false); setNewAnnouncement({ id: null, title: '', content: '' }) }}>
                                <Plus className="mr-2 h-4 w-4" /> New Announcement
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{isEditing ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmitAnnouncement} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={newAnnouncement.title}
                                        onChange={handleAnnouncementChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={newAnnouncement.content}
                                        onChange={handleAnnouncementChange}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={resetAnnouncementForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">{isEditing ? 'Update' : 'Add'} Announcement</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="space-y-4">
                {currentAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>{announcement.title}</CardTitle>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon" onClick={() => handleEdit(announcement)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => handleDelete(announcement.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{announcement.content}</p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground">Date: {announcement.date}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span>Show</span>
                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                        </SelectContent>
                    </Select>
                    <span>per page</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}