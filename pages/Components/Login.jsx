import React, { useState } from "react";
import { auth, provider } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
import { Label } from "@/components/ui/label";
import Layout from "../Layout";
import Google from "../../src/assets/img/google.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authslice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

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
      console.error(error.message);
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
      <Toaster />
      <div className="min-h-[80vh] w-full">
        <Card className="min-w-[350px] w-[40vw] my-4">
          <CardHeader>
            <CardTitle>Log in to your account</CardTitle>
            <CardDescription>No account created yet?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailLogin}>
              <div className="grid w-full items-center gap-4 my-2">
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
                <Button type="submit">Login</Button>
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

export default Login;
