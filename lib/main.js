var cm = require("sdk/context-menu");

var settings = {
  context_menu_items:{
    "ref_css":{label:"Refresh-css", data:"ref_css", processor:func_refreshCss}
  }
};

var context_items=[];

for(x in settings.context_menu_items){
  var item = settings.context_menu_items[x];
  context_items.push( cm.Item({label:item.label,data:item.data}) );
}

cm.Menu({
  label: "Fk-tools",
  contentScript: 'self.on("click", function (node, data) { self.postMessage({data:data,node:node}); });',
  onMessage:function(obj){
    processCommand(obj);
  },
  items:context_items
});

function _log(obj){
  console.log("-- Recieved: "+obj.toSource()+" from: "+arguments.callee.caller.toString());
}

function processCommand(obj){
  _log(obj);
  var processor = settings.context_menu_items[obj.data].processor;
}

function func_refreshCss(){
  _log("Refresh CSS called.");
}

