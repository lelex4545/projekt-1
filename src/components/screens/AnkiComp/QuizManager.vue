<template>
<div>
    <div id="quizManagerItem">
        <textarea id="questionManager" v-model="card.question" readonly></textarea>
        <button id="deleteBtn" @click="deleteEvent">
            Delete
        </button>
        <button id="editBtn" @click="editEvent">
            Edit
        </button>
    </div>
    <transition v-if="editClicked" name="slide-fade" appear mode="out-in">
        <div id="quizContainer" class="quizContainerEXTRA">
            <div id="question">
                <span id="questionH" class="unmarkable">Frage</span>
                <textarea id="questionEdit" v-model="question"></textarea>
            </div>
            <div id="answer">
                <span id="answerH" class="unmarkable">Antwort</span>
                <textarea id="answerEdit" v-model="answer" placeholder='card.answer'></textarea>
            </div>
            <div id="buttonBox">
                <button id="btnD" @click="abbortEvent">Abbrechen</button>
                <button id="btnS" @click="saveEvent">Speichern</button>
            </div>
    </div>
    </transition>
</div>
</template>

<script>
export default {
    name: 'QuizManager',
    props: ['card'],
    data: () => ({
        deleteQuestion: false,
        editClicked: false,
        question: "",
        answer: ""
    }),
    methods: {
        editEvent: function() {
            if(!this.editClicked){
                this.question = this.card.question
                this.answer = this.card.answer
                this.editClicked = true
            }else this.editClicked = false
        },
        deleteEvent: function() {
            this.$swal.fire({
                title: 'Sind Sie sich sicher?',
                text: "Die Frage wird für immer gelöscht werden!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Abbrechen',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Löschen'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal.fire('Gelöscht!','','success')
                    this.$emit('deleteEvent', this.card.id)
                }
            })
        },
        saveEvent: function() {
            this.editClicked = false
            this.$emit('saveEvent', this.card.id, this.question, this.answer)
        },
        abbortEvent: function(){
            this.editClicked = false
        }
    }
    
}
</script>

<style lang="scss" scoped>
#quizManagerItem{
    border: 1px solid black;
    border-radius: .75em;
    width: 30em;
    height: 2em;

    padding: 2em;
    margin: 0 0 .5em 0;

    background-color: #12232E;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
    
}
#quizManagerItem>div{
    border-radius: .75em;
    margin: 1em 0 1em 0;
    color: black;
    background: #EEFBFB;
    overflow: hidden;
}
#questionManager{ 
    border: 1px solid black;
    border-radius: .75em;
    background: #EEFBFB;
    padding: 1em;
    width: 22em;
    resize: none;
    outline: 1;
}
#quizManagerItem>button{
    border: 1px solid black;
    border-radius: .75em;
    background: #EEFBFB;
    padding: 1.6em;
}
.quizContainerEXTRA{
    margin-top: 1em;
    margin-bottom: 1em;
}
#editBtn{
    
}
#deleteBtn{

}
</style>