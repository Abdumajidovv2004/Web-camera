import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const vidioRef = useRef(null)
  const streamRef = useRef(null)

  const [tanlash, setTanlash] = useState(false)


  const startStream = () =>{
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video:true,
    }).then((stream) => {
      vidioRef.current.srcObject = stream ;
      vidioRef.current.onloadmetadata = () => vidioRef.current.pley()
    }) .catch((err) =>{
      alert(err);
    })
  };


  const stopStream = () => {
    if (streamRef.current){
      streamRef.current.getTracks().map((el) => el.stop());
    }
  } 


  useEffect(() =>{
   stopStream()
   if (tanlash) startStream()
  },[tanlash])


  return (
    <div>

      <div className="wrapper">

        <video style={{ display: tanlash ? 'block' : 'none' }}
          muted autoPlay playsInline ref={vidioRef}>  </video>

        <div className="cantrols">
          <button onClick={() => setTanlash(!tanlash)}>{tanlash ? 'off' : 'on'}</button>
        </div>

      </div>


    </div>
  )
}

export default App