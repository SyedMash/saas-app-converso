import Box from "@/components/Box";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

const page = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  console.log(companions);

  return (
    <div className="bg-gray-50 min-h-dvh w-dvw">
      <div className="custom-width overflow-hidden">
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between py-2">
          <h1>Companion Library</h1>
          <div className="flex items-center gap-6 md:gap-6 mt-4 md:mt-0">
            <Input
              placeholder="Search your companion"
              className="placeholder:text-sm input"
            />
            <Select>
              <SelectTrigger className="input">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem
                    key={subject}
                    value={subject}
                    className="capitalize"
                  >
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {companions.map((companion: Companion) => (
            <Box
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)!}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
