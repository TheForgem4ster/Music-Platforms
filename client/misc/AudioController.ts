export const repeat = (context, audio, actionContext) => {
    switch (context.repeat) {
      case 0:
        actionContext.SetRepeat(1);
        audio.loop = true;
        break;
      case 1:
        actionContext.SetRepeat(2);
        audio.loop = false;
        break;
      case 2:
        actionContext.SetRepeat(0);
        audio.loop = false;
        break;
      default:
        break;
    }
  };
  
  export const play = (context, audio, actionContext) => {
    if (context.repeat === 1) {
      audio.loop = true;
    } else {
      audio.loop = false;
    }
  
    if (context.active) {
      statusUpdate(audio, context, actionContext);
      if (context.pause) {
        actionContext.playTrack();
        audio.play();
      } else {
        actionContext.pauseTrack();
        audio.pause();
      }
    }
  };
  
  export const next = (audio, context, actionContext) => {
    if (context.active) {
      let indexHolder = 0;
      let status;
  
      actionContext.pauseTrack();
      context.pause = true;
  
      context.playlist.forEach((track, index) => {
        if (track._id === context.active._id) {
          indexHolder = index;
        }
      });
  
      if (indexHolder + 1 >= context.playlist.length) {
        status = actionContext.setActiveTrack(context.playlist[0]);
      } else {
        status = actionContext.setActiveTrack(context.playlist[indexHolder + 1]);
      }
  
      context.active = status.payload;
      setAudio(audio, context.active, context.volume, actionContext.SetCurrentAudio);
      play(context, audio, actionContext);
    }
  };
  
  export const prev = (audio, context, actionContext) => {
    if (context.active) {
      let indexHolder = 0;
      let status;
  
      actionContext.pauseTrack();
      context.pause = true;
  
      context.playlist.forEach((track, index) => {
        if (track._id === context.active._id) {
          indexHolder = index;
        }
      });
  
      if (indexHolder <= 0) {
        status = actionContext.setActiveTrack(context.playlist[context.playlist.length - 1]);
      } else {
        status = actionContext.setActiveTrack(context.playlist[indexHolder - 1]);
      }
  
      context.active = status.payload;
      setAudio(audio, context.active, context.volume, actionContext.SetCurrentAudio);
      play(context, audio, actionContext);
    }
  };
  
  export const statusUpdate = (audio, context, actionContext) => {
    audio.onloadedmetadata = () => {
      actionContext.setDuration(Math.ceil(audio.duration));
    };
  
    audio.ontimeupdate = () => {
      actionContext.setCurrentTime(Math.ceil(audio.currentTime));
    };
  
    audio.onended = () => {
      let indexHolder = 0;
      actionContext.pauseTrack();
  
      context.playlist.forEach((track, index) => {
        if (track._id === context.active._id) {
          indexHolder = index;
        }
      });
  
      if (context.repeat === 2) {
        if (indexHolder + 1 >= context.playlist.length) {
          const status = actionContext.setActiveTrack(context.playlist[0]);
          context.active = status.payload;
          setAudio(audio, context.active, context.volume, actionContext.SetCurrentAudio);
          return play(context, audio, actionContext);
        }
      }
  
      if (indexHolder !== -1 && indexHolder + 1 !== context.playlist.length) {
        const status = actionContext.setActiveTrack(context.playlist[indexHolder + 1]);
        context.active = status.payload;
        const audioStatus = setAudio(audio, context.active, context.volume, actionContext.SetCurrentAudio);
        return play(context, audioStatus.payload, actionContext);
      }
    };
  };
  
  export const setAudio = (audio, active, volume, SetCurrentAudio) => {
    audio.src = process.env.API_URL + active.audio;
    audio.volume = volume / 100;
    return SetCurrentAudio(audio);
  };
  
  export const shuffle = (context, actionContext) => {
    const playlist = [...context.playlist];
    let currentIndex = playlist.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      temporaryValue = playlist[currentIndex];
      playlist[currentIndex] = playlist[randomIndex];
      playlist[randomIndex] = temporaryValue;
  
      if (context.active && context.active._id === temporaryValue._id) {
        context.active = temporaryValue;
      }
    }
  
    actionContext.SetCurrentPlaylist(playlist);
  };