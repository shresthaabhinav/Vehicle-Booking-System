'use client'
import React, { ReactNode } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'

export default function ReduxProvider({children}:{children:ReactNode}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
