"use client"
import React, { useState } from 'react'

type status = {
    StatColor: string
    msg: string
}

const StatusMsg = ({StatColor, msg}: status) => {
    if(StatColor=="green"){
        return (
            <div className={`flex justify-center font-semibold rounded-lg bg-green-600 py-2 px-4 text-lg text-white w-[85%]`}>
                {msg}
            </div>
        )
    }else if(StatColor=="red"){
        return(
            <div className={`flex justify-center font-semibold rounded-lg bg-red-600 py-2 px-4 text-lg text-white w-[85%]`}>
            {msg}
            </div>
        )
    }
}

export default StatusMsg