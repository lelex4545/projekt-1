<template>
    <div>
        <button id="linkButton" @click="linkEvent">Link</button>
        <button id="linkButton" @click="saveEditor">Save</button>
        <button id="linkButton" @click="backEditor">Zurück</button>
        <button id="linkButton">{{knotenName}}</button>
        <div class="control-section">
            <div class="sample-container">
                <div class="default-section">
                <ejs-richtexteditor id="html" ref="rteObj" v-model="htmlString" v-bind:value="htmlString" 
                    :height="height" :toolbarSettings="toolbarSettings" :insertImageSettings="insertImageSettings"

                    >

                </ejs-richtexteditor>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
//import EventBus from '@/event-bus'
import {RichTextEditor, RichTextEditorPlugin, Toolbar, HtmlEditor, Link, Image, QuickToolbar } from "@syncfusion/ej2-vue-richtexteditor" ;
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

Vue.use(RichTextEditorPlugin);
RichTextEditor.Inject(Link, Image, QuickToolbar);



export default {
     data: function() {
        return {
            elementArray: [],
            htmlString: "",
            textExist: false,
            puffer: [],
            knotenName: "",
            historyArray: [],
            height: "500px",
            insertImageSettings:{
                saveFormat: 'Blob'
            },
            toolbarSettings: {
                type: 'Expand',
                items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|',
                'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
            },
        };
    },
    provide:{
        richtexteditor:[Toolbar, HtmlEditor]
    },
    props:['knotenId',],
    mounted: function() {
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            async function cypher(query,params,cb) {
                await r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            this.knotenName = this.knotenId;
            var query="MATCH (a:Netz)-[r:besitzt]->(b:Text) WHERE id(a)=$id AND b.knotenId=$id2 RETURN b"
            var params={id: this.$route.query.netzId, id2: this.knotenId}
            this.historyArray.push(this.knotenName);
            var cb = async function(err,data) 
            {   
                if(data.results[0].data.length > 0){
                    if(data.results[0].data[0].row[0].array!="")
                    this.elementArray = JSON.parse(data.results[0].data[0].row[0].array);

                    this.htmlString = data.results[0].data[0].row[0].htmlString;

                    this.$nextTick(function(){
                        for(var i = 0; i<this.elementArray.length; i++){
                            document.getElementById(this.elementArray[i].id).addEventListener('mousedown',this.changeEditor)
                            document.getElementById(this.elementArray[i].id).addEventListener('contextmenu',this.changeEditor)
                        }
                    })
                    
                    this.textExist=true; //Keine endgültige Lösung
                }

            }.bind(this)

            cypher(query,params,cb)
            
    },
    watch: {
        knotenName: function() {
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            async function cypher(query,params,cb) {
                await r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            var query="MATCH (a:Netz)-[r:besitzt]->(b:Text) WHERE id(a)=$id AND b.knotenId=$id2 RETURN b"
            var params={id: this.$route.query.netzId, id2: this.knotenName}
            var cb = async function(err,data)
            {   
                if(data.results[0].data.length > 0){
                    if(data.results[0].data[0].row[0].array!="")
                    this.elementArray = JSON.parse(data.results[0].data[0].row[0].array);
                    else
                    this.elementArray = [];
                    this.htmlString = data.results[0].data[0].row[0].htmlString;
                    /*
                    for(var i = 0;i<this.elementArray.length;i++){
                        document.getElementById(this.elementArray[i].id).addEventListener('click',this.changeEditor)
                    }*/
                    this.$nextTick(function(){
                        for(var i = 0; i<this.elementArray.length; i++){
                            document.getElementById(this.elementArray[i].id).addEventListener('mousedown',this.changeEditor)
                        }
                    })
                    this.textExist=true; //Keine endgültige Lösung
                }
            }.bind(this)

                cypher(query,params,cb)
        },
    },
    methods:{
        linkEvent(){
            //let text2 = window.getSelection();
            //let text3 = document.getElementById("editorText");
            //let html =  document.getElementById("editorText");
            function cypher(query,params,cb) {
                    r.post({uri:txUrl,
                    json:{statements:[{statement:query,parameters:params}]}},
                    function(err,res) { cb(err,res.body)})}
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";

            var span = document.createElement("span");
            span.setAttribute("id", this.elementArray.length);
            span.setAttribute("style", "background-color: yellowgreen; border-radius: 0.3em; cursor: pointer;");
            //---------------------------------------------------------------------------
            let htmlStr = ""
            if(this.$route.query.existingNodes){
                this.$route.query.existingNodes.forEach(function(element){
                    htmlStr +=  `<input class="form-check-input" type="radio" value="" name="node" id="${element.id}">${element.annotations[0].content} \n`;
                });
            }
            if(htmlStr == "")
                htmlStr = '<h3>Keine weiteren Knoten vorhanden</h3>'

            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlStr;
            
             if (window.getSelection) {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0).cloneRange();
                console.log(sel)
             }
            //---------------------------------------------------------------------------

            this.$swal.fire({
                showCancelButton: true,
                title: 'Wähle Knoten',
                html: wrapper,
                
            }).then((result) => {
                if(!result.isDismissed){
                    var checkboxes = wrapper.getElementsByTagName('input');
                    var value = "";
                    checkboxes.forEach((check) => {
                            if(check.checked){
                                value = check.id
                            }
                        });
                    var unique=-1;
                    for(var i = 0; i<this.elementArray.length; i++){
                        if(unique<this.elementArray[i].id)
                            unique=this.elementArray[i].id
                    }
                    unique++         
                    this.elementArray.push({id: unique, knotenName: value});
                        console.log(this.elementArray[0].id)
                    //if (window.getSelection) {
                        //var sel = window.getSelection();
                        if (sel.rangeCount) {
                            
                            range.surroundContents(span);
                            sel.removeAllRanges();
                            sel.addRange(range);
                            
                        }
                    //}
                    document.getElementById(this.elementArray[this.elementArray.length-1].id).addEventListener('mousedown',this.changeEditor)
                    var connectorKnoten = {knoten1: this.knotenName, knoten2: value}
                    this.htmlString = this.$refs.rteObj.$el.ej2_instances[0].cloneValue;
                    //this.$nextTick(() => EventBus.$emit('sendConnection', connectorKnoten));
                    this.puffer.push(connectorKnoten);
                    

                    var cb=function(err,data) 
                    {
                        data;
                    }.bind(this)
                    var query="MATCH (n:Wissensnetz)-[r:beinhaltet]->(m:Netz) WHERE id(n)=$id SET m.puffer=$puffer RETURN n"
                    var params={id: this.$cookies.get("item").id, puffer: JSON.stringify(this.puffer)};
                    cypher(query,params,cb);
                    this.saveEditor();
                }
            })

        },
        changeEditor(args) {
            //alert(document.getElementById('editorText').innerHTML)
            //alert(this.$route.query.netzId)
            //console.log(this.elementArray);
            //var serializedArr = JSON.stringify(this.elementArray);
            //var unpackArr = JSON.parse(serializedArr);
            //console.log(unpackArr);
            console.log(args)
            if(args.button==0){
            alert(args.srcElement.id)
            for(var i = 0; i<this.elementArray.length; i++){
                if(args.srcElement.id == this.elementArray[i].id){
                    alert("LINK START")
                    this.historyArray.push(this.elementArray[i].knotenName)
                    this.knotenName = this.elementArray[i].knotenName;

                    }
                }
            }
            else{
                alert("löschen")
                for(var j = 0; j<this.elementArray.length; j++){
                    if(args.srcElement.id == this.elementArray[j].id){
                        var span =document.getElementById(this.elementArray[j].id)
                        var pa=span.parentNode;
                        while(span.firstChild) pa.insertBefore(span.firstChild, span);
                        pa.removeChild(span);
                        this.elementArray.splice(j,1)
                        }
                }
                
            }
        },
        backEditor() {
            this.historyArray.pop()
            if(this.historyArray.length!=0){
            alert(this.historyArray[this.historyArray.length-1])
            this.knotenName = this.historyArray[this.historyArray.length-1]
            }
            console.log(this.htmlString)
           
        },
        deleteLink(){
            alert("löschen")
        },
        saveEditor() {
            var r=require("request");
            var txUrl = "http://localhost:7474/db/data/transaction/commit";
            async function cypher(query,params,cb) {
                await r.post({uri:txUrl,
                json:{statements:[{statement:query,parameters:params}]}},
                function(err,res) { cb(err,res.body)})
                }
            
            var cb = async function(err,data) 
            {
                console.log(data);
            }.bind(this)

                var query="MATCH (n:Netz)-[r:besitzt]->(m:Text) WHERE id(n)=$id AND m.knotenId=$knoten SET m +={ array:$array, htmlString:$htmlString} RETURN m"
                var params={id: this.$route.query.netzId, knoten: this.knotenName, array: JSON.stringify(this.elementArray), htmlString: this.htmlString}
                cypher(query,params,cb);
            
            

        }
    }
}
</script>

<style scoped>
@import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";

.sample-container{
  margin-top: 50px;
  height: height;
  border-radius: 30px;
  padding: 50px;
  background-color: white;
  color: black;
  width: 1120px;
  text-align: left;
}

#linkButton{
    height: 2em;
}

</style>