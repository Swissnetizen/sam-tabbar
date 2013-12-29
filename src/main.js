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
        var el = event.originalTarget,
            eventName = "activeTabPress";
        //Checks if a tab was pressed
        if (!el || el.getAttribute("role") !== "tab") return;
        var tabid = el.id;
        //Checks if the active tab wasn't pressed
        if (this.activeTabId !== tabid) {
          document.getElementById(this.activeTabId).dataset.active = false;
          this.activeTabId = tabid;
          document.getElementById(this.activeTabId).dataset.active = true;
          eventName = "tabChange";
        }
        xtag.fireEvent(this, eventName, {detail: this.activeTabId});
      }
    },
    accessors: {
      role: {
        attribute: {}
      }
    }, 
    methods: {
    
    }
  });

})();
