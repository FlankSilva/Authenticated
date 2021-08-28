import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  margin-top: 100px;
  justify-content: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  box-shadow: 1px 1px 10px rgba(0,0,0,.5);
  border-radius: 4px;
  width: 180px;
  height: 100px;
  padding: 20px;

  input {
    margin-bottom: 10px;
  }
`

export const Button = styled.button`
  background: blue;
  color: #fff;
  outline: none;
  border: none;
  padding: 5px;
  margin-top: 10px;
  border-radius: 4px;
`