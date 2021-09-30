const getGQL = url => (query, variables) =>
  fetch('http://shop-roles.asmer.fs.a-level.com.ua/graphql', {   
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({query, variables})
  }).then(res => res.json())    

let gql = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')
gql(
  `query qcategory {
    CategoryFind(query: "[{}]") {
    _id
    name
    goods{
      name,
      description
      images{
        url
      }
      price
    }
  }}`,
  {
    query: JSON.stringify([{}])
  }).then(data => addCategory(data.data.CategoryFind))

  function addCategory(data) {
    data.forEach(element => {
      let option = document.createElement("option");
      categories.appendChild(option);
      option.innerHTML = element.name;
      categories.onchange = function() {
        result.innerHTML = "";
        addGoods(data, this.value);
      };
    });
  }
  function addGoods(data, selectOption) {
    data.forEach(option => {
      if (option.goods !== null) {
        if (selectOption === option.name) {
          for (let goods of option.goods) {
            let good = document.createElement("div");
            let nameGood = document.createElement("h2");
            let photo = document.createElement("img");
            let description = document.createElement('p')
            let priceGood = document.createElement("h4")
            good.id = 'block'
            result.appendChild(good);
            good.appendChild(nameGood);
            good.appendChild(photo);
            good.appendChild(description);
            good.appendChild(priceGood);
            nameGood.innerText = goods.name;
            photo.src = `http://shop-roles.asmer.fs.a-level.com.ua/${goods.images[0].url}` ;
            nameGood.classList.add('goods')
            photo.classList.add('photo')
            description.textContent = goods.description
            priceGood.textContent = `Цена ${goods.price} грн`                            
          }
        }
      }
    });
  }


