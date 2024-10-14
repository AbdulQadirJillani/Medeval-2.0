import { Separator } from "@/components/ui/separator"

type Props = {
  questionOrigin: string|string[],
  questionID: number,
  totalQuestions: number
}

const Header = ({ questionOrigin, questionID, totalQuestions }: Props) => {
  let name
  if (typeof questionOrigin === typeof 'string') {
    const array = (questionOrigin as string).split("/")
    if (array.length == 1) name = array[0]
    else name = `${array[1]} - ${array[2]}`
  }
  else if (Array.isArray(questionOrigin)) {
    let mod
    const yearArr = []
    for (let index = 1; index < questionOrigin.length; index++) {
      const array = questionOrigin[index].split("/")
      mod = array[1]
      yearArr.push(` ${array[2]}`)
    }
    name = `${mod} - compiled (${yearArr.toString()} )`
  }
  return (
    <>
    <div className="my-3 flex justify-between">
      <span className="font-semibold capitalize text-lg bg-clip-text text-transparent bg-gradient-to-r from-[hsl(202,_100%,_56%)] via-[hsl(269,_100%,_61%)] to-[hsl(343,_100%,_50%)]">{name}</span>
      <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-[hsl(202,_100%,_56%)] via-[hsl(269,_100%,_61%)] to-[hsl(343,_100%,_50%)]">{questionID} out of {totalQuestions}</span>
    </div>
    <Separator orientation="horizontal" className="w-full h-[1px]" />
    </>
  )
}

export default Header