const APP_ID = '881a0dc5643c45d1ad08fb3fea0d9f03'
const CHANNEL = 'web'
const TOKEN = '006881a0dc5643c45d1ad08fb3fea0d9f03IABdR16NMd1PRf5hEZg1WJ2PPgOBpwRistKwj9DebVDa4lE4yRUTVwD6IgDzaM0F/eYaZgQAAQB9OBxmAgB9OBxmAwB9OBxmBAB9OBxm'
let UID = '8'

const client = AgoraRTC.createClient()

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    await client.join(APP_ID, CHANNEL, TOKEN, null, UID)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div  class="video-container" id="user-container-${UID}">
                     <div class="video-player" id="user-${UID}"></div>
                     <div class="username-wrapper"><span class="user-name"> Nombre: </span></div>
                  </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user 
    await client.subscribe(user, mediaType)

    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player != null){
            player.remove()
        }

        player = `<div  class="video-container" id="user-container-${user.uid}">
                     <div class="video-player" id="user-${user.uid}"></div>
                     <div class="username-wrapper"><span class="user-name">Name</span></div>
                  </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    user.videoTrack.play(`user-${user.uid}`)    
    }
    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) =>{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove
}

let leaveAndRemoveLocalStream = async () => {
    for (let i =0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
        
    await client.leave()
    window.open('/', '_self')
}
}

let toggleCamera = async (e) =>{
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else{
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

let toggleMic = async (e) =>{
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

joinAndDisplayLocalStream()

document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('cam-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)