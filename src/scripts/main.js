import axios from 'axios';
import $ from 'jquery';
import './components/search-bar.js';

const main = () => {
  const baseUrl = 'https://api.opendota.com/api';
  const baseUrlHeroes = `${baseUrl}/heroes`;
  const searchElement = document.querySelector('search-bar');

  const fetchHero = async () => {
    const { data: dataRequest, status } = await axios.get(baseUrlHeroes);
    if (status !== 200) {
      throw new Error('Cannot fetch the data');
    }
    return dataRequest.sort((a, b) => a.localized_name.toLowerCase().localeCompare(b.localized_name.toLowerCase()));
  };

  const filterHeroes = (heroes) => {
    const query = searchElement.value.toLowerCase();
    const filteredHeroes = heroes.filter((hero) => hero.localized_name.toLowerCase().includes(query));
    console.log({ filteredHeroes, query });
    return filteredHeroes;
  };

  const renderHero = (heroes) => {
    const $heroes = $('#dota2-heroes');
    $heroes.empty();
    heroes.forEach((hero) => {
      const { id, name, primary_attr, localized_name, attack_type, roles, legs } = hero;
      const inisial = localized_name
        .split(' ')
        .map((item) => item[0])
        .join('');

      const component = `
      <div class="flex flex-col gap-3 bg-gray-800 rounded-md p-4">
        <div class="flex flex-row items-center gap-4">
        <div class="flex flex-row items-center justify-center bg-blue-500 font-bold text-white uppercase w-16 h-16 rounded-lg">
        ${inisial}
        </div>
          <div class="flex flex-col">
            <div class="text-xl text-white font-bold">${localized_name}</div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center justify-between">
            <div class="basis-40 text-xs text-gray-400">Primary Attribute</div>
            <div class="text-xs text-right text-white font-bold uppercase">${primary_attr}</div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <div class="basis-40 text-xs text-gray-400">Attack Type</div>
            <div class="text-xs text-right text-white font-bold uppercase">${attack_type}</div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <div class="basis-40 text-xs text-gray-400">Primary Roles </div>
            <div class="text-xs text-right text-white font-bold uppercase"> ${roles.join(', ')}</div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <div class="basis-40 text-xs text-gray-400">Legs </div>
            <div class="text-xs text-right text-white font-bold uppercase"> ${legs}</div>
          </div>
        </div>
      </div>
      `;
      $heroes.append(component);
    });
  };

  document.addEventListener('DOMContentLoaded', async () => {
    const heroes = await fetchHero();
    renderHero(heroes);

    searchElement.keyupEvent = (event) => {
      const query = event.target.value;
      const filteredHeroes = filterHeroes(heroes, query);
      renderHero(filteredHeroes);
    };
  });
};

export default main;
