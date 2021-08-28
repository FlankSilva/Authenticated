import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { Button, Container, Form } from "./styles"

export const HomePage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword]  =useState('')

  const { signIn } = useContext(AuthContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  )
}