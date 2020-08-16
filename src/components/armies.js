export const armies = {
    specialForces: {
        units: { 
          soldier: {
              class: "FS",
              move: 4,
              defense: { roll: 1, success: 4 },
              melee: { roll: 1, success: 3 },
              range: { roll: 1, success: 3, mods: { s: -1, m: 1, l: 0, xl: -1 } },
              maxRange: 1212,
              maxInGame: undefined,
              cost: 10
          }
       },   
    },
    sysTroops: {
        units: {
          soldier: {
              class: "FS",
              move: 4,
              defense: { roll: 1, success: 4 },
              melee: { roll: 1, success: 3 },
              range: { roll: 2, success: 4, mods: { s: 0, m: 1, l: -1, xl: -1 } },
              maxRange: 1212,
              maxInGame: undefined,
              cost: 10
          }
       }
    },
    rebels: {
        units : {
          soldier: {
              class: "FS",
              move: 4,
              defense: { roll: 1, success: 4 },
              melee: { roll: 2, success: 4 },
              range: { roll: 3, success: 5, mods: { s: 1, m: 0, l: -1, xl: -2 } },
              maxRange: 1212,
              maxInGame: undefined,
              cost: 10
          }
        }
    },
    outerRing: {
        units : {
          soldier: {
            class: "FS",
            move: 4,
            defense: { roll: 1, success: 4 },
            melee: { roll: 2, success: 3 },
            range: { roll: 1, success: 3, mods: { s: 1, m: 0, l: -2, xl: undefined } },
            maxRange: 808,
            maxInGame: undefined,
            cost: 10
         }
       }    
    },
    voidWarriors: {
        units : {
          soldier: {
              class: "FS",
              move: 4,
              defense: { roll: 1, success: 4 },
              melee: { roll: 4, success: 5 },
              range: { roll: 3, success: 5, mods: { s: 0, m: 0, l: -1, xl: -2 } },
              maxRange: 1212,
              maxInGame: undefined,
              cost: 10
          }
        }
    }
  }
  