const Question = ({ question }: { question: string }) => {
  return (
    <p className="text-[#020817] text-xl my-6 leading-relaxed text-pretty">
      {question}
    </p>
  )
}

export default Question