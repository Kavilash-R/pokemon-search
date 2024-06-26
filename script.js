fetchData();
async function fetchData() {
  try {
    const searchElement = document.getElementById("search");
    const errorName = document.getElementById("alter");
    const errorNumber = document.getElementById("alter-number");
    const pokeImg = document.getElementById("pokemon");
    const pokeName = document.getElementById("poke-name");
    const pokeHeight = document.getElementById("poke-height");
    const pokeWeight = document.getElementById("poke-weight");
    const pokehp = document.getElementById("poke-hp");
    const pokepPower = document.getElementById("poke-power");
    const pokeType = document.getElementById("poke-power-type");
    const info = document.getElementById("info");
    const pokeInfo = document.getElementById("poke-info");

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchElement.value.toLowerCase()}`
    );

    errorName.style.display = "none";
    errorNumber.style.display = "none";

    if (!response.ok) {
      // errorName.textContent = "invalid pokemon";
      pokeImg.style.display = "none";
      if (searchElement.value >= 1025) {
        errorNumber.style.display = "block";
      } else {
        errorName.style.display = "block";
      }

      pokeName.style.display = "none";
      pokeHeight.style.display = "none";
      pokeWeight.style.display = "none";
      pokehp.style.display = "none";
      pokepPower.style.display = "none";
      pokeType.style.display = "none";
      info.style.display = "none";
      pokeInfo.style.display = "none";

      throw new Error("we could not fetch this");
    }
    const data = await response.json();
    // console.log(data);

    // for svg img (not every pokemon has a svg photo ) => const pokeImage = await data.sprites.other.dream_world.front_default;

    const pokeImage1 = data.sprites.other.dream_world.front_default;
    const pokeImage2 = data.sprites.front_default;
    if (pokeImage1) {
      pokeImg.src = pokeImage1;
    }
    if (!pokeImage1) {
      pokeImg.src = pokeImage2;
    }
    const poketypes = data.types.map((element) => element.type.name);

    pokeName.textContent = `Name:  ${data.name.toUpperCase()}`;
    pokeHeight.textContent = `Height:  ${data.height / 10} meters `;
    pokeWeight.textContent = `Weight:  ${data.weight / 10} kgs`;
    pokehp.textContent = `HP:  ${data.stats[0].base_stat}`;
    pokepPower.textContent = `Power Level:  ${data.stats[1].base_stat}`;
    pokeType.textContent = `Type: ${poketypes}`;
    pokeType.style.overflow = "auto";
    // data.types[0].type.name

    if (!response.ok) {
      pokeImg.style.display = "none";
    }
    if (response.ok) {
      pokeImg.style.display = "block";
      pokeName.style.display = "block";
      pokeHeight.style.display = "block";
      pokeWeight.style.display = "block";
      pokehp.style.display = "block";
      pokepPower.style.display = "block";
      pokeType.style.display = "block";
      info.style.display = "none";
      pokeInfo.style.display = "none";
    }
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
}
