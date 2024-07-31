import React from "react";
import Layout from "./Layout";
import { Button } from "@/components/ui/button";
import Landing_img from "../src/assets/img/Landing.png";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div className="relative bg-white w-full  min-h-[80vh]">
          <img
            src={Landing_img}
            alt="Landing_img"
            className="landing_img w-full   object-cover"
          />

          <div className=" absolute  md:inset-32 flex flex-col gap-4 bg-white/65  backdrop-blur-md rounded-3xl p-4 border-[1px] shadow-xl border-white">
            <h1 className="text-wrap">Welcome to the ServiceTicket</h1>
            <p className="">
              At our ServiceTicket, we're committed to providing you with
              efficient and reliable support. Whether you're facing technical
              issues, have billing inquiries, or need assistance with any other
              concern, we're here to help.
            </p>

            <Button
              onClick={() => {
                navigate("/login");
              }}
              className="m-auto"
            >
              Get Started →
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Landing;
