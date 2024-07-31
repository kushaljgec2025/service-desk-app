import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Layout from "../Layout";
import Loading from "./Loading";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Parse the admin value from local storage to a boolean
  const admin = localStorage.getItem("admin") === "true";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);
  console.log(user);
  return (
    <Layout>
      <div className="min-h-[80vh]">
        {!user ? (
          <div>
            <Loading className="absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] " />
          </div>
        ) : (
          <Card className="mx-auto max-w-md p-6 grid gap-6 rounded-2xl shadow-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border shadow-md">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>{admin ? "Admin" : "User"}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 ">
                <div className="text-xl font-semibold">
                  {admin ? "Admin" : user.displayName || "User"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Email : {user.email}
                </div>
                <div className="text-sm text-muted-foreground">
                  User ID: {user.uid}
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid sm:grid-cols-2 gap-4 ">
              <div className="bg-muted rounded-lg p-4 flex flex-col gap-2 bg-green-200">
                <div className="text-sm font-medium">Closed Tickets</div>
                <div className="text-4xl font-semibold">84</div>
              </div>
              <div className="bg-gray-300 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm font-medium">Open Tickets</div>
                <div className="text-4xl font-semibold">12</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
              <Button variant="secondary" size="sm">
                Contact
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default Profile;
