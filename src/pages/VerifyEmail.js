import React from 'react'

const VerifyEmail = () => {
  return (
    <div className='email--verified'>
        <img src="https://www.nicepng.com/png/full/806-8068476_email-confirmation-vector-illustrator-minimal-simple.png" width="250px" height="160px"/>
        <h2>A confirmation email was sent to your account!</h2>
        <h3>Please confirm your email to be able to login!</h3>
        <a href='https://mail.google.com/mail' target="_blank" className='open--email'>Open Email</a>
    </div>
  )
}

export default VerifyEmail