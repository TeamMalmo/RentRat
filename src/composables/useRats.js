const rats = [
    {
        "name": "Calle",
        "id": "rat-001",
        "primarySkill": "assemble furniture",
        "skills": ["cook", "clean"],
        "price": 120,
        "availability": true,
        "areaOfMalmo": "Värnhem",
        "imgUrl": "https://example.com/rat-001.jpg"
    },
    {
        "name": "Lisa",
        "id": "rat-002",
        "primarySkill": "clean",
        "skills": ["cook", "do laundry"],
        "price": 150,
        "availability": false,
        "areaOfMalmo": "Möllevången",
        "imgUrl": "https://example.com/rat-002.jpg"
    },
    {
        "name": "Erik",
        "id": "rat-003",
        "primarySkill": "cook",
        "skills": ["clean", "organize"],
        "price": 100,
        "availability": true,
        "areaOfMalmo": "Slottsstaden",
        "imgUrl": "https://example.com/rat-003.jpg"
    },
    {
        "name": "Klara",
        "id": "rat-004",
        "primarySkill": "paint",
        "skills": ["clean", "cook"],
        "price": 130,
        "availability": true,
        "areaOfMalmo": "Limhamn",
        "imgUrl": "https://example.com/rat-004.jpg"
    },
    {
        "name": "Olle",
        "id": "rat-005",
        "primarySkill": "laundry",
        "skills": ["clean", "assemble furniture"],
        "price": 140,
        "availability": false,
        "areaOfMalmo": "Rosengård",
        "imgUrl": "https://example.com/rat-005.jpg"
    },
    {
        "name": "Sofia",
        "id": "rat-006",
        "primarySkill": "clean",
        "skills": ["paint", "cook"],
        "price": 125,
        "availability": true,
        "areaOfMalmo": "Hyllie",
        "imgUrl": "https://example.com/rat-006.jpg"
    },
    {
        "name": "Jonas",
        "id": "rat-007",
        "primarySkill": "paint",
        "skills": ["clean", "paint"],
        "price": 110,
        "availability": true,
        "areaOfMalmo": "Kirseberg",
        "imgUrl": "https://example.com/rat-007.jpg"
    },
    {
        "name": "Hanna",
        "id": "rat-008",
        "primarySkill": "cook",
        "skills": ["cook", "carry items"],
        "price": 160,
        "availability": false,
        "areaOfMalmo": "Triangeln",
        "imgUrl": "https://example.com/rat-008.jpg"
    },
    {
        "name": "Fredrik",
        "id": "rat-009",
        "primarySkill": "clean",
        "skills": ["clean", "wash windows"],
        "price": 105,
        "availability": true,
        "areaOfMalmo": "Oxie",
        "imgUrl": "https://example.com/rat-009.jpg"
    },
    {
        "name": "Emma",
        "id": "rat-010",
        "primarySkill": "laundry",
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

    return { rats: updatedRats };
}


