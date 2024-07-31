import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Layout from "../Layout";
import Loading from "./Loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ShieldCheck } from "lucide-react";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const admin = localStorage.getItem("admin") === "true";
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const docRef = doc(db, "tickets", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTicket(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching ticket details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  return (
    <Layout>
      <div className="min-h-[80vh] ">
        {loading && (
          <Loading
            className={
              " absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            }
          />
        )}
        {ticket && (
          <div className="flex flex-col justify-center items-center min-h-[80vh]">
            <Card className="w-[40vw] min-w-[350px] shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-md">
                <CardTitle>Support Ticket </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">ID</div>
                  <div className="font-medium text-sm">{ticket.id}</div>
                </div>
                {admin && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      User Email
                    </div>
                    <div className="font-medium text-sm">{ticket.email}</div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Title</div>
                  <div className="font-medium text-sm">{ticket.title}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium">{ticket.category}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Priority</div>
                  <div
                    className={`${
                      ticket.priority === "High"
                        ? " text-red-500"
                        : ticket.priority === "Medium"
                        ? " text-yellow-500"
                        : " text-green-500"
                    }  rounded-full font-medium`}
                  >
                    {ticket.priority}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div
                    className={`font-medium ${
                      ticket.status ? "text-green-500" : "text-red-500/50"
                    }   `}
                  >
                    {ticket.status ? "Open" : "Closed"}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-start">
                  <div className="font-normal text-black text-xs">
                    {ticket.description}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-4 rounded-b-md">
                <Button
                  variant="outline"
                  className="flex justify-center items-center gap-4"
                >
                  <Pencil />
                  Edit
                </Button>
                {!admin ? (
                  <Button
                    variant="destructive"
                    className="flex justify-center items-center gap-4"
                  >
                    <Trash2 />
                    Delete
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="flex justify-center items-center gap-4"
                  >
                    <ShieldCheck />
                    Resolve
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TicketDetails;
