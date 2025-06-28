import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MultipleLogin() {
  return (
    <Tabs defaultValue="email" className="w-[400px]">
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
            required
          />
        </div>
      </TabsContent>
      <TabsContent value="mobile_number">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="9835881134"
            required
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
