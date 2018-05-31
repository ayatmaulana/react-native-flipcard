import Sound from 'react-native-sound';

Sound.setCategory('Playback')

const TapSound = new Sound('tap_sound.mp3', Sound.MAIN_BUNDLE, err => {
  if( err ) {
    console.log(err)
    return
  }
  console.log('duration in seconds: ' + TapSound.getDuration() + 'number of channels: ' + TapSound.getNumberOfChannels());
})

const CorrectSound = new Sound('correct_soound.mp3', Sound.MAIN_BUNDLE, err => {
    if( err ) {
      console.log(err)
      return
    }
    console.log('duration in seconds: ' + TapSound.getDuration() + 'number of channels: ' + TapSound.getNumberOfChannels());
  })

export { TapSound, CorrectSound }