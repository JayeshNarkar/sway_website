import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TextArea from "@/components/ui/textarea";

function SupportForm() {
  return (
    <div className="mx-8 md:flex md:flex-col gap-4 md:mx-2 lg:mx-40 xl:mx-60">
      <div className="md:flex md:gap-4">
        <Input
          type="text"
          placeholder="Name"
          className="mb-4 md:mb-0 md:flex-1 lg:flex-none lg:w-1/2"
        />
        <Input
          type="email"
          placeholder="Email"
          className="mb-4 md:mb-0 md:flex-1 lg:flex-none lg:w-1/2"
        />
      </div>
      <TextArea placeholder="Message" className="mb-4 lg:h-40 xl:h-48" />
      <Button className="w-full md:w-auto lg:w-1/3 xl:w-1/4 mx-auto">
        Submit
      </Button>
    </div>
  );
}

export default SupportForm;
