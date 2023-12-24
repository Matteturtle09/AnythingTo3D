import { Button } from "@/components/ui/button"
import { MousePointer } from "lucide-react"

export default function Home() {
  return (

    <Button className="rounded-lg"><MousePointer/><p className="m-3">Click Me</p></Button>
  )
}
