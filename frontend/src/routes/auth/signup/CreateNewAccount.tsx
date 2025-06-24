import { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you're using shadcn/ui or your custom input
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "./CountrySelect";

import { countries } from "../utils";

export default function CreateNewAccount() {
  const [country, setCountry] = useState(countries[0]);

  const handleSubmit = (formData: FormData) => {
    // handle form data
    console.log(formData.get("email"));
    console.log(formData.get("phone"));
  };

  return (
    <form
      action={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="mb-2">
            First Name
          </Label>
          <Input id="firstName" name="firstName" placeholder="John" required />
        </div>
        <div>
          <Label htmlFor="lastName" className="mb-2">
            Last Name
          </Label>
          <Input id="lastName" name="lastName" placeholder="Doe" required />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone" className="mb-2">
          Mobile Number
        </Label>
        <div className="flex gap-2">
          <CountrySelect selected={country} onSelect={setCountry} />
          <Input
            id="phone"
            name="phone"
            placeholder="9876543210"
            required
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio" className="mb-2">
          About / Bio
        </Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell us a bit about the customer..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Create New Account
      </Button>
    </form>
  );
}
