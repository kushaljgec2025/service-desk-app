import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import uuid from "react-uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "../Layout";
import { getAuth } from "firebase/auth";

const TicketForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("General");
  const user = getAuth().currentUser;
  // console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title == "" || description == "") {
        toast.error("Please fill in all fields");
        return;
      }
      const randomid = uuid();
      await setDoc(doc(db, "tickets", randomid), {
        id: randomid,
        userid: user.uid,
        email: user.email,
        title,
        category,
        priority,
        description,
        status: true,
        createdAt: new Date(),
      });
      // console.log(title, description, priority, category);
      setTitle("");
      setDescription("");
      setPriority("");
      setCategory("");
      toast.success("Ticket created successfully!");
    } catch (error) {
      console.error("Error creating ticket", error);
      toast.error("Error creating ticket");
    }
  };

  return (
    <Layout>
      <Toaster />
      <Card className="min-w-[350px] w-[40vw] my-4">
        <CardHeader>
          <CardTitle>Raise Your Ticket</CardTitle>
          <CardDescription>We are Here to Solve your problem</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Title" className="text-left mb-2">
                  Title
                </Label>
                <Input
                  id="Title"
                  placeholder="Write Your Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Category" className="text-left mb-2">
                  Category
                </Label>
                <Select
                  onValueChange={(e) => setCategory(e)}
                  defaultValue={category}
                >
                  <SelectTrigger id="Category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Biling">Biling</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Priority" className="text-left mb-2">
                  Priority
                </Label>
                <Select
                  onValueChange={(e) => setPriority(e)}
                  defaultValue={priority}
                >
                  <SelectTrigger id="Priority">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Description" className="text-left mb-2">
                  Description
                </Label>
                <Textarea
                  placeholder="Type your issue here."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex justify-center mt-4">
              <Button type="submit">Raise Ticket</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TicketForm;
