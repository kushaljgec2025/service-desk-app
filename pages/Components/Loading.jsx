import React from "react";
import { Button } from "@/components/ui/button";

function Loading({ className }) {
  return (
    <div className={className}>
      <Button type="button">
        <svg
          className="animate-spin h-5 w-5 mr-3  rounded-full border-t-2 p-2 bg-gradient-to-bl from-white to-45% to-transparent"
          viewBox="0 0 24 2"
        ></svg>
        Loading..
      </Button>
    </div>
  );
}

export default Loading;
