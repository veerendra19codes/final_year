'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, ClockIcon, PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Mock data for events
const initialEvents = Array(100).fill(null).map((_, i) => ({
    id: i + 1,
    title: `Event ${i + 1}`,
    description: `This is the description for Event ${i + 1}. It includes details about the event.`,
    image: "/hero2.jpeg",
    fromTime: new Date(2023, 0, 1, 10, 0).toISOString(),
    toTime: new Date(2023, 0, 1, 12, 0).toISOString(),
    listedAt: new Date(2022, 11, 31, 9, 0).toISOString(),
}))

export default function EventsPage() {
    const session = useSession();
    const [events, setEvents] = useState(initialEvents)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        image: '',
        fromTime: '',
        toTime: '',
        society: "",
        societyId: "",
    })
    const [user, setUser] = useState({});

    const filteredEvents = events?.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredEvents?.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentEvents = filteredEvents?.slice(startIndex, endIndex)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
    }

    const handleAddEvent = async () => {
        // const eventToAdd = {
        //     ...newEvent,
        //     id: events.length + 1,
        //     listedAt: new Date().toISOString(),
        // }
        // setEvents([eventToAdd, ...events])
        // setIsDialogOpen(false)
        // setNewEvent({
        //     title: '',
        //     description: '',
        //     image: '',
        //     fromTime: '',
        //     toTime: '',
        // })
        try {
            setNewEvent({ ...newEvent, society: user.society, societyId: user.society })
            console.log("new event: ", newEvent);

            const res = await fetch("/api/events", {
                method: "POST",
                body: JSON.stringify(newEvent),
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

    const handleEditEvent = (id) => {
        // Implement edit functionality here
        console.log('Edit event', id)
    }

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id))
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


    return (
        <div className="bg-white text-black min-h-screen w-full">
            {(session.data?.user && user) ?
                <div className="container mx-auto p-4 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        {user?.role == "secretary" &&
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-500 hover:bg-blue-400">
                                        <PlusIcon className="mr-2 h-4 w-4" /> Add New Event
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                                    <DialogHeader>
                                        <DialogTitle>Add New Event</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details for the new event. Click save when you&apos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="title" className="text-right">
                                                Title
                                            </label>
                                            <Input
                                                id="title"
                                                value={newEvent.title}
                                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="description" className="text-right">
                                                Description
                                            </label>
                                            <Textarea
                                                id="description"
                                                value={newEvent.description}
                                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="image" className="text-right">
                                                Image URL
                                            </label>
                                            <Input
                                                id="image"
                                                value={newEvent.image}
                                                onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="fromTime" className="text-right">
                                                From
                                            </label>
                                            <Input
                                                id="fromTime"
                                                type="datetime-local"
                                                value={newEvent.fromTime}
                                                onChange={(e) => setNewEvent({ ...newEvent, fromTime: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="toTime" className="text-right">
                                                To
                                            </label>
                                            <Input
                                                id="toTime"
                                                type="datetime-local"
                                                value={newEvent.toTime}
                                                onChange={(e) => setNewEvent({ ...newEvent, toTime: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose className="bg-gray-200 hover:bg-gray-100 text-black p-2 rounded-lg">Cancel</DialogClose>
                                        <Button type="submit" onClick={handleAddEvent} className="bg-blue-500 hover:bg-blue-400">Save event</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        }
                    </div>

                    <div className="space-y-4">
                        {currentEvents.map((event) => (
                            <Card key={event.id} className="w-full overflow-hidden">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="w-full sm:w-1/3">
                                        <Image src={event.image} alt={event.title} width={100} height={100} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-full sm:w-2/3 p-6">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>{event.title}</CardTitle>
                                                    <CardDescription>
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {formatDate(event.fromTime)} - {formatDate(event.toTime)}
                                                        </div>
                                                    </CardDescription>
                                                </div>
                                                {session?.data?.user?.role == "secretary" &&
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="icon" onClick={() => handleEditEvent(event.id)}>
                                                            <EditIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{event.description}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <p className="text-sm text-muted-foreground">
                                                <ClockIcon className="inline mr-2 h-4 w-4" />
                                                Listed at: {formatDate(event.listedAt)}
                                            </p>
                                        </CardFooter>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Rows per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10 rows</SelectItem>
                                <SelectItem value="20">20 rows</SelectItem>
                                <SelectItem value="30">30 rows</SelectItem>
                            </SelectContent>
                        </Select>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
                                {currentPage + 2 < totalPages && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
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
        </div>
    )
}