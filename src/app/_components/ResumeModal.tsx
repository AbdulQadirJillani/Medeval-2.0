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
  resumeModal: boolean,
  setResumeModal: Dispatch<SetStateAction<boolean>>,
  resumeIndex: number,
  setIndex: Dispatch<SetStateAction<number>>
}

const ResumeModal = ({ resumeModal, setResumeModal, resumeIndex, setIndex }: Props) => {
  const Resume = () => {
    setResumeModal(false)
    setIndex(resumeIndex)
  }

  return (
    <Dialog open={resumeModal} onOpenChange={setResumeModal}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Resume from where you left off?</DialogTitle>
                <DialogDescription>
                    You left off at question number: {resumeIndex + 1}
                </DialogDescription>
            </DialogHeader>
            <Button onClick={Resume}>Resume</Button>
            <Button onClick={() => setResumeModal(false)}>Start from beginning</Button>
        </DialogContent>
    </Dialog>
  )
}

export default ResumeModal