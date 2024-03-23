import Layout from "@/components/layout/index";
import { Trash, NotepadText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Projects = () => {
  return (
    <Layout tab="projects">
      <div className="w-full flex flex-col items-center">
        <div className="w-2/3 p-8 space-y-8 flex items-center flex-col">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl">List of projects</h1>
            <h3 className="text-gray-600 text-md">
              Smart meeting tool: Transcription, summaries, and instant AI
              responses.
            </h3>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20px]">#</TableHead>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[120px] text-right">
                  Created At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ProjectRow />
              <ProjectRow />
              <ProjectRow />
              <ProjectRow />
              <ProjectRow />
              <ProjectRow />
            </TableBody>
            <TableCaption>Click on a meet to open details</TableCaption>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

const ProjectRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Input type="checkbox" className="w-[15px] m-0 p-0" />
      </TableCell>
      <TableCell>My teste video title</TableCell>
      <TableCell>#Video #Reunião #Projeto</TableCell>
      <TableCell className="text-right">12/31/1997</TableCell>
    </TableRow>
  );
};

export default Projects;
