import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

type clicked = {
  optionHx: { questionIndex: number, optionIndex: number }[]
}

type Props = {
  options: { option: string, explanation?: string, bool: boolean }[],
  clickedOption: clicked,
  setClickedOption: Dispatch<SetStateAction<clicked>>,
  index: number
}

const Options = ({ options, clickedOption, setClickedOption, index }: Props) => {
  const sortedOptions = options.sort((a, b) => {return(b.option.length - a.option.length)})
  
  const optionClick = (index: number, i: number) => {
    setClickedOption(prev => (
      {
        optionHx: [
          ...prev.optionHx,
          {
            questionIndex: index,
            optionIndex: i
          }
        ]
      }
    ))
  }

  return (
    <div className="flex flex-col gap-[0.6rem]">
      {
        sortedOptions.map((val, i) => (
          <div className={cn("py-3 px-5 text-lg text-[#020817] bg-[#E6E6E6] rounded-lg cursor-pointer", clickedOption.optionHx.map(obj => ((obj.questionIndex == index && obj.optionIndex == i) ? (val.bool ? "bg-green-500" : "bg-red-500") : "")))} onClick={() => optionClick(index, i)} key={val.option}>
            {val.option}
            <p className={cn("hidden px-5 text-sm", clickedOption.optionHx.map(obj => ((obj.questionIndex == index && obj.optionIndex == i) ? "flex" : "")))}>
              {val.explanation}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Options