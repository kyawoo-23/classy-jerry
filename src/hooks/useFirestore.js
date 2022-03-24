import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { useAuthContext } from './useAuthContext'

export const useFirestore = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { user } = useAuthContext()

  const updateAndAddItem = async (col, docu, field, itemColor, itemSize, itemQty) => {
    setIsAddingToWishList(false)
    setIsAddingToCart(false)
    const colRef = doc(db, col, user.uid)
    try {
      if (field === 'wishList') {
        setIsAddingToWishList(true)
        await updateDoc(colRef, {
          wishList: arrayUnion({ itemId: docu })
        })
      }
      if (field === 'cart') {
        setIsAddingToCart(true)
        await updateDoc(colRef, {
          cart: arrayUnion({
            itemId: docu,
            itemColor,
            itemSize,
            itemQty
          })
        })
      }
      setError(null)
      setIsAddingToWishList(false)
      setIsAddingToCart(false)
      if (!isCancelled) {        
        setError(null)
        setIsAddingToCart(false)
        setIsAddingToWishList(false)
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error)
        setError(error.message)
        setIsAddingToWishList(false)
        setIsAddingToCart(false)
      }
    }
  }

  const updateAndRemoveItem = async (col, docu, field, itemColor, itemSize, itemQty) => {
    setisLoading(true)
    const colRef = doc(db, col, user.uid)
    try {
      if (field === 'wishList') {
        await updateDoc(colRef, {
          wishList: arrayRemove({ itemId: docu })
        })
      }
      if (field === 'cart') {
        await updateDoc(colRef, {
          cart: arrayRemove({
            itemId: docu,
            itemColor,
            itemSize,
            itemQty
          })
        })
      }
      setError(null)
      setisLoading(false)
      if (!isCancelled) {
        setisLoading(false)
        setError(null)
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error)
        setError(error.message)
        setisLoading(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { updateAndAddItem, updateAndRemoveItem, error, isLoading, isAddingToWishList, isAddingToCart }
}
