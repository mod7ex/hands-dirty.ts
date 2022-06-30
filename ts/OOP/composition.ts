namespace Composition {
  namespace BAD {
    class Monster {
      constructor(protected name: string) {}

      attack() {
        console.log(`${this.name} attacked`);
      }

      walk() {
        console.log(`${this.name} walked`);
      }
    }

    class FlyingMonster extends Monster {
      constructor(protected override name: string) {
        super(name);
      }

      fly() {
        console.log(`${this.name} flew`);
      }
    }

    class SwimmingMonster extends Monster {
      constructor(protected override name: string) {
        super(name);
      }

      swim() {
        console.log(`${this.name} swam`);
      }
    }

    let bear = new Monster("bear");
    bear.attack();
    bear.walk();

    let eagle = new FlyingMonster("eagle");
    eagle.attack();
    eagle.walk();
    eagle.fly();

    let shark = new SwimmingMonster("shark");
    shark.attack();
    shark.walk();
    shark.swim();

    // imagine we want a monster that flies and swims so ?
  }

  namespace GOOD {
    // the solution is composition , when inheritance doesn't work

    function swimmer<T extends { name: string }>({ name }: T) {
      return {
        swim: () => console.log(`${name} swam`),
      };
    }

    let { swim } = swimmer({ name: "Mourad" });
    swim();

    let swimmingMonsterCreator = (name: string) => {
      let monster = { name };

      return {
        ...monster,
        ...swimmer(monster),
      };
    };

    let fish = swimmingMonsterCreator("Mourad EL CADI");
  }

  namespace MY_WAY {
    // Here we're assigning by refrence 'Objects ...'
    let swim = function <T extends { name: string }>(this: T) {
      console.log(`${this.name} swam`);
    };

    let createSwimmerMonster = (name: string) => {
      return Object.assign({ name }, { swim });
    };

    let shark = createSwimmerMonster("Mourad");
  }
}
