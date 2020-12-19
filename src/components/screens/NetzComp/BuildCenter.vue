<template>
    <div id="buildCenter" class="containerDesignHome">
        <div id ="profil" @click ="profilSwitch" class="canttouchme">
            <div id="profilBild">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" id= "pb">
            </div>
            <p id="name">{{bname}}</p>
        </div>
        <button @click="createNode">Erstellen</button>
    </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

export default {
    props: [ 'bname', 'existingNodes'],
    data: ()=> ({
        name: "",
        passwort: "",
        knotenName: "",
        values: [],

    }),
    components: {
    },
    methods:{
        profilSwitch(){
            this.$emit("profilSwitch")
        },
        createNode(){

            //erstelle checkbox Liste mit allen vorhandenen Knoten:
            let htmlStr = ""
            this.existingNodes.forEach(function(element){
                /*htmlStr +=  `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" name="node" id="${element.id}">
                                <label class="form-check-label" for="checkbox1">
                                    ${element.annotations[0].content}
                                </label>
                            </div>
                            `*/
                htmlStr +=  `<input class="form-check-input" type="checkbox" value="" name="node" id="${element.id}1">${element.annotations[0].content} \n`;
            });

            if(htmlStr == "")
                htmlStr = '<h3>Keine weiteren Knoten vorhanden</h3>'

            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlStr;

            //---------------------------------------------------------------------------------------
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
                if (result.value) {
                    this.knotenName = result.value[0];
                    this.existingNodes.forEach((elem) => {
                        if(elem.annotations[0].content.toUpperCase() == this.knotenName.toUpperCase()){
                            alert(this.knotenName + " existiert bereits")
                            this.createNode();
                        }
                    });

                    //checkbox daten zurück senden---------------------------------

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
            })
            
        },
    },
    watch:{
        existingNodes: function(){
            //alert(this.existingNodes[2].id)
        }
    }
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

#profil{
    display: flex;
    background-color: $div_color;
    width: 250px;
    height: 7em;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    border-radius: 1em;

    justify-content: center;
    align-items: center;
    flex-flow: column;

    &:hover {
        color: $hover_color_change;
        cursor: pointer;
    }
}

#profilBild{
    width: 4em;
    height: 4em;
   
    transition: font-size 0.8s;

    display: flex;
    justify-content: center;
    align-items: center;
}

#pb{
    width: 100%;
    border-radius: 5em;
    height: auto;
}

#name{
    margin: .5em;
}


</style>