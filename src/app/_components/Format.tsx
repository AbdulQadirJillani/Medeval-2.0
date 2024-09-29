"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import Header from "./Header"
import Question from "./Question"
import HintDifficulty from "./HintDifficulty"
import Options from "./Options"
import Footer from "./Footer"
import ResumeModal from "./ResumeModal"
import FinishModal from "./FinishModal"

type Props = {
  id: number,
  info: string|string[],
  question: string,
  difficulty?: number,
  hint?: string,
  answers: { option: string, explanation?: string, bool: boolean }[]
}[]

function Format({ data }: { data: Props }) {
  const pathname = usePathname()
  const [index, setIndex] = useState<number>(0)
  const hasPageBeenRenderedFirstTime = useRef<boolean>(false)
  const [resumeIndex, setResumeIndex] = useState<number>(0)
  const [resumeModal, setResumeModal] = useState<boolean>(false)
  const [finishModal, setFinishModal] = useState<boolean>(false)

  const totalQuestions = useMemo((): number => data.length, [data])

  useEffect(() => {
    const storedIndex = localStorage.getItem(pathname)
    if (storedIndex != null) {
      if (index < parseInt(storedIndex)) {
        if (parseInt(storedIndex) + 1 == totalQuestions) {
          localStorage.removeItem(storedIndex)
        }
        else {
          setResumeIndex(parseInt(storedIndex))
          setResumeModal(true)
        }
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (hasPageBeenRenderedFirstTime.current) {
      localStorage.setItem(pathname, index.toString())
      console.log('yes')
    } else {console.log('no')}
    hasPageBeenRenderedFirstTime.current = true
  }, [index, pathname])
  
  useEffect(() => {
    function navigate(e: KeyboardEvent) {
      if (e.key==='ArrowRight' && index + 1 < totalQuestions) setIndex(prev => prev + 1)
      else if (e.key==='ArrowLeft' && index > 0) setIndex(prev => prev - 1)
    }

    document.addEventListener('keydown', navigate)
    return () => document.removeEventListener('keydown', navigate)
  }, [index, totalQuestions, pathname])

  return (
    <>
    <div className="w-[80%] my-6 mx-auto">

      <Header questionOrigin={data[index].info} questionID={index + 1} totalQuestions={totalQuestions}/>

      <Question question={data[index].question}/>

      {
        data[index].hint && data[index].difficulty &&
        <HintDifficulty hint={data[index].hint} difficulty={data[index].difficulty}/>
      }

      <Options options={data[index].answers} index={index}/>

      <Footer index={index} setIndex={setIndex} totalQuestions={totalQuestions} setFinishModal={setFinishModal}/>

    </div>

    <ResumeModal resumeModal={resumeModal} setResumeModal={setResumeModal} resumeIndex={resumeIndex} setIndex={setIndex}/>

    <FinishModal finishModal={finishModal} setFinishModal={setFinishModal}/>
    </>
  )
}

export default Format