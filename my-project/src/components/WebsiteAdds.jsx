import React from 'react'
import { Button } from 'flowbite-react'
export default function websiteAdds() {
    return (
        <div className='flex flex-col bg-emerald-300 sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                Dive into the world of seamless trading with Probo.
                </h2>
                <p className='text-gray-500 my-2'>
                 where every decision is empowered by intelligent insights and lightning-fast execution.
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://probo.in" target='_blank' rel='noopener noreferrer'>
                        Dowload Now
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxQX56s0XZIDAug-iAbuCxH68uVlula3ll2cF9ksZxNWwRz6P0e2g6NQmgxPKFu-A4Kw&usqp=CAU" />
            </div>
        </div>
    )
}
