import Character from '../Character';

describe('character module', () => {
  test('name checks', () => {
    expect(() => new Character('A')).toThrow('Длина параметра name не в интервале [2,10]');
    expect(() => new Character('AAAAAAAAAAA')).toThrow('Длина параметра name не в интервале [2,10]');
    expect(() => new Character(null)).toThrow('Параметр name не строка');
  });
  test('type checks', () => {
    expect(() => new Character('AB', 'BowermanZ')).toThrow(Error);
  });
  test ('all fields', () => {
    const name = 'AB';
    const type = 'Bowerman';
    const health = 100;
    const level = 1;
    const attack = undefined;
    const defence = undefined;
    const ch = new Character(name, type);
    expect(ch).toEqual({
      name, type, health, level, attack, defence
    })
  });
  test ('levelUp', () => {
    const ch = new Character("AB", "Bowerman");
    const levelBefore = ch.level;
    const attackBefore = ch.attack;
    const defenceBefore = ch.defence;
    ch.levelUp();
    expect(ch.health).toBe(100);
    expect(ch.level).toBe(levelBefore + 1);
    expect(ch.attack).toBe(attackBefore + 20);
    expect(ch.defence).toBe(defenceBefore + 20);
  });
  test ('levelUp checks', () => {
    const ch = new Character("AB", "Bowerman");
    ch.health = 0;
    expect(() => ch.levelUp()).toThrow("Нельзя повысить левел умершего");
  });
  test ('damage', () => {
    const ch = new Character("AB", "Bowerman");
    ch.health = 80;
    ch.attack = 30;
    ch.defence = 50;
    ch.damage(50);
    expect(ch.health).toBe(55);
  });
  test ('damage that health is no lower 0', () => {
    const ch = new Character("AB", "Bowerman");
    ch.health = 80;
    ch.attack = 30;
    ch.defence = 50;
    ch.damage(200);
    expect(ch.health).toBe(0);
  })
})