import { cn } from "@/lib/utils"
import { useState } from "react"

type Props = {
  options: { option: string, explanation?: string, bool: boolean }[],
  index: number
}

type clickedOption = {
  questionIndex: number,
  optionIndex: number
}[]

const Options = ({ options, index }: Props) => {
  const [clickedOption, setClickedOption] = useState<clickedOption|[]>([])
  const sortedOptions = options.sort((a, b) => {return(b.option.length - a.option.length)})

  const optionClick = (index: number, i: number) => {
    setClickedOption(prev => 
      [
        ...prev,
        {
          questionIndex: index,
          optionIndex: i
        }
      ]
    )
  }

  return (
    <div className="flex flex-col gap-[0.6rem]">
      {
        sortedOptions.map((val, i) => (
          <div className={cn("py-3 px-5 text-lg text-[#020817] bg-[#E6E6E6] rounded-lg cursor-pointer", clickedOption.map(obj => ((obj.questionIndex == index && obj.optionIndex == i) ? (val.bool ? "bg-green-500" : "bg-red-500") : "")))} onClick={() => optionClick(index, i)} key={val.option}>
            {val.option}
            <p className={cn("hidden px-5 text-sm", clickedOption.map(obj => ((obj.questionIndex == index && obj.optionIndex == i) ? "flex" : "")))}>
              {val.explanation}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Options