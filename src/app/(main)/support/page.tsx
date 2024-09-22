"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { FormEvent } from "react";

const SupportPage = () => {
  return (
    <div className="w-[400px] mt-8 bg-primary/50 mx-auto min-h-[80vh] flex flex-col items-center justify-center rounded-lg p-4">
      <h1 className="text-lg font-semibold text-primary-foreground">
        If you have any problem, please share with us.
      </h1>
      <form
        className="w-full space-y-2 "
        onSubmit={(e: FormEvent) => e.preventDefault()}
      >
        <div>
          <Label htmlFor="name">Name: </Label>
          <Input placeholder="Ex: Jone Doe" id="name" />
        </div>
        <div>
          <Label htmlFor="email">Email: </Label>
          <Input placeholder="Ex: doe@test.com" id="email" />
        </div>
        <div>
          <Label htmlFor="message">Message: </Label>
          <Textarea
            placeholder="Ex: doe@test.com"
            id="email"
            // maxLength={500}
            rows={10}
          />
        </div>
        <div>
          <Button variant={"outline"} size={"sm"}>
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupportPage;
