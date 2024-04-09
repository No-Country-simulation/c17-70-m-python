import { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}
export function FrameCredential({ title, children }: Props) {
  return (
    <section
      style={{
        maxWidth: '500px',
        background:
          'linear-gradient(179.71deg, #1460A8 0.25%, #56C9CC 25.36%, #66E2D5 38.65%)'
      }}
      className='w-screen h-screen'
    >
      <div className='w-full flex pt-10 pb-6 items-center justify-center'>
        <h1 className='text-white text-2xl font-bold tracking-wide'>{title}</h1>
      </div>
      <div className='rounded-tl-[4rem] w-full bg-white h-screen p-10'>
        {children}
      </div>
    </section>
  )
}
