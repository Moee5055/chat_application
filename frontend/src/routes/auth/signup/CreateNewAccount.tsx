import { useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input"; // Assuming you're using shadcn/ui or your custom input
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "./CountrySelect";

import { countries } from "../utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const email = localStorage.getItem("email") ?? "";
const backend_URL = import.meta.env.VITE_BACKEND_URL;

type UserAccount = {
  email: string;
  firstname: string;
  lastname: string;
  bio?: string;
  mobile_number: string;
};

export default function CreateNewAccount() {
  const [country, setCountry] = useState(countries[0]);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    const rawFormData: UserAccount = {
      email: formData.get("email"),
      firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
      bio: formData.get("bio") ?? "",
      mobile_number: formData.get("phone"),
      password: localStorage.getItem("password"),
    } as UserAccount;

    try {
      const user = await axios.post(`${backend_URL}/auth/sign-up`, rawFormData);
      if (!user) {
        throw new Error("Error creating User.");
      }
      localStorage.clear();
      navigate("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ENOTFOUND") {
          toast.error("Network error: Host not found");
          return;
        } else if (error.code === "ECONNREFUSED") {
          toast.error("Connection refused");
          return;
        } else if (error.code === "ECONNABORTED") {
          toast.error("Request timeout");
          return;
        } else if (error.code === "ERR_NETWORK") {
          toast.error(error.message);
          return;
        }
        const status = error.response?.status;
        if (status === 500) {
          toast.error("Server error. Please try again later.");
          return;
        } else {
          toast.error(error.response?.data?.error);
          return;
        }
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
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
          defaultValue={email}
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
