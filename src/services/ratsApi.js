import { CONFIG } from "@/constant/config"

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': CONFIG.JSONBIN_API_KEY,
}

export const ratsApi = {
  async fetchRats() {
    const response = await fetch(CONFIG.ITEMS_API_URL, { headers })
    const data = await response.json()
    return data.record.rats
  },

  async createRat(newRat) {
    const currentRats = await this.fetchRats()
    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        rats: [...currentRats, newRat],
      }),
    })
    const data = await response.json()
    return data.record.rats
  },

  async updateRat(id, updatedRat) {
    const currentRats = await this.fetchRats()
    const updatedRats = currentRats.map((rat) =>
      rat.id === id ? { ...rat, ...updatedRat } : rat,
    )

    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        rats: updatedRats,
      }),
    })
    const data = await response.json()
    return data.record.rats
  },

  async deleteRat(id) {
    const currentRats = await this.fetchRats()
    const filteredRats = currentRats.filter((rat) => rat.id !== id)

    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        rats: filteredRats,
      }),
    })
    const data = await response.json()
    return data.record.rats
  },
}