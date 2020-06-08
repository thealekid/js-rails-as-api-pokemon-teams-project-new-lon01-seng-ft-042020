const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



const parseJSON = (data) =>{
    return data.json();
}

const createPokemonItem = (pokemon) =>{
    const pokemonItem = document.createElement("li")
    pokemonItem.innerText = `${pokemon.nickname} (${pokemon.species})`
        
        const releaseButton = document.createElement("button");
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton.setAttribute("data-pokemon-id", pokemon.id)

        releaseButton.addEventListener("click", event =>{
            let formData = {
                pokemonId: pokemon.id
              };
               
              let configObj = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Accepts": "application/json"
                },
                body: JSON.stringify(formData)
              };

              fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
              .then(parseJSON)
              .then(responsePokemon =>{
                  if (pokemon.id == responsePokemon.id) {
                      event.target.parentElement.remove();
                  }
              })
        })


        pokemonItem.appendChild(releaseButton)

    return pokemonItem
}

const createPokemonList = (trainer) => {
    const pokemonList = document.createElement("ul")
    trainer.pokemons.forEach(pokemon =>{
        pokemonList.appendChild(createPokemonItem(pokemon))
    })
   return pokemonList
}



const createAddPokemonButton = (trainer) =>{
    const addPokemonButton = document.createElement("button")
    addPokemonButton.innerText = "Add Pokemon";
    addPokemonButton.className = "addPokemon"
    addPokemonButton.setAttribute("data-trainer-id", trainer.id)

    addPokemonButton.addEventListener("click", event =>{
        let formData = {
            trainerId: trainer.id
          };
           
          let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify(formData)
          };
           
          fetch(`http://localhost:3000/trainers/${trainer.id}/add-pokemon`, configObj)
          .then(parseJSON)
          .then(pokemon =>{
            const pokemonItem = createPokemonItem(pokemon)
            const trainerCard = event.target.parentElement
            const pokemonList = trainerCard.querySelector("ul")
            pokemonList.appendChild(pokemonItem)
            // event.target.parentElement.style.background = "red"

          })

          })

    return addPokemonButton   

}





document.addEventListener("DOMContentLoaded", event=>{


   return fetch(TRAINERS_URL)
        .then(response =>{
            return response.json()
        })
        .then(trainerArray =>{
            console.log(trainerArray)
            trainerArray.forEach(trainer => {
                console.log(trainer)

                const trainerCardDiv = document.createElement("div")
                trainerCardDiv.className = "card"
                trainerCardDiv.setAttribute("data-id", trainer.id)
                    const trainerNameP = document.createElement("p")
                    trainerNameP.innerText = trainer.name;
                    trainerCardDiv.appendChild(trainerNameP);

                    if (trainer.pokemons.length < 6) {
                        trainerCardDiv.appendChild(createAddPokemonButton(trainer))
                    }

                    trainerCardDiv.appendChild(createPokemonList(trainer))        
                
                const mainSection = document.querySelector("main")
                mainSection.appendChild(trainerCardDiv)    

            });
        })
    


})