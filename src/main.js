(function(){  

  // Create your component here
  // http://x-tags.org/docs
  
  xtag.register("sam-tabbar", {
    lifecycle: {
      created: function() {
        if (!this.role) {
          this.role = "tablist";
        }
        this.active = this.querySelector("[active]").id;
      },
      inserted: function() {},
      removed: function() {},
      attributeChanged: function() {}
    }, 
    events: { 
      "press:delegate([role='tab'])": function (event) {
        var tabid = event.target.id;
        if (this.active === tabid) {
          xtag.fireEvent(this, "activeTapPress", this.active);
        } else {
          this.active = tabid;
          xtag.fireEvent(this, "tabChange", this.active);
        }
      }
    },
    accessors: {
      role: {
        attribute: true
      }
      active: true
    }, 
    methods: {
    
    }
  });

})();
