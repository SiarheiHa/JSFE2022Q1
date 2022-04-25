const data = ['element0', 'element1', 'element2', 'element3', 'element4', 'element5', 'element6', 'element7']

const countElements = 3
const randomInteger = () => {
  const rand = Math.random() * 8;
  return Math.floor(rand);
}

const getRandomArrayOfNumbers = () => {
  const randomArrayOfNumbers = []

  while (randomArrayOfNumbers.length < countElements) {
  let randomNumber = randomInteger()
  if (!randomArrayOfNumbers.includes(randomNumber)) {
    randomArrayOfNumbers.push(randomNumber)   
  }    
}
  return randomArrayOfNumbers
}

let previosArrayOfNumbers = [0, 1, 2]


const getCurrentArrayOfNumbers = () => {
  let currentArrayOfNumbers = getRandomArrayOfNumbers()
  while(
  [...new Set(previosArrayOfNumbers.concat(currentArrayOfNumbers))].length !== 2 * countElements
) {    
  currentArrayOfNumbers = getRandomArrayOfNumbers()
}
  previosArrayOfNumbers = currentArrayOfNumbers  
  return currentArrayOfNumbers  
}

const getRandomDataArray = () => {
  let currentArrayOfNumbers = getCurrentArrayOfNumbers()
  console.log(currentArrayOfNumbers)
  const randomDataArray = []  
  currentArrayOfNumbers.forEach(i => randomDataArray.push(data[i]))
  return randomDataArray
}


console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())
console.log (getRandomDataArray())




