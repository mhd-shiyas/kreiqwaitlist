'use client'

import { useEffect, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

export function WaitlistCounter() {
  const [count, setCount] = useState<number>(847) // fallback value

  useEffect(() => {
    const metaRef = doc(db, 'waitlist', '--meta--')
    const unsub = onSnapshot(metaRef, (snap) => {
      if (snap.exists()) setCount(snap.data().count ?? 847)
    })
    return () => unsub() // cleanup on unmount
  }, [])

  return (
    <span className='font-inter font-semibold'>{count.toLocaleString()}</span>
  )
}
