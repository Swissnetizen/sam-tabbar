# About

Sam-tabbar is an easy to use tabbar.
# Usage

```
<!-- Default value of role is tablist -->
<sam-tabbar>
  <!-- Only elements with role=tab will fire "tabChange" and "activeTabPress" events. -->
  <!-- First Element with data-start-active AND role=tab will be the  active tab -->
  <button role="tab" data-start-active="" id="1">Home</button>
  <button role="tab" id="2">Blag</button>
  <button role="tab" id="3">Contact</button>
  <button role="tab" id="4">Enter Blagosphere</button>
</sam-tabbar>
<script>
tabbar.addEventListener("tabChange", function (event) {
  var tabId = event.detail;
  //Code
});
tabbar.addEventListener("activeTapPress", function (event) {
  var tabId = event.detail;
  //Code
});
//Set tab, accepts 2 arguments
//1. tabid
//2. fire tabChange/activeTabPress events
tabbar.setTab(tabid, true);
var tabid = tabbar.activeTabId;
</script>

```

# [Demo](http://samarthwiz.github.io/sam-tabbar/demo/)
