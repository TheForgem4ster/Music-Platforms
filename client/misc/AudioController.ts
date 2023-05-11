

export const play = (context,audio,actionContext,tracks) => {
   
    if (context.active) {
        console.log()
        statusUpdate(audio,context,actionContext,tracks)
        if (context.pause) {
            actionContext.playTrack()
            audio.play()
        } else {
            actionContext.pauseTrack()
            audio.pause()
        }

    }
}
export const next = (audio,context,actionContext,tracks) => {
    if(context.active){
        let indexHolder=0
        let status
    // stop the music
        actionContext.pauseTrack()
        context.pause = true
    //find index of the audio
        tracks.map((track,index) => {
            
            if(track._id === context.active._id ){
                indexHolder=index
            }
        })
    //when audio is the last
        if(indexHolder+1 >= tracks.length){
            
            status = actionContext.setActiveTrack(tracks[0])
        }
        else{
            status = actionContext.setActiveTrack(tracks[indexHolder+1])
        }
         context.active=status.payload
         setAudio(audio,context.active,context.volume,actionContext.SetCurrentAudio)
         play(context,audio,actionContext,tracks)
    }
}
export const prev = (audio,context,actionContext,tracks) => {
    if(context.active){
        let indexHolder=0
        let status
    // stop the music
        actionContext.pauseTrack()
        context.pause = true
    //find index of the audio
        tracks.map((track,index) => {
            
            if(track._id === context.active._id ){
                indexHolder=index
            }
        })
    //when audio is the first
        if(indexHolder <= 0){
            
            status = actionContext.setActiveTrack(tracks[tracks.length-1])
        }
        else{
            status = actionContext.setActiveTrack(tracks[indexHolder-1])
        }
         context.active=status.payload
         setAudio(audio,context.active,context.volume,actionContext.SetCurrentAudio)
         play(context,audio,actionContext,tracks)
    }
}
export const statusUpdate = (audio,context,actionContext,tracks) => {
    
    audio.onloadedmetadata = () => {
        actionContext.setDuration(Math.ceil(audio.duration))
    }
    audio.ontimeupdate = () => {
        actionContext.setCurrentTime(Math.ceil(audio.currentTime))
    }

    audio.onended =  () => {
        let indexHolder=0
        actionContext.pauseTrack()
        
  //find index of the audio       
        tracks.map((track,index) => {
            
            if(track._id === context.active._id ){
                indexHolder=index
            }
        })
//when audio is the last
        if(indexHolder+1 >= tracks.length){
            const status = actionContext.setActiveTrack(tracks[0])
            context.active=status.payload
            setAudio(audio,context.active,context.volume,actionContext.SetCurrentAudio)
            play(context,audio,actionContext,tracks)
            return
        }
        
        if(indexHolder !== -1){
            
            const status =  actionContext.setActiveTrack(tracks[indexHolder+1])
            context.active=status.payload
            const audioStatus = setAudio(audio,context.active,context.volume,actionContext.SetCurrentAudio)
            return play(context,audioStatus.payload,actionContext,tracks)
            
        }
    }
}
export const setAudio = (audio,active,volume,SetCurrentAudio) => {
    audio.src =process.env.API_URL+ active.audio;
    audio.volume = volume / 100
    return SetCurrentAudio(audio);
}