<template>
    <div>
        <button id="linkButton" @click="linkEvent">Link</button>
        <div class="control-section">
            <div class="sample-container">
                <div class="default-section">
                <ejs-richtexteditor ref="rteObj" :height="height" :toolbarSettings="toolbarSettings" :insertImageSettings="insertImageSettings">
                    <p id="editorText">Gib mir Wissen :)</p>
                </ejs-richtexteditor>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import {RichTextEditor, RichTextEditorPlugin, Toolbar, HtmlEditor, Link, Image, QuickToolbar } from "@syncfusion/ej2-vue-richtexteditor" ;
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

Vue.use(RichTextEditorPlugin);
RichTextEditor.Inject(Link, Image, QuickToolbar);

export default {
     data: function() {
        return {
            elementArray: [],
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
    props:['knotenId'],
    methods:{
        linkEvent(){
            //let text2 = window.getSelection();
            //let text3 = document.getElementById("editorText");
            //let html =  document.getElementById("editorText");

            

            var span = document.createElement("span");
            span.setAttribute("id", this.elementArray.length);

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
            //---------------------------------------------------------------------------

            this.$swal.fire({
                showCancelButton: true,
                title: 'Wähle Knoten',
                html: wrapper,
            }).then(() => {
                var checkboxes = wrapper.getElementsByTagName('input');
                var value = "";
                checkboxes.forEach((check) => {
                        if(check.checked){
                            value = check.id
                        }
                    });
                   this.elementArray.push({id: this.elementArray.length, knotenName: value});
                    console.log(this.elementArray[0].id)
           if (window.getSelection) {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var range = sel.getRangeAt(0).cloneRange();
                    range.surroundContents(span);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
            })

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