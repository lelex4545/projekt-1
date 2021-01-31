<template>
    <div id="buildCenter" class="containerDesignHome">
        
        <button @click="createNode">Erstellen</button><br>
        <button @click="startAnki">Lernmodus</button>
    </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

export default {
    props: [ 'bname', 'existingNodes','netzId'],
    data: ()=> ({
        name: "",
        passwort: "",
        knotenName: "",
        values: [],

    }),
    components: {
    },
    methods:{
        startAnki(){
            this.$cookies.set("netzId", this.netzId, "expiring time");
            this.$router.push({ name: 'LearningScreen', params: {netzId: this.netzId}})
        },
        createNode(){ 
            //---------------------------------------------------------------------------------------
            this.$swal.fire({
                title: 'Name',
                input: 'text',
                showCancelButton: true,
            }).then((result) => {
                var check = 1
                if (result.value != null) {
                    //alert(result.value[0])
                    this.knotenName = result.value;
                    this.existingNodes.forEach((elem) => {
                        if(elem.annotations[0].content.toUpperCase() == this.knotenName.toUpperCase()){
                            alert(this.knotenName + " existiert bereits")
                            this.createNode();
                            check = 0
                        }
                    });

                    if(check){
                        this.$emit('sendNode',this.knotenName);
                    }
                }
            })
            //--------------------------------------------------------------------------------------- Verbindungen erstellen
            //erstelle checkbox Liste mit allen vorhandenen Knoten:
            /* 
            let htmlStr = ""
            this.existingNodes.forEach(function(element){ 
            */
                /*htmlStr +=  `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" name="node" id="${element.id}">
                                <label class="form-check-label" for="checkbox1">
                                    ${element.annotations[0].content}
                                </label>
                            </div>
                            `*/
            /*    
                htmlStr +=  `<input class="form-check-input" type="checkbox" value="" name="node" id="${element.id}1">${element.annotations[0].content} \n`;
            });

            if(htmlStr == "")
                htmlStr = '<h3>Keine weiteren Knoten vorhanden</h3>'

            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlStr;

            this.$swal.mixin({                
                showCancelButton: true,
                progressSteps: ['1', '2']
            }).queue([
                {   
                    title: 'Name',
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                },
                {
                    title: 'Wähle Verbindung',
                    html: wrapper,
                    focusConfirm: false,
                },
            
            ]).then((result) => {
                var check = 1
                if (result.value != null) {
                    //alert(result.value[0])
                    this.knotenName = result.value[0];
                    this.existingNodes.forEach((elem) => {
                        if(elem.annotations[0].content.toUpperCase() == this.knotenName.toUpperCase()){
                            alert(this.knotenName + " existiert bereits")
                            this.createNode();
                            check = 0
                        }
                    });
                    //checkbox daten zurück senden---------------------------------
                    if(check){
                        var checkboxes = wrapper.getElementsByTagName('input');
                        
                        //checked überprüfem
                        checkboxes.forEach((check) => {
                            if(check.checked){
                                this.values.push(check.id)
                            }
                        });

                        //-----------------------------------------------------------
                        this.$emit('sendConnectorNodes', this.values);
                        this.values = []

                        this.$emit('sendNode',this.knotenName);
                    }
                }
            })*/
            
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/theme.scss";

#buildCenter{
    display: flex;
    align-items: center;
    flex-flow: column;
    border-radius: 0;  

    position: fixed;
    left: 0;
    top: 0;
    padding-top: 4em;
    height: 100vh;
    width: 283px;
    z-index: 10;
}

</style>