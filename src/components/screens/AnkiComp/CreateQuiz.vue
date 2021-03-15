<template>
    <div id="quizContainer">
        <div id="question">
            <span id="questionH" class="unmarkable">Frage</span>
            <textarea id="questionEdit" v-model="question" placeholder="Can you ask me a question?"></textarea>
        </div>
        <div id="answer">
            <span id="answerH" class="unmarkable">Antwort</span>
            <textarea id="answerEdit" v-model="answer" placeholder="Insert answer here :)"></textarea>
        </div>
        <div id="buttonBox">
            <button class="btnD" @click="resetEvent" :class="{'btnEmpty': empty}">Verwerfen</button>
            <button id="btnS" @click="createMethod">Speichern</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateQuiz',
    data: () => ({
        question: "",
        answer: ""
    }),
    computed: {
        empty: function(){
            return this.question === "" && this.answer === "" ? true : false
        },
    },
    methods: {
        //Methode wo die Eingabefelder geleert werden
        resetEvent: function(){
          if(!this.empty)
            this.$swal.fire({
                title: 'Sind Sie sich sicher?',
                text: "Möchten Sie den aktuellen Stand verwerfen?",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Abbrechen',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Verwerfen'
            }).then((result) => {
            if (result.isConfirmed) {
                this.$swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                this.question = "";
                this.answer = ""
                }
            })
        },
        //Methode zum erstellen einer Karte
        createMethod: function() {
            if(this.question !== "" && this.answer !== ""){
                this.$emit('createCardEvent',this.question,this.answer)
                this.$swal.fire({
                    position: 'bottom',
                    icon: 'success',
                    title: 'Gespeichert',
                    showConfirmButton: false,
                    timer: 500
                })
                this.question = ""
                this.answer = ""
                return
            }
            if(this.question === "" && this.answer === "") {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Antwort- und Fragefeld dürfen nicht leer sein'
                })
                return
            }
            else if(this.question === "") 
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Das Fragefeld darf nicht leer sein!'
                })
            else if(this.answer === "")
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Das Antwortfeld darf nicht leer sein!'
                })
        }
    }
}
</script>

<style lang="scss">
.btnD{
    background: #b64137;
    cursor: pointer;
    &:hover{
        background:  #8a3129;
    }
    &:focus {
        background:  #8a3129;
        outline: 0;
    }
}
#btnS{
    background:  #78b662;
    cursor: pointer;
    &:hover{
        background:  #598648;
    }
    &:focus {
        background:  #598648;
        outline: 0;
    }
}
#questionEdit{
    flex: 1;
    resize: none;
    border: none;
    background: transparent;
    text-align: center;
}
#answerEdit{
    position: relative;
    flex: 6;
    resize: none;
    border: none;
    background: transparent;
    text-align: center;
}
.btnEmpty{
    background: #61241f;
    cursor: default;
    &:hover{
        background:  #61241f;
    }
    &:focus {
        background:  #61241f;
        outline: 0;
    }
}
</style>