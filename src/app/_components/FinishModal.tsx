import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  finishModal: boolean,
  setFinishModal: Dispatch<SetStateAction<boolean>>,
}

const FinishModal = ({ finishModal, setFinishModal }: Props) => {
  const router = useRouter()

  const HomeRedirect = () => {
    setFinishModal(false)
    router.push("/")
  }

  return (
    <Dialog open={finishModal} onOpenChange={setFinishModal}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Done</DialogTitle>
                <DialogDescription>
                    Want to practice more?
                </DialogDescription>
            </DialogHeader>
            <Button onClick={HomeRedirect}>Go back to HomePage</Button>
        </DialogContent>
    </Dialog>
  )
}

export default FinishModal