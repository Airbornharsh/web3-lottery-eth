import { CircularProgress } from '@chakra-ui/react'

const LoaderModal = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-zinc-800 opacity-70">
      <CircularProgress isIndeterminate color="green.300" />
    </div>
  )
}

export default LoaderModal
