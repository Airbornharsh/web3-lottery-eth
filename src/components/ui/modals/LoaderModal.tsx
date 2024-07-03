import { CircularProgress } from '@chakra-ui/react'

const LoaderModal = () => {
  return (
    <div className="w-screen h-screen fixed flex justify-center items-center bg-zinc-800 top-0 left-0 opacity-70 z-50">
      <CircularProgress isIndeterminate color="green.300" />
    </div>
  )
}

export default LoaderModal
