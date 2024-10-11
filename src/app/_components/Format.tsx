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

type clicked = {
  optionHx: { questionIndex: number, optionIndex: number }[]
}

function Format({ data }: { data: Props }) {
  const pathname = usePathname()
  const [index, setIndex] = useState<number>(0)
  const [clickedOption, setClickedOption] = useState<clicked>({ optionHx: [] })
  const hasPageBeenRenderedFirstTime = useRef<boolean>(false)
  const [resumeIndex, setResumeIndex] = useState<number>(0)
  const [resumeModal, setResumeModal] = useState<boolean>(false)
  const [finishModal, setFinishModal] = useState<boolean>(false)

  const totalQuestions = useMemo((): number => data.length, [data])

  // use Effect for showing resume modal on first render
  useEffect(() => {
    const storedIndex = localStorage.getItem(`${pathname}-index`)
    const storedHx = localStorage.getItem(`${pathname}-hx`)

    if (index < parseInt(storedIndex as string)) {
      if (parseInt(storedIndex as string) + 1 == totalQuestions) {
        localStorage.removeItem(storedIndex as string)
        localStorage.removeItem(storedHx as string)
      }
      else {
        setClickedOption(JSON.parse(storedHx as string))
        setResumeIndex(parseInt(storedIndex as string))
        setResumeModal(true)
      }
    }
    // eslint-disable-next-line
  }, [])

  // use Effect for setting index in local storage on each render (except first render) and setting clicked option in local storage on each render (except when both the index is zero and the storedHx is not empty)
  useEffect(() => {
    const storedHx = `${pathname}-hx`
    const storedIndex = `${pathname}-index`

    if (index == 0 && localStorage.getItem(storedHx) !== null) {
    }
    else {
      localStorage.setItem(storedHx, JSON.stringify(clickedOption))
    }

    if (hasPageBeenRenderedFirstTime.current) {
      localStorage.setItem(storedIndex, index.toString())
    }
    hasPageBeenRenderedFirstTime.current = true
  }, [index, clickedOption, pathname])
  
  // use Effect for keyboard navigation
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

      <Options options={data[index].answers} clickedOption={clickedOption} setClickedOption={setClickedOption} index={index}/>

      <Footer index={index} setIndex={setIndex} totalQuestions={totalQuestions} setFinishModal={setFinishModal}/>

    </div>

    <ResumeModal resumeModal={resumeModal} setResumeModal={setResumeModal} resumeIndex={resumeIndex} setClickedOption={setClickedOption} setIndex={setIndex}/>

    <FinishModal finishModal={finishModal} setFinishModal={setFinishModal}/>
    </>
  )
}

export default Format