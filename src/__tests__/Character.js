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
    const level = 2;
    const attack = 30;
    const defence = 55;
    const ch = new Character(name, type, health, level, attack, defence);
    expect(ch.name).toBe(name);
    expect(ch.type).toBe(type);
    expect(ch.health).toBe(health);
    expect(ch.level).toBe(level);
    expect(ch.attack).toBe(attack);
    expect(ch.defence).toBe(defence);
  });
  test ('levelUp', () => {
    const health = 80;
    const level = 2;
    const attack = 30;
    const defence = 55;
    const ch = new Character("AB", "Bowerman", health, level, attack, defence);
    ch.levelUp();
    expect(ch.health).toBe(100);
    expect(ch.level).toBe(level + 1);
    expect(ch.attack).toBe(attack + 20);
    expect(ch.defence).toBe(defence + 20);
  });
  test ('levelUp checks', () => {
    const health = 0;
    const level = 2;
    const attack = 30;
    const defence = 55;
    const ch = new Character("AB", "Bowerman", health, level, attack, defence);
    expect(() => ch.levelUp()).toThrow("Нельзя повысить левел умершего");
  });
  test ('damage', () => {
    const health = 80;
    const defence = 50;
    const ch = new Character("AB", "Bowerman", health, 1, 30, defence);
    ch.damage(50);
    expect(ch.health).toBe(55);
  });
  test ('damage that health is no lower 0', () => {
    const health = 80;
    const defence = 50;
    const ch = new Character("AB", "Bowerman", health, 1, 30, defence);
    ch.damage(200);
    expect(ch.health).toBe(0);
  })
})