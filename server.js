    const API_URL = "https://dry-cliffs-94979.herokuapp.com/";    

    let currentPage = 1;
    
    const ITEMS_PAGE = 6;


    
    // Filtro por palavras
    const filterData = (input, places) => {
        console.log(places.name)
        return places.filter(places => places.name.toLowerCase().includes(input.value.toLowerCase()))
    }
    
    // Paginação de itens por pagina
    const paginateData = (data) => {
        return data.reduce((total, current, index) =>{
            const ArrayIndex = Math.ceil((index + 1) / ITEMS_PAGE) -1;
            total[ArrayIndex] ? total[ArrayIndex].push(current) : total.push([current]);
    
            return total;
        }, [])
    }
    
    // Consumir os dados da api
    const fetchAPI = async (url) => {
        let response = await fetch(url)
        const TextResponse = await response.text()
    
        return JSON.parse(TextResponse)
    }
    
    // Alteração na pagina
    const changePage = (pageToRender) => {
        currentPage = pageToRender
        renderPage()
    }
    
    // Menu de paginação
    const renderMenu = (paginatedData) => {
    
        const paginationContainer = document.querySelector('.pagination')
        // Remove itens da pagina atual, para poder carregar a proxima
        while(paginationContainer.firstChild){
            paginationContainer.removeChild(paginationContainer.firstChild)
        }
        // Botão anterior
        const previous = document.createElement('button')
        previous.className = 'change'
        previous.innerHTML = '<'
        previous.addEventListener('click', () => currentPage <= 1 ? () => { } : changePage
        (currentPage - 1))
    
        paginationContainer.appendChild(previous)
    
        paginatedData.forEach((_, index) => {
    
            const Button = document.createElement('button')
            Button.innerHTML = index + 1
            Button.addEventListener('click', () => changePage(index +1))
    
            if(currentPage == index + 1){
                Button.className = 'active'
            }
    
            paginationContainer.appendChild(Button)
        });
        // Botão próximo
        const next = document.createElement('button')
        next.className = 'change'
        next.innerHTML = '>'
        next.addEventListener('click', () => currentPage >= paginatedData.length
        ? () => {} : changePage(currentPage + 1),
        );
    
        paginationContainer.appendChild(next)
    };
    
    // Renderização
    const renderPage = async () => {
        const apiData = await fetchAPI(API_URL)
    
    
        const search = document.querySelector('#filter')
        let filterApi = filterData(search, apiData)
        console.log(filterApi)
    
        const searchButton = document.querySelector('#search-button')
        searchButton.addEventListener('click', () => {
            filterApi = filterData(search, apiData)
            renderPage()
        })
    
       
    const paginatedData = paginateData(filterApi)
   
    
    renderMenu(paginatedData);
    
    cardContainer = document.querySelector(".card-container")
    
    //Esvazia o container de cards
    while(cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild)
    }
    
     //Iteração por itens da página anterior para criar os cards
    paginatedData[currentPage - 1].forEach(aps => {
    
    
    //Inserção de cada filho no seu respectivo pai
        cardInfo = document.createElement("div");
        cardInfo.className = "card-info"
    
        card = document.createElement("div");
        card.className = "card"
    
        cardImg = document.createElement("img");
        cardImg.className = "img"
        cardImg.src = aps.photo
    
        Tipo = document.createElement("div");
        Tipo.className = "tipo";
        Tipo.innerHTML = aps.property_type;
    
    
        Preco = document.createElement("div");
        Preco.className = "preco";
        Preco.innerHTML = `R$ ${aps.price.toFixed(2)}/noite`
    
    
        Name = document.createElement("div");
        Name.className = "name";
        Name.innerHTML = aps.name;
    
        cardContainer.appendChild(card);
        card.appendChild(cardImg);
        card.appendChild(cardInfo);
        cardInfo.appendChild(Name)
        cardInfo.appendChild(Tipo)
        cardInfo.appendChild(Preco)
    
    })
    
    }
    renderPage()
    