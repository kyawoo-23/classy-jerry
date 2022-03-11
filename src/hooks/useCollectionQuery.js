import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"

export const useCollectionQuery = (col, _query) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    let colRef = collection(db, col)
    setIsPending(true)

    if (_query === 'all') {
      getDocs(colRef).then(snapshot => {
        let results = []
        snapshot.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id })
        })
        setDocuments(results)
        setError(null)
        setIsPending(false)
      }, (err) => {
        setError('Could not fetch data')
        console.log(err.message)
        setIsPending(false)
      })
    } else if (_query) {
      const q = query(colRef, where("category", "==", _query))
      getDocs(q).then(querySnapshot => {
        let results = []
        querySnapshot.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id })
        })

        // update state
        setDocuments(results)
        setError(null)
        setIsPending(false)
      }, (err) => {
        setError('Could not fetch data')
        console.log(err.message)
        setIsPending(false)
      })
    }

  }, [col, _query])

  return { documents, error, isPending }
}
