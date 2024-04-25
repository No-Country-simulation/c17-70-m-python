import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useNavigate } from 'react-router-dom'

function randomID(len: number) {
  let result = ''
  if (result) return result
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP'
  const maxPos = chars.length
  let i
  len = len || 5
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

// eslint-disable-next-line react-refresh/only-export-components
export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1]
  return new URLSearchParams(urlStr)
}

export function VideoCall() {
  const navigate = useNavigate()

  const roomID = getUrlParams().get('roomID') || randomID(5)
  const myMeeting = async (element: HTMLElement | null | undefined) => {
    // generate Kit Token
    const appID = Number(import.meta.env.VITE_APP_ID)
    const serverSecret = import.meta.env.VITE_SERVER_SECRETE
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    )

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    // start the call
    zp.joinRoom({
      container: element,
      //showPreJoinView: false,
      showLeaveRoomConfirmDialog: false,
      onLeaveRoom: () => {
        return navigate('/')
      },
      onLiveEnd: () => {
        return navigate('/')
      },
      branding: {
        logoURL: 'logoReducido.svg'
      },
      showUserList: false,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      }
    })
  }

  return (
    <div
      className='myCallContainer p-6 w-screen h-screen '
      ref={myMeeting}
    ></div>
  )
}
