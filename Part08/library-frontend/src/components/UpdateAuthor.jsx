import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_BIRTH } from '../utils/queries'

const UpdateAuthor = ({ noti, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(authors[0]?.name)

  const [updateBirth, result] = useMutation(UPDATE_BIRTH, {
    onError: (e) => {
      const messages = e.graphQLErrors.map((err) => err.message).join('\n')
      noti(messages)
    },
  })

  // useEffect(() => {
  //   if (result.data && result.data.updateBirth === null) {
  //     noti('Author not found!')
  //   }
  // }, [result.data])

  const submit = (e) => {
    e.preventDefault()
    if (name && selected) {
      noti('Choose one of the method')
    } else if (name) {
      updateBirth({ variables: { author: name, born: Number(born) } })
    } else if (selected) {
      updateBirth({ variables: { author: selected, born: Number(born) } })
    }
    setName('')
    setBorn('')
  }

  return (
    <div className="update-container" style={{ marginLeft: '1rem' }}>
      <h2>Update birth date</h2>
      <form
        onSubmit={submit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
        }}
      >
        <div>
          <label htmlFor="author">Author name input:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author-select">Author name select:</label>
          <select
            id="author-select"
            name="author-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="birth">Up-to-date birth date:</label>
          <input
            type="text"
            id="birth"
            name="birth"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
