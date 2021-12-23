import React from 'react'
import {Typography} from '@mui/material'
export default function Emailredirectpage() {
    return (
        <div sx={{
            position:'absolute',
            top:'50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
            <Typography variant="h6" sx={{
                color:'#2F80ED',
                 position:'absolute',
                top:'50%',
                left: '50%',
                transform: 'translate(-50%,-50%)'
            }}>
                Please, verify your Email to confirm your account.
            </Typography>
        </div>
    )
}
