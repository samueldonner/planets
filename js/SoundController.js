//-----------------------------------------------------------------------------------------------------------------
// SOUND CONTROLLER (using soundjs)
//-----------------------------------------------------------------------------------------------------------------


/*


*/


SoundController.MUTED = "soundControllerMuted";
SoundController.UNMUTED = "soundControllerUnmuted";

function SoundController(){
    
    // ------------------------ 
    // -- PRIVATE PROPERTIES -- 
    // ------------------------ 
    var _this = this;

    var _soundCollection = new Object();

    var _isMute = false;
    
    
    // ----------------------- 
    // -- PUBLIC PROPERTIES -- 
    // ----------------------- 
    
    
    
    // --------------------
    // == PUBLIC METHODS ==
    // --------------------
    
    _this.playSound = function(sound){
        //trace("SoundController::playSound = " + sound);
        _soundCollection[sound] = createjs.Sound.play(sound);
    }
    
    _this.playLoop = function(sound){
        //trace("SoundController::playLoop = " + sound);
        _soundCollection[sound] = createjs.Sound.play(sound);

        _soundCollection[sound].addEventListener("complete", function(){
            // store volume so new instance will have same levels
            var soundVolume = _soundCollection[sound].volume;
            _this.playLoop(sound);
            _soundCollection[sound].volume = soundVolume;
        });
    }

    _this.stopSound = function(sound){
        _soundCollection[sound].stop();
    }

    _this.setVolumeOnSound = function(sound, volume){
        _soundCollection[sound].volume = volume;
    }

    _this.setMasterVolume = function(volume){
        createjs.Sound.setVolume(volume);
    }

    _this.muteAllSounds = function(bool){
        createjs.Sound.setMute(bool);
    }

    _this.stopAllSounds = function(){
        createjs.Sound.stop();
    }
    
    _this.isSoundOn = function(){
        if($("#soundBtn").hasClass("muted")){
            return false;
        }
        else{
            return true;
        }
    }

    _this.pageBlurMute = function(){
        _this.muteAllSounds(true);
        
        // dispatch event
        $(_this).trigger(SoundController.MUTED);
    }

    _this.pageFocusRestore = function(){
        if(_this.isSoundOn()){
            _this.muteAllSounds(false);
        }

        // dispatch event
        $(_this).trigger(SoundController.UNMUTED);
    }
    
    // ---------------------
    // == PRIVATE METHODS ==
    // ---------------------
    
    function init(){
        //trace("[SoundController::init]");

        // update sound icon
        $("#soundBtn").removeClass("muted");

        $("#soundBtn").bind("click", toggleSoundHandler);

        //trace(_soundQueue);
        
    }

    function toggleSoundHandler(){
        if(_this.isSoundOn()){
            // turn off sounds
            $("#soundBtn").addClass("muted");
            _this.muteAllSounds(true);
            //trace("[SoundController:: toggle mute]");

            // dispatch event
            $(_this).trigger(SoundController.MUTED);
        }
        else{
            // turn on sounds
            $("#soundBtn").removeClass("muted");
            _this.muteAllSounds(false);
            //trace("[SoundController:: toggle unmute]");

            // dispatch event
            $(_this).trigger(SoundController.UNMUTED);
        }
    }
    
    
    
    init();

    return _this;
}