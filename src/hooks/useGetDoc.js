import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { useAuthContext } from "./useAuthContext"

export const useGetDoc = (col, docu, itemColor, itemSize, itemQty, field) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { user } = useAuthContext()

  useEffect(() => {
    setIsPending(true)
    if (docu) {
      const docRef = doc(db, col, docu);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          setDocument(docSnap.data())
          setError(null)
          setIsPending(false)
        } else {
          const userRef = doc(db, "users", user.uid)
          field === 'cart' && (
            updateDoc(userRef, {
              cart: arrayRemove({
                itemColor,
                itemQty,
                itemSize,
                itemId: docu
              })
            }).then(() => {
              setIsPending(false)
            })
          )
          field === 'wishList' && (
            updateDoc(userRef, {
              wishList: arrayRemove({ itemId: docu })
            }).then(() => {
              setIsPending(false)
            })
          )
        }
      }).catch(err => {
        console.log("error", err)
        setIsPending(false)
      })
    }
  }, [col, docu, itemColor, itemSize, itemQty, field])

  return { document, error, isPending }
}
