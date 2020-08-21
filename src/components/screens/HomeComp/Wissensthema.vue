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

<style lang="scss">
@import "@/assets/theme.scss";

#thema{
    display: flex;
    background-color: $div_color;
    width: 14em;
    height: 1.5em;
    margin-top: 1em;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    border-radius: 0.5em;
    align-items: center;
    justify-content: center;
}

</style>