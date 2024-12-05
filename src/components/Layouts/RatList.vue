<script setup>
import { useRats } from '@/composables/useRats';

const {rats} = useRats();

</script>

<template>
    <ul class="rat-list">
      <li class="rat-list-item" v-for="rat in rats" :key="rat.id">
        <span>
            <h2>{{ rat.name }} in {{  rat.areaOfMalmo }}</h2>
            <p>Primary Skill: {{ rat.primarySkill }}</p>
            <p>Other Skills: {{ rat.skills.map(skill => skill).join(', ') }}</p>
            <p>Available? {{ rat.availability ? 'Yes' : 'No' }}</p>     
            <p>Renter: {{ rat.renter }}</p>
        </span>
        <span>
            <img :src="rat.imgUrl" alt="rat-image" class="rat-image">
            <p>Hourly Rate: {{ rat.price }}:-</p>
        </span>
      </li>
    </ul>

</template>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box ;
    }

    .rat-list{
        height: 100%;
        overflow-y: auto; /* Enable vertical scrolling if content overflows */
    }

    .rat-list::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Edge */
    }

    .rat-list-item {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: space-between;
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
        width: 500px;
    }

    .rat-image {
        width: 100px;
        border-radius: 100%;
    }
</style>