import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useNavigate } from 'react-router-dom'
import { dataUser } from '../Service/global/user'
import { getUrlParams, randomID } from '../utils/date'

export function VideoCall() {
  const navigate = useNavigate()
  const roomID = getUrlParams().get('roomID') || randomID(5)
  const { user } = dataUser()

  const myMeeting = async (element: HTMLElement | null | undefined) => {
    // generate Kit Token
    const appID = Number(import.meta.env.VITE_APP_ID)
    const serverSecret = import.meta.env.VITE_SERVER_SECRETE
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      user.first_name
    )

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    // start the call
    zp.joinRoom({
      container: element,
      showPreJoinView: false,
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
