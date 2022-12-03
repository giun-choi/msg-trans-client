import React from 'react'
import GroupEmail from './GroupEmail'
import axios from 'axios'

interface EmailInfo {
  subject: string;
  template: string;
  content: string;
}

const DEF_EMAIL_INFO: EmailInfo = {
  subject: '',
  template: 'basic',
  content: ''
}

export default function Home() {
  const [emailInfo, setEmailInfo] = React.useState({...DEF_EMAIL_INFO})
  const [tos, setTos] = React.useState([''])

  const handleChange = (e: any): void => {
    const name = e.target.name
    const value = e.target.value

    setEmailInfo((prev) => {
      if (name === 'subject') return {...prev, subject: value}
      if (name === 'template') return {...prev, template: value}
      if (name === 'content') return {...prev, content: value}
      return {...prev}
    })    
  }

  const send = async (): Promise<void> => {
    const { data } = await axios({
      method: 'post',
      url: '/email/transmission',
      baseURL: 'http://127.0.0.1:8081',
      data: {
        tos: [...tos],
        subject: emailInfo.subject,
        template: emailInfo.template,
        content: emailInfo.content
      }
    })
    
    if (data.status === 1) {
      alert('이메일 전송이 완료되었습니다.')
    } else {
      alert('이메일 전송이 실패하였습니다.')
    }
  }

  return (
    <div>
      <GroupEmail tos={tos} setTos={setTos} />
      <hr />
      <div>
        <div>
          <label>제목</label>
          <input type='text' name='subject' value={emailInfo.subject} onChange={handleChange} />
        </div>
        <div>
          <label>테마</label>
          <select name='template' value={emailInfo.template} onChange={handleChange}>
            <option value='basic'>basic</option>
          </select>
        </div>
        <div>
          <label>내용</label>
          <textarea name='content' value={emailInfo.content} onChange={handleChange}></textarea>
        </div>
      </div>
      <button type='button' onClick={() => send()}>전송</button>
    </div>
  )
}
