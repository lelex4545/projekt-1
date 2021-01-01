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
            <button id="btnD" @click="resetEvent">Verwerfen</button>
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
    methods: {
        resetEvent: function(){
            this.question = "";
            this.answer = ""
        },
        createMethod: function() {
            if(this.question !== "" && this.answer !== ""){
                this.$emit('createCardEvent',this.question,this.answer)
            }
        }
    }
}
</script>

<style lang="scss">
#btnD{
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
</style>