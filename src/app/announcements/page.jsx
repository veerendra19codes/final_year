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
import { useSession } from 'next-auth/react'
import Link from 'next/link'



export default function AnnouncementsPage() {
    const session = useSession();
    console.log("session: ", session);

    const [announcements, setAnnouncements] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState({});
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', secretary: "", society: "", societyId: "" })

    const filteredAnnouncements = announcements?.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentAnnouncements = filteredAnnouncements?.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredAnnouncements?.length / itemsPerPage)

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
        setNewAnnouncement({
            ...newAnnouncement, [event.target.name]: event.target.value,
            secretary: user?.name, society: user?.society, societyId: user?.societyId
        })
    }

    useEffect(() => {
        const fetchUserById = async () => {
            try {

                const res = await fetch("/api/getuserbyid", {
                    method: "POST",
                    body: JSON.stringify({ id: session.data.user.id }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                // console.log('res', res);
                const data = await res.json();
                // console.log("data: ", data);
                setUser(data.user);

            } catch (error) {
                console.log("error in fetching user by id: ", error);
            }
        }
        { session?.data?.user?.id && fetchUserById() }
    }, [session?.data?.user?.id]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const societyId = user?.societyId;
                console.log("societId: ", societyId);
                const res = await fetch(`/api/announcements/${societyId}`, {
                    method: "GET",
                })
                console.log('res', res);
                const data = await res.json();
                console.log("data: ", data);
                setAnnouncements(data.data);

            } catch (error) {
                console.log("error in fetching user by id: ", error);
            }
        }
        { session?.data?.user?.id && user && fetchAnnouncements() }
    }, [session?.data?.user?.id, user?.societyId, user]);

    const handleSubmitAnnouncement = async (event) => {
        event.preventDefault()
        if (isEditing) {
            setAnnouncements(announcements.map(announcement =>
                announcement.id === newAnnouncement.id ? { ...announcement, ...newAnnouncement } : announcement
            ))
        } else {
            // new announcement
            try {
                console.log("new announcement: ", newAnnouncement);
                const res = await fetch("/api/announcements", {
                    method: "POST",
                    body: JSON.stringify(newAnnouncement),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log("res: ", res);
                const data = await res.json();
                console.log("data: ", data);

            } catch (error) {
                console.log("error in adding an announcement: ", error);
            }
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



    function formatDate(timestamp) {
        const date = new Date(timestamp);

        // Extract hours, minutes, day, month, and year
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();

        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hour is 0, set it to 12 (midnight case)
        const formattedHours = hours.toString().padStart(2, '0');

        return `${formattedHours}:${minutes} ${ampm} ${day}/${month}/${year}`;
    }


    return (
        <>
            {(session.data?.user && user) ?
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
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className="bg-white">
                                <DialogTrigger asChild>
                                    <Button onClick={() => { setIsEditing(false); setNewAnnouncement({ id: null, title: '', content: '' }) }}>
                                        <Plus className="mr-2 h-4 w-4" /> New Announcement
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle>{isEditing ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmitAnnouncement} className="space-y-4 bg-white">
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
                        {currentAnnouncements?.map((announcement) => (
                            <Card key={announcement.id} className="w-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
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
                                    <p className="text-sm text-muted-foreground">Date: {formatDate(announcement.date)}</p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="flex flex-col bg-white sm:flex-row justify-between items-center gap-4">
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
                :
                <div className="border-[1px] border-red-500 rounded-xl mt-16 p-4 text-start">
                    You need to login before listing your society
                    <br>
                    </br>
                    <Link href={"/login"} className="text-blue-500 hover:text-blue-300 underline">
                        Click here to login
                    </Link>
                </div>
            }
        </>
    )
}