import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore"

export const useCollection2 = (col, count) => {
  const [documents, setDocuments] = useState([])
  const [prevDocuments, setPrevDocuments] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [showingItems, setShowingItems] = useState(count)
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState(true)

  const colRef = collection(db, col)

  useEffect(() => {
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(showingItems));
    setIsPending(true)

    const unsub = onSnapshot(q, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      // update state
      setDocuments(results)
      setError(null)
      setIsPending(false)
      setShowingItems(showingItems + count)
    }, (err) => {
      setError('Could not fetch data')
      console.log(err.message)
      setIsPending(false)
    })

    // unsub on unmount
    return () => unsub()
  }, [col])

  const seeMore = () => {      
    console.log(showingItems)
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(showingItems));

    const unsub = onSnapshot(q, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      // update state
      setDocuments(results)
      setError(null)
      setIsPending(false)
      setShowingItems(showingItems + count)
      setPrevDocuments(documents)
      if (documents.length === prevDocuments.length + count) {
        setShowSeeMoreBtn(true)
      } else {
        setShowSeeMoreBtn(false)
      }
    }, (err) => {
      setError('Could not fetch data')
      console.log(err.message)
      setIsPending(false)
    })
    // unsub on unmount
    return () => unsub()
  }

  return { documents, error, isPending, seeMore, showSeeMoreBtn }
}
