import * as React from 'react'

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>
      {name} - {email} ti ha scritto!
    </h1>
    <p>{message}</p>
  </div>
)
export default EmailTemplate
