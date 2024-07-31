import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const storedUserId = useSelector((state) => state.auth.uid);
  const [userId, setUserId] = useState(storedUserId || "");

  useEffect(() => {
    if (!storedUserId) {
      const localStorageUserId = localStorage.getItem("userid");
      console.log("localStorageUserId", localStorageUserId);
      if (localStorageUserId) {
        setUserId(localStorageUserId);
      } else {
        // Handle the case where the user ID is not available in Redux state or local storage
        console.error("User ID not found in Redux state or local storage");
      }
    }
  }, [storedUserId]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userId) return;

      try {
        const docRef = query(
          collection(db, "tickets"),
          where("userid", "==", userId)
        );
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

    fetchTickets();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tickets", id));

      setTickets(tickets.filter((ticket) => ticket.id !== id));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      toast.error("Error deleting ticket: ", error);
      console.error("Error deleting ticket: ", error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/ticket-details/${id}`);
  };

  return (
    <Layout>
      <Toaster />
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <div className="my-4">
          <h1>User Dashboard</h1>
          <Button onClick={() => navigate("/raise-ticket")}>
            Create New Ticket
          </Button>
        </div>

        {loading && <Loading />}
        {!loading && tickets.length === 0 && <p>No tickets found</p>}
        {!loading && tickets.length > 0 && (
          <div className="flex flex-col justify-center items-center w-[100vw] ">
            <div className="flex flex-col justify-center items-center   w-[90vw] rounded-xl py-4 border shadow-md">
              <Table className=" ">
                <TableCaption>A list of your recent tickets</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Ticket ID</TableHead>
                    <TableHead className="text-center">Title</TableHead>
                    <TableHead className="text-center">Category</TableHead>
                    <TableHead className="text-center">Priority</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(ticket.id)}
                      className="cursor-pointer"
                    >
                      <TableCell>{index + 1}</TableCell>
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
                          {ticket.priority}
                        </span>
                      </TableCell>
                      <TableCell>{ticket.status ? "Open" : "Closed"}</TableCell>
                      <TableCell>
                        <Trash2
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(ticket.id);
                          }}
                        />
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

export default UserDashboard;
