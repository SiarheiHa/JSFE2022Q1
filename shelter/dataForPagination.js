const data = [
    'el0',
    'el1',
    'el2',
    'el3',
    'el4',
    'el5',
    'el6',
    'el7',
    ]
    
    let countOfItems = 48
    let cardsPerPage = 3
    
    const shuffle = (array) => {
      let tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }
    
    const getDataForPagination = (data, countOfItems, cardsPerPage) => {
      let arr = []
      let result = []
      while(arr.length < countOfItems) {
        arr = arr.concat(data)
      }
    for (let i = 0; i < arr.length / cardsPerPage; i++) {
      let subarr = arr.slice((i*cardsPerPage), (i*cardsPerPage) + cardsPerPage)
      subarr = shuffle(subarr)
      result = result.concat(subarr)
    }  
      return result
    }
    
    let dataForPagination = getDataForPagination(data, countOfItems, cardsPerPage)
    
    console.log(dataForPagination)