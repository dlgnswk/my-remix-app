import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { AlignLeft, Download, Settings } from "lucide-react";
import { Header } from "~/components/Header";
import { TextareaWithButton } from "~/components/TextareaWithButton";
import { InnerSideBar } from "~/components/InnerSideBar";

export default function Playground() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex">
        <TextareaWithButton />
        <InnerSideBar />
      </div>
    </div>
  );
}
