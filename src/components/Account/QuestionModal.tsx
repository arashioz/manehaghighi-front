import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Exam } from "@/types";
import { categories } from "@/utils/questions";

export default function QuestionModal({
  data,
  label,
}: {
  data: Exam;
  label: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right">{label}</DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {categories.map((category) => (
                  <th
                    key={category}
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {category}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                {data.scores.map((score, index) => (
                  <td
                    key={index}
                    className="p-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {score}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
