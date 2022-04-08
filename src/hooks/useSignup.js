import { useState, useEffect } from 'react'
import { auth, storage, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, userName, file, password) => {
    setError(null)
    setIsPending(true)
    try {
      // sign user up
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (!res) {
        throw new Error('Could not complete Sign up')
      }
      // upload user thumbnail
      const fileRef = ref(storage, `userProfileImgs/${res.user.uid}/${file.name}`)
      await uploadBytes(fileRef, file)
      const imgUrl = await getDownloadURL(fileRef)

      // add display name to user
      updateProfile(res.user, { displayName: userName, photoURL: imgUrl })

      // create a user document
      await setDoc(doc(db, 'users', res.user.uid), {
        displayName: userName,
        photoURL: imgUrl, 
        cart: null,
        wishList: null
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {error, isPending, signup}
}
