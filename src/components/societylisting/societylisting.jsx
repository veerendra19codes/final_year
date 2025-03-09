"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CldImage } from "next-cloudinary";
import Image from "next/image"
import { useEffect, useState } from "react"


export default function SocietyListings() {
    const [socs, setSocs] = useState([]);

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const res = await fetch("/api/getallsocieties");
                console.log("res: ", res);
                const data = await res.json();
                console.log("data: ", data);
                setSocs(data.socs);
            } catch (error) {

                console.log("error in fetching societies: ", error);
            }
        }
        fetchSocieties();
    }, [])
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socs?.map((soc) => (
                    <Card key={soc.id} className="flex flex-col">
                        <CardHeader>
                            <CldImage
                                width="960"
                                height="600"
                                src={soc.image_public_id}
                                sizes="100vw"
                                alt="image"
                            />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardTitle className="mb-2">{soc.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mb-2">{soc.address}</p>
                            <p className="text-sm">
                                <span className="font-semibold">Secretary:</span> {soc.secretary}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">View Details</Button>
                            <Button>Join</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}