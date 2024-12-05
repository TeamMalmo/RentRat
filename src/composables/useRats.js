const rats = [
    {
        "name": "Calle",
        "id": "rat-001",
        "skills": ["cook", "clean"],
        "price": 120,
        "availability": true,
        "areaOfMalmo": "Värnhem",
        "imgUrl": "https://example.com/rat-001.jpg"
    },
    {
        "name": "Lisa",
        "id": "rat-002",
        "skills": ["cook", "do laundry"],
        "price": 150,
        "availability": false,
        "areaOfMalmo": "Möllevången",
        "imgUrl": "https://example.com/rat-002.jpg"
    },
    {
        "name": "Erik",
        "id": "rat-003",
        "skills": ["clean", "organize"],
        "price": 100,
        "availability": true,
        "areaOfMalmo": "Slottsstaden",
        "imgUrl": "https://example.com/rat-003.jpg"
    },
    {
        "name": "Klara",
        "id": "rat-004",
        "skills": ["clean", "cook"],
        "price": 130,
        "availability": true,
        "areaOfMalmo": "Limhamn",
        "imgUrl": "https://example.com/rat-004.jpg"
    },
    {
        "name": "Olle",
        "id": "rat-005",
        "skills": ["clean", "assemble furniture"],
        "price": 140,
        "availability": false,
        "areaOfMalmo": "Rosengård",
        "imgUrl": "https://example.com/rat-005.jpg"
    },
    {
        "name": "Sofia",
        "id": "rat-006",
        "skills": ["paint", "cook"],
        "price": 125,
        "availability": true,
        "areaOfMalmo": "Hyllie",
        "imgUrl": "https://example.com/rat-006.jpg"
    },
    {
        "name": "Jonas",
        "id": "rat-007",
        "skills": ["clean", "paint"],
        "price": 110,
        "availability": true,
        "areaOfMalmo": "Kirseberg",
        "imgUrl": "https://example.com/rat-007.jpg"
    },
    {
        "name": "Hanna",
        "id": "rat-008",
        "skills": ["cook", "carry items"],
        "price": 160,
        "availability": false,
        "areaOfMalmo": "Triangeln",
        "imgUrl": "https://example.com/rat-008.jpg"
    },
    {
        "name": "Fredrik",
        "id": "rat-009",
        "skills": ["clean", "wash windows"],
        "price": 105,
        "availability": true,
        "areaOfMalmo": "Oxie",
        "imgUrl": "https://example.com/rat-009.jpg"
    },
    {
        "name": "Emma",
        "id": "rat-010",
        "skills": ["organize", "cook"],
        "price": 145,
        "availability": true,
        "areaOfMalmo": "Södervärn",
        "imgUrl": "https://example.com/rat-010.jpg"
    }
];

// useRats.js
export function useRats() {
    const assignImgUrl = (rats) => {
        return rats.map((rat) => {

            return rat;
        });
    };

    const updatedRats = assignImgUrl(rats);

    return { rats: updatedRats };
}

