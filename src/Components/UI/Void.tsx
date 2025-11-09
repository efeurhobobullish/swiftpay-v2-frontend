import { FileText } from "lucide-react"

const Void = () => {
  return (
    <div className="bg-yellow-100 dark:bg-yellow-200 gap-4 p-4 rounded-lg center">
        <FileText size={20} className=" text-yellow-800" />
        <p className="text-yellow-800 font-medium">Pardon the void</p>
        
    </div>
  )
}

export default Void