export const armies = {
  tabForces: {
    units: {
      STLRW: {
        name: "Steeler bot",
        image: "https://images.hive.blog/DQmVhaUTAscBfhxCJoUDYhi7SXhyJjaa8vmPS6up2Car12c/STLRW.png",
        army:"T.A.B. Forces",
        class: "Light",
        color:"green",
        specials: "N/A",
        equipment: {range: "Laser gun" , melee: "Wakizashi"},
        move: 4,
        defense: { roll: 1, success: 4 },
        melee: { roll: 1, success: 3 },
        range: { roll: 1, success: 3, mods: { s: -1, m: 1, l: 0, xl: -1 } },
        maxRange: 1212,
        maxInGame: undefined,
        cost: 3
      }
    },
  },
  sysTroops: {
    units: {
      WBORK: {
        name: "Whiteboot troop",
        image:"https://images.hive.blog/DQmXaLmE7TXt6S7p15vnemdUWyey4ZG5bhEtbYVoxNec7ic/WBORK.png",
        army:"SYS Troops",
        class: "Light",
        color: "blue",
        specials: "N/A",
        equipment: {range: "Assault rifle" , melee: "Knife"},
        move: 4,
        defense: { roll: 1, success: 4 },
        melee: { roll: 1, success: 4 },
        range: { roll: 2, success: 4, mods: { s: 0, m: 1, l: -1, xl: -1 } },
        maxRange: 1212,
        maxInGame: undefined,
        cost: 3
      }
    }
  },
  rebels: {
    units: {
      OTTMK: {
        name: "Otto rebel",
        image: "https://images.hive.blog/DQmRhgeaJftN7dH85hYdgQ49ySdFt5WD2XLErmxyHm2wLXF/OTTMK.png",
        army:"Raging Rebels",
        class: "Light",
        color: "orange",
        specials: "N/A",
        equipment: {range: "Machine gun" , melee: "Hatchet"},
        move: 4,
        defense: { roll: 1, success: 4 },
        melee: { roll: 2, success: 4 },
        range: { roll: 3, success: 5, mods: { s: 1, m: 0, l: -1, xl: -2 } },
        maxRange: 1212,
        maxInGame: undefined,
        cost: 3
      }
    }
  },
  outerRing: {
    units: {
      SKNCK: {
        name: "Skinner savage",
        image: "https://images.hive.blog/DQmeB4P34AG9BdNd7SjmEvjiqNk6Et93bcJtNrViH6eiwEC/SKN.png",
        army:"Outer-Ring Savages",
        class: "Light",
        color: "yellow",
        specials: "N/A",
        equipment: {range: "Crossbow" , melee: "Kukri"},
        move: 4,
        defense: { roll: 1, success: 4 },
        melee: { roll: 2, success: 3 },
        range: { roll: 1, success: 3, mods: { s: 1, m: 0, l: -2, xl: -2 } },
        maxRange: 1212,
        maxInGame: undefined,
        cost: 3
      }
    }
  },
  voidWarriors: {
    units: {
      BACRC: {
        name: "Bac warrior",
        image: "https://images.hive.blog/DQmQko4fXKRLSutURGKJKRxZCAE343MHSR2W1MANavLCgdi/BACRC.png",
        army:"Void Warriors",
        class: "Light",
        color: "purple",
        specials: "N/A",
        equipment: {range: "Assault rifle" , melee: "Chainsaw attachment"},
        move: 4,
        defense: { roll: 1, success: 4 },
        melee: { roll: 4, success: 5 },
        range: { roll: 3, success: 5, mods: { s: 0, m: 0, l: -1, xl: -2 } },
        maxRange: 1212,
        maxInGame: undefined,
        cost: 3
      }
    }
  }
}
