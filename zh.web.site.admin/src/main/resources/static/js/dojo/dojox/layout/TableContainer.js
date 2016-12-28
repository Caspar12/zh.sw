//>>built
define("dojox/layout/TableContainer","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/dom-class dojo/dom-construct dojo/_base/array dojo/dom-prop dojo/dom-style dijit/_WidgetBase dijit/layout/_LayoutWidget".split(" "),function(e,k,w,n,b,c,t,x,y,z){e.experimental("dojox.layout.TableContainer");e=w("dojox.layout.TableContainer",z,{cols:1,labelWidth:"100",showLabels:!0,orientation:"horiz",spacing:1,customClass:"",postCreate:function(){this.inherited(arguments);this._children=[];this.connect(this,
"set",function(a,l){!l||"orientation"!=a&&"customClass"!=a&&"cols"!=a||this.layout()})},startup:function(){if(!this._started&&(this.inherited(arguments),!this._initialized)){var a=this.getChildren();1>a.length||(this._initialized=!0,n.add(this.domNode,"dijitTableLayout"),c.forEach(a,function(a){a.started||a._started||a.startup()}),this.layout(),this.resize())}},resize:function(){c.forEach(this.getChildren(),function(a){"function"==typeof a.resize&&a.resize()})},layout:function(){function a(a,b,g){if(""!=
u.customClass){var f=u.customClass+"-"+(b||a.tagName.toLowerCase());n.add(a,f);2<arguments.length&&n.add(a,f+"-"+g)}}if(this._initialized){var l=this.getChildren(),e={},u=this;c.forEach(this._children,k.hitch(this,function(a){e[a.id]=a}));c.forEach(l,k.hitch(this,function(a,b){e[a.id]||this._children.push(a)}));var p=b.create("table",{width:"100%","class":"tableContainer-table tableContainer-table-"+this.orientation,cellspacing:this.spacing},this.domNode),h=b.create("tbody");p.appendChild(h);a(p,
"table",this.orientation);var m=b.create("tr",{},h),v=this.showLabels&&"horiz"!=this.orientation?b.create("tr",{},h):m,q=this.cols*(this.showLabels?2:1),r=0;c.forEach(this._children,k.hitch(this,function(f,e){var g=f.colspan||1;1<g&&(g=this.showLabels?Math.min(q-1,2*g-1):Math.min(q,g));r+g-1+(this.showLabels?1:0)>=q&&(r=0,m=b.create("tr",{},h),v="horiz"==this.orientation?m:b.create("tr",{},h));var d;if(this.showLabels)if(d=b.create("td",{"class":"tableContainer-labelCell"},m),f.spanLabel)t.set(d,
"vert"==this.orientation?"rowspan":"colspan",2);else{a(d,"labelCell");var c={"for":f.get("id")},c=b.create("label",c,d);(-1<Number(this.labelWidth)||-1<String(this.labelWidth).indexOf("%"))&&x.set(d,"width",0>String(this.labelWidth).indexOf("%")?this.labelWidth+"px":this.labelWidth);c.innerHTML=f.get("label")||f.get("title")}d=f.spanLabel&&d?d:b.create("td",{"class":"tableContainer-valueCell"},v);1<g&&t.set(d,"colspan",g);a(d,"valueCell",e);d.appendChild(f.domNode);r+=g+(this.showLabels?1:0)}));this.table&&
this.table.parentNode.removeChild(this.table);c.forEach(l,function(a){"function"==typeof a.layout&&a.layout()});this.table=p;this.resize()}},destroyDescendants:function(a){c.forEach(this._children,function(b){b.destroyRecursive(a)})},_setSpacingAttr:function(a){this.spacing=a;this.table&&(this.table.cellspacing=Number(a))}});e.ChildWidgetProperties={label:"",title:"",spanLabel:!1,colspan:1};k.extend(y,e.ChildWidgetProperties);return e});
//# sourceMappingURL=TableContainer.js.map