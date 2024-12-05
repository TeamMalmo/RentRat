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

    h2{
        font-weight: 100;
    }

    .rat-list{
        height: 100%;
        width: 600px;
        overflow-y: auto; /* Enable vertical scrolling if content overflows */
        display: flex;
        flex-direction: column; 
        align-items: center;
        gap: 0.5rem;
    }

    .rat-list::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Edge */
    }

    .rat-list-item {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-content: space-between;
        border-radius: 0.5rem;
        padding: 0.5rem;
        /* margin: 0.5rem; */
        width: 500px;
        text-transform:lowercase;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        background-color: #8ACE00;
    }

    .rat-list-item:hover{
        transform: scale(1.05);
        transition: 0.2s ease-in-out;
    }

    .rat-image {
        width: 100px;
        border-radius: 100%;
    }
</style>