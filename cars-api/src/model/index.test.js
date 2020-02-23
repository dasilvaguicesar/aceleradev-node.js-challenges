// Unit Tests Scenarios for Model of Cars API
// Alterar linhas (38,39,40 e 60,61,62) model/index.js )

const constantDate = new Date("2020-01-28T12:57:00.550Z")

global.Date = class extends Date {
  constructor() {
    return constantDate;
  }
}

const {populateDB} = require('../../tests/utils')

const { cars: {
  findAll,
  findById,
  update,
  create,
  destroy
} } = require('./index')

describe('Method findAll should...', () => {
  beforeEach(() => {
    populateDB({"CAR1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "car_model": "Herbie",
        "description": "Herbie, o meu fusca TURBINADO",
        "company": "Volkswagen",
        "price": "US$ 25.000,00",
        "year": "1974",
        "color": "Branco com umas listras top",
        "image_url": "Sem tempo, irmão."
      }
    })
  })
  test('list a object', async () => {
    expect(await findAll()).toStrictEqual(
        {"CAR1580216220549RD493": {
        "created_at": "2020-01-28T12:57:00.550Z",
        "updated_at": "2020-01-28T12:57:00.550Z",
        "car_model": "Herbie",
        "description": "Herbie, o meu fusca TURBINADO",
        "company": "Volkswagen",
        "price": "US$ 25.000,00",
        "year": "1974",
        "color": "Branco com umas listras top",
        "image_url": "Sem tempo, irmão."
      }
    })
  })
})

describe('Method findById should...', () => {
  test('return by ID', async () => {
    expect(await findById('CAR1580216220549RD493')).toStrictEqual({
      "created_at": "2020-01-28T12:57:00.550Z",
      "updated_at": "2020-01-28T12:57:00.550Z",
      "car_model": "Herbie",
      "description": "Herbie, o meu fusca TURBINADO",
      "company": "Volkswagen",
      "price": "US$ 25.000,00",
      "year": "1974",
      "color": "Branco com umas listras top",
      "image_url": "Sem tempo, irmão."
    })
  })
})

describe('Method update should...', () => {
  test('return a object updated',async () => {
    expect(await update({
      "created_at": "2020-01-28T12:57:00.550Z",
      "updated_at": "2020-01-28T12:57:00.550Z",
      "car_model": "Montana",
      "description": "Montana Sport 1.8",
    },
    "CAR1580216220549RD493"
  )).toStrictEqual({
    "created_at": "2020-01-28T12:57:00.550Z",
    "updated_at": "2020-01-28T12:57:00.550Z",
    "car_model": "Montana",
    "description": "Montana Sport 1.8",
    "company": "Volkswagen",
    "price": "US$ 25.000,00",
    "year": "1974",
    "color": "Branco com umas listras top",
    "image_url": "Sem tempo, irmão."
  })
  })
})

describe('Method create should...', () => {
  test('a new object', async () => {
    expect(await create({
      car_model: 'Corsa',
      description: 'Corsa Joy',
      company: 'GM',
      price: 'R$ 14.000,00',
      year: 2006,
      color: 'Gold',
      image_url: null
    })).toStrictEqual({
    created_at: new Date("2020-01-28T12:57:00.550Z"),
    updated_at: new Date("2020-01-28T12:57:00.550Z"),
    car_model: 'Corsa',
    description: 'Corsa Joy',
    company: 'GM',
    price: 'R$ 14.000,00',
    year: 2006,
    color: 'Gold',
    image_url: null})
  })
})

describe('Method destroy should...', () => {
  test('remove a object', async () => {
    expect(await destroy("CAR1580216220549RD493")).toStrictEqual({})
  })
})


// Solução da Eve
// Unit Tests Scenarios for Model of Cars API

/* const { populateDB } = require('../../tests/utils')

const mockDate = new Date('2020-01-28T12:29:59.567Z')

global.Date = class extends Date {
  constructor() {
    return mockDate
  }
}

const { cars: {
  findAll,
  findById,
  update,
  create,
  destroy
} } = require('./index')

const data = {
  "CAR1580214599567RD121": {
    "created_at": "2020-01-28T12:29:59.567Z",
    "updated_at": "2020-01-28T12:29:59.567Z",
    "car_model": "Relâmpago Marquinhos",
    "description": "O carro mais dahora do mundo.",
    "company": "Disney",
    "price": "US$ 99.000,00",
    "year": "2008",
    "color": "Vermelho BOLADO",
    "image_url": "Sem tempo, irmão."
  },
  "CAR1580216220549RD493": {
    "created_at": "2020-01-28T12:57:00.550Z",
    "updated_at": "2020-01-28T12:57:00.550Z",
    "car_model": "Herbie",
    "description": "Herbie, o meu fusca TURBINADO",
    "company": "Volkswagen",
    "price": "US$ 25.000,00",
    "year": "1974",
    "color": "Branco com umas listras top",
    "image_url": "Sem tempo, irmão."
  }
}

beforeEach(() => {
  populateDB(data)
})

describe('Method findAll should...', () => {
  test('return all data', async () => {
    const allCars = await findAll()

    expect(allCars).toEqual(data)
  })
})

describe('Method findById should...', () => {
  test('return data based on Id', async () => {
    const dataById = await findById('CAR1580216220549RD493')

    expect(dataById).toEqual(data['CAR1580216220549RD493'])
  })
})

describe('Method update should...', () => {
  test('update specific data', async () => {
    const updatedData = await update({
      car_model: 'Batmovel'
    }, 'CAR1580214599567RD121')

    expect(updatedData).toEqual({
      "created_at": "2020-01-28T12:29:59.567Z",
      "updated_at": new Date('2020-01-28T12:29:59.567Z'),
      "car_model": "Batmovel",
      "description": "O carro mais dahora do mundo.",
      "company": "Disney",
      "price": "US$ 99.000,00",
      "year": "2008",
      "color": "Vermelho BOLADO",
      "image_url": "Sem tempo, irmão."
    })
  })
})

describe('Method create should...', () => {
  test('create data', async () => {
    const newData = {
      "car_model": "Chevet",
      "description": "O carro mais dahora do mundo.",
      "company": "Disney",
      "price": "US$ 70.000,00",
      "year": "2010",
      "color": "Vermelho BOLADO",
      "image_url": "Sem tempo, irmão."
    }

    const expected = {
      ...newData,
      updated_at: new Date('2020-01-28T12:29:59.567Z'),
      created_at: new Date('2020-01-28T12:29:59.567Z')
    }

    const createdData = await create(newData)
    expect(createdData).toEqual(expected)
  })
})

describe('Method destroy should...', () => {
  test('remove data from json', async () => {
    const destroyedData = await destroy('CAR1580214599567RD121')

    expect(destroyedData).toEqual({})
  })
}) */