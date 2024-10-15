"use client"

import { useEffect, useState } from "react"
import Progress from "../_components/Progress"

type performance = {
  performance: {
    dateTime: string,
    questionOrigin: string,
    score: number,
    totalQuestions: number
  }[]
}

function page() {
  // eslint-disable-next-line
  const [performance, setPerformance] = useState<performance>()
  // eslint-disable-next-line
  useEffect(() => {
    setPerformance(JSON.parse(localStorage.getItem('performance') as string))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="mt-11 max-w-[80%] mx-auto grid gap-9">
      {
        performance?.performance.reverse().map(({ dateTime, questionOrigin, score, totalQuestions }, n) => (
          <div key={n} className="flex gap-5 justify-between items-center">
            <div>
              <p>
                {dateTime.toLocaleString()}
              </p>
              <p className="font-semibold capitalize text-lg bg-clip-text text-transparent bg-gradient-to-r from-[hsl(202,_100%,_56%,_0.8)] via-[hsl(269,_100%,_61%,_0.8)] to-[hsl(343,_100%,_50%,_0.8)]">
                {questionOrigin}
              </p>
              <p>
                Score: {score}/{totalQuestions}
              </p>
            </div>
            <Progress percentage={score/totalQuestions*100}/>
          </div>
      ))
      }
    </div>
  )
}

export default page