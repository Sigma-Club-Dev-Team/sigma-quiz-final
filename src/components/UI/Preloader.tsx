import React from 'react'
import styles from "@/styles/auth.module.scss"
import Spinner from './Spinner'

function Preloader() {
  return (
    <div style={{display: 'flex', minHeight: '100dvh', minWidth: '100dvw', justifyContent: 'center', alignItems: 'center'}}>
        <Spinner />
    </div>
  )
}

export default Preloader