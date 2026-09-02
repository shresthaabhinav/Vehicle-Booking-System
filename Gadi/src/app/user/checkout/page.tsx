import React, { Suspense } from 'react'
import CheckOutContent from '@/components/CheckOutContent'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckOutContent/>
    </Suspense>
  )
}
