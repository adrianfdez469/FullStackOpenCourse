import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import FilteredBooks from './FilteredBooks'
import { ME } from '../apollo/querys'

const Recomendations = ({show, books}) => {

  const { data } = useQuery(ME)
  const [user, setUser] = useState()

  useEffect(() => {
    if(data && data.me){
      setUser(data.me)
    }
  }, [data])

  if(!show){
    return null
  }

  return (
    <>
      <h2>Recomendations</h2>
      <div>books in your favorite genre <b>{user.favoriteGenre}</b></div>
      <FilteredBooks filter={user.favoriteGenre} books={books}/>
    </>
  )

}
export default Recomendations