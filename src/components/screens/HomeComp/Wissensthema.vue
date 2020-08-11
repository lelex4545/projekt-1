<template>
    <div>
        <WissensthemaItem
            v-for="thema in themen"
            :key="thema.id"
            :item="thema"
            id= "thema"
            @addThema="addThemaItem"
        />
    </div>
</template>

<script>
import WissensthemaItem from "./WissensthemaItem";
export default {
    name: "Wissensthema",
    components: {
        WissensthemaItem
    },
    data: () => ({
        themen: [{id: 0, name: "+"}]
    }),
    methods: {
        addThemaItem () {
            if(this.themen.length < 12)
                this.themen.unshift({id: this.themen.length, name: "-"})
        }
    }
};
</script>

<style>
#thema{
    display: flex;
    background-color: rgb(30, 39, 80);
    width: 12em;
    height: 1.5em;
    margin-top: 1em;
    border: .5px solid black;
    border-radius: 0.5em;
    align-items: center;
    justify-content: center;
}

</style>