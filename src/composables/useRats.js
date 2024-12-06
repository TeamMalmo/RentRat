import { ratsApi } from '../services/ratsApi'
import { ref } from 'vue'

// useRats.js
export function useRats() {
    const rats = ref([])
    const isLoading = ref(false)
  
    async function fetchRats() {
      isLoading.value = true
      try {
        rats.value = await ratsApi.fetchRats()
      } catch (error) {
        console.error('Error fetching rats:', error)
      } finally {
        isLoading.value = false
        console.log(rats.value);
      }
    }
  
    async function addRat(title) {
      const newRat = {
        id: `rat${Date.now()}`,
        title,
      }
  
      try {
        rats.value = await ratsApi.createRat(newRat)
        return true
      } catch (error) {
        console.error('Error adding rat:', error)
        return false
      }
    }
  
    async function updateRat(id, title) {
      try {
        rats.value = await ratsApi.updateRat(id, { title })
        return true
      } catch (error) {
        console.error('Error updating rat:', error)
        return false
      }
    }
  
    async function deleteRat(id) {
      try {
        rats.value = await ratsApi.deleteRat(id)
        return true
      } catch (error) {
        console.error('Error deleting rat:', error)
        return false
      }
    }
  

    const assignImgUrl = (rats) => {
        return rats.value.map((rat) => {
            // Check the primarySkill and assign the corresponding image
            switch (rat.primarySkill) {
                case "cook":
                    rat.imgUrl = "/images/cook.png";
                    break;
                case "clean":
                    rat.imgUrl = "/images/clean.png";
                    break;
                case "laundry":
                    rat.imgUrl = "/images/laundry.png";
                    break;
                case "paint":
                    rat.imgUrl = "/images/paint.png";
                    break;
                default:
                    rat.imgUrl = "/images/default.png";  // Fallback image
                    break;
            }
            return rat;
        });
    };

    const updatedRats = assignImgUrl(rats);

    return { 
        rats: updatedRats,    
        isLoading,
        fetchRats,
        addRat,
        updateRat,
        deleteRat, };
}


