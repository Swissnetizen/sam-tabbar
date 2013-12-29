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
        this.activeTabId = this.querySelector("[role='tab'][data-start-active]").id;
      },
      removed: function() {},
      attributeChanged: function() {}
    }, 
    events: { 
      "press": function (event) {
        var el = event.originalTarget;
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
