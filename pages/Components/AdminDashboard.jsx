import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { Trash2, ShieldCheck } from "lucide-react";

import uuid from "react-uuid";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const docRef = collection(db, "tickets");
        const docSnap = await getDocs(docRef);
        const allTickets = docSnap.docs.map((doc) => doc.data());
        console.log("Fetched tickets:", allTickets);

        setTickets(allTickets);
        toast.success("Tickets fetched successfully");
      } catch (error) {
        toast.error("Error fetching tickets: ", error);
        console.error("Error fetching tickets: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, []); // Ensure useEffect only runs once by providing an empty dependency array
  const handelresolve = async (id) => {
    const docRef = doc(db, "tickets", id);
    await updateDoc(docRef, {
      status: false,
    });

    toast.success("Ticket resolved successfully");
  };

  function formatdate(timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

    // Create a Date object using the milliseconds
    const date = new Date(milliseconds);

    // Format the date to a readable string
    const formattedDate = date.toLocaleString();

    return formattedDate;
  }
  const handleRowClick = (id) => {
    navigate(`/ticket-details/${id}`);
  };
  // console.log(tickets[0].createdAt);

  return (
    <Layout>
      <Toaster />
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <div className="my-4">
          <h1 className="text-wrap">Admin Dashboard</h1>
        </div>
        {loading && <Loading />}
        {!loading && tickets.length === 0 && <p>No tickets found</p>}
        {!loading && tickets.length > 0 && (
          <div className="flex flex-col justify-center items-center w-[100vw] ">
            <div className="flex flex-col justify-center items-center   w-[90vw] py-4 rounded-xl shadow-lg">
              <Table className=" ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Ticket ID</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Title</TableHead>
                    <TableHead className="text-center">Category</TableHead>
                    <TableHead className="text-center">Priority</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Resolve</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(ticket.id)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatdate(ticket?.createdAt)}</TableCell>
                      <TableCell>{ticket.email}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>
                        <span
                          className={`${
                            ticket.priority === "High"
                              ? "bg-red-200 text-red-500"
                              : ticket.priority === "Medium"
                              ? "bg-yellow-200 text-yellow-500"
                              : "bg-green-200 text-green-500"
                          } px-4 py-1 rounded-full font-medium`}
                        >
                          {" "}
                          {ticket.priority}
                        </span>
                      </TableCell>

                      <TableCell
                        className={`${
                          ticket.status
                            ? "text-green-500 font-bold"
                            : "text-red-500/50"
                        }`}
                      >
                        {ticket.status ? "Open" : "Closed"}
                      </TableCell>
                      <TableCell
                        className={`flex justify-center  ${
                          ticket.status
                            ? "text-green-500 font-bold"
                            : "text-gray-500/50"
                        } `}
                      >
                        <Button
                          variant="primary"
                          disabled={!ticket.status}
                          onClick={() => handelresolve(ticket.id)}
                        >
                          <ShieldCheck className="hover:cursor-pointer hover:text-green-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
