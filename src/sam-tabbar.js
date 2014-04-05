/*
   Copyright 2014 Samarth AGARWAL

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
(function(){  
  "use strict";
  xtag.register("sam-tabbar", {
    lifecycle: {
      created: function() {
        if (!this.role) {
          this.role = "tablist";
        }
      },
      inserted: function() {
        this.activeTabId = this.querySelector("[role='tab'][data-active=true]").id;
      },
      removed: function() {},
      attributeChanged: function() {}
    }, 
    events: { 
      "press": function (event) {
        var el = event.target;
        //Checks if a tab was pressed
        if (!el || el.getAttribute("role") !== "tab") return;
        this.setTab(el.id, true);
      }
    },
    accessors: {
      role: {
        attribute: {}
      }
    }, 
    methods: {
      setTab: function (tabid, fireEvent) {
        var eventName = "tabChange";
        if (!this.querySelector("[id='"+tabid+"'][role='tab']")) {
          console.error("Cannot set to unknown tabid");
          return false;
        }
        //Checks if person is trying to set to currently active tab
        if (this.activeTabId === tabid) {
          eventName = "activeTabPress"
        } else {
          document.getElementById(this.activeTabId).dataset.active = false;
          this.activeTabId = tabid;
          document.getElementById(this.activeTabId).dataset.active = true;
        }
        if (fireEvent) xtag.fireEvent(this, eventName, {detail: this.activeTabId});
        return true;
    }
    }
  });

})();
