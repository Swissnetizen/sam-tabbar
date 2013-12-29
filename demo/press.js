(function(){
  "use strict";
  xtag.customEvents.press = {
    maxHold: 1500,
    base: [
      //Touch events
      "touchstart",
      "touchmove",
      "touchleave",
      "touchcancel",
      "touchend",
      //Mouse events
      "mousedown",
      "mouseleave",
      "mouseup"
    ],
    condition: function (custom, event) {
      var el = event.target, data, type;
      //Creates data object
      if (!el.xtag) el.xtag = {};
      if (!el.xtag.customEvents) el.xtag.customEvents = {};
      if (!el.xtag.customEvents.press) el.xtag.customEvents.press = {data: {activated: false}};
      if (el.xtag.customEvents.press.data.activated) return false;
      //Assigns variables to data 
      data = el.xtag.customEvents.press.data;
      type = event.type;
      //Start event
      if (["touchstart", "mousedown"].indexOf(type) !== -1) {
        //Be a bit stupid to do this when not neccessary
        if (data.activated) return false;
         //Time is used to determine wheather or not the finget had been held too long
         data.starttime = Date.now();
         data.canceled = false;
        //Potentially used in the future
         data.starttype = type === "touchstart" ? "touch" : "mouse";
        //Cancels event if finger is moved or they stop touching/clicking the the button. Also cancels if touchcancel.
      } else if (["touchleave", "mouseleave", "touchmove", "touchcancel"].indexOf(type) !== -1) {
        data.canceled = true;
      } else if ([type === "touchend", "mouseup"].indexOf(type) !== -1 && !data.canceled) {
        //Time between start of press to finish
        var time = Date.now(),
            difference = time - data.starttime;
        if (difference < 0) {
          console.warn("The system's internal clock is most likely damaged or incorrectly set!");
          difference = -difference;
        }
        //If they are holding the button too long, a longpress event would fire, not a press event.
        // 1.5s by default
        if (difference > xtag.customEvents.press.maxHold) return false;
        //100ms grace period between presses
        setTimeout(function () {
         this.activated=false;
        }.bind(el.xtag.customEvents.press.data), 100);
        el.xtag.customEvents.press.data.activated = true;
        return true;
      }
      return false;
    }
  };
})();