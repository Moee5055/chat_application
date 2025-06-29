import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

type ErrorProps = {
  errors?: {
    email?: string;
    password?: string;
    phone?: string;
  };
};

export default function MultipleLogin({ errors }: ErrorProps) {
  const [activeTab, setActiveTab] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Initialize state from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email") ?? "";
    const storedPhone = localStorage.getItem("phone") ?? "";
    setEmail(storedEmail);
    setPhone(storedPhone);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    if (value === "email") {
      localStorage.removeItem("phone");
      setPhone(""); // Clear phone state to trigger re-render
    } else if (value === "mobile_number") {
      localStorage.removeItem("email");
      setEmail(""); // Clear email state to trigger re-render
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-[400px]"
    >
      <TabsList className="mb-3">
        <TabsTrigger value="email" className="cursor-pointer">
          email
        </TabsTrigger>
        <TabsTrigger value="mobile_number" className="cursor-pointer">
          mobile number
        </TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              localStorage.setItem("email", e.target.value);
            }}
          />
          {errors?.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
      </TabsContent>
      <TabsContent value="mobile_number">
        <div className="grid gap-3">
          <Label htmlFor="phone">Mobile number</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              localStorage.setItem("phone", e.target.value);
            }}
          />
          {errors?.phone && (
            <span className="text-sm text-red-500">{errors.phone}</span>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
