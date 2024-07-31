import React, { useState } from "react";
import { auth, provider } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { login } from "../../redux/authslice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "../Layout";
import Google from "../../src/assets/img/google.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password, username);
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // Dispatch user details to Redux store
      dispatch(
        login({ userdetails: user.user.providerData[0], userid: user.user.uid })
      );

      // Store user details in local storage
      localStorage.setItem(
        "userdetails",
        JSON.stringify(user.user.providerData[0])
      );
      localStorage.setItem("userid", user.user.uid);
      localStorage.setItem("admin", false);

      navigate("/user-dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error("Error registering user", error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Dispatch user details to Redux store
      dispatch(login({ userdetails: user.providerData[0], userid: user.uid }));

      // Store user details in local storage
      localStorage.setItem("userdetails", JSON.stringify(user.providerData[0]));
      localStorage.setItem("userid", user.uid);
      localStorage.setItem("admin", false);
      navigate("/user-dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error("Error logging in with Google", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] w-full">
        <Card className="min-w-[350px] w-[40vw] my-4">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Already have an account?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 my-2">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="username" className="text-left">
                    Username
                  </Label>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email" className="text-left">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password" className="text-left">
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <CardFooter className="flex justify-center">
                <Button type="submit">Signup</Button>
              </CardFooter>
              <span>Or</span>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-full space-x-2"
                  onClick={handleGoogleLogin}
                >
                  <span>Sign in with Google</span>
                  <img src={Google} alt="Google" width={24} />
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
