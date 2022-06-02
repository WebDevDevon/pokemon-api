const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const { request } = require('https')
const PORT = 8000

app.use(cors())

const pokemon = {

    'bug': {
        'type': 'Bug',
        'info': 'A Bug Pokémon grows and evolves quickly compared to other normal types. They are known to be weak and somewhat useless, but their attacks in every battle are super effective against grass, psychics, and Dark-type Pokemon.',
        'picture': 'img\bug.png',
        'strong': 'Strong against Grass, Psychic, Dark',
        'weak': 'Weak against Fighting, Flying, Poison, Ghost, Steel, Fire, Fairy'
    },
    'dark': {
        'type': 'Dark',
        'info': 'The second generation of Pokemons presented the 76 Dark-type Pokémon to balance the other types. The attacks of the dark types are immune and more potent against psychic and ghost types. The weaknesses of dark dual types include bugs, fairy-type, and fighting type.',
        'picture': 'img\dark.png',
        'strong': 'Strong against Ghost, Psychic ',
        'weak': 'Weak against Fighting, Dark, Fairy'
    },
    'dragon': {
        'type': 'Dragon',
        'info': 'Dragons are hard to train because they require more EXP points at every level compared to other types. Dragons also have less damage with steels and do not affect a fairy-type that much.',
        'picture': 'img\dragon.png',
        'strong': 'Strong against Dragon',
        'weak': 'Weak against Steel'
    },
    'electric': {
        'type': 'Electric',
        'info': 'There were four added to the previous generations of Electric Pokemon. This kind of Pokemon defense is super effective against steels and flying-type Pokemon. Meanwhile, an Electric-type attack does not affect dragons and grass-type Pokémon that much. But how many Pokemon are there in the world?',
        'picture': 'img\electric.png',
        'strong': 'Strong against Flying, Water',
        'weak': 'Weak against Ground, Grass, Electric'
    },
    'fairy': {
        'type': 'Fairy',
        'info': 'The Fairy dual-type Pokémon was launched during Generation 6. Doing so helped balance the same type chart, understand type effectiveness, lessen the power, and give more damage to dragons. However, the Fairy-type is not effective against steels and poison-type.',
        'picture': 'img\fairy.png',
        'strong': 'Strong against Fighting, Dragon, Dark',
        'weak': 'Weak against Poison, Steel, Fire'
    },
    'fighting': {
        'type': 'Fighting',
        'info': 'The 78 Fighting Pokémon has a unique defense based on martial arts. Their attacks most likely win against rocks and steels. They are also great fighters against a dark, normal, and ice type [2]. On the other hand, rocks, bugs, and a dark Pokemon have no effect against fighting types.',
        'picture': 'img\fighting.png',
        'strong': 'Strong against Normal, Rock, Steel, Ice, Dark',
        'weak': 'Weak against Flying, Poison, Bug, Psychic, Ghost (Immune)'
    },
    'fire': {
        'type': 'Fire',
        'info': 'Fire-type Pokémon is one of the known three-starter Pokémon, and the other two types include grass and water. A fire-type moves rarely in the early game but is very effective against steel-type, grass-type, and bug-type but weak against rocks and water-type Pokémon. ',
        'picture': 'img\fire.png',
        'strong': 'Strong against Bug, Steel, Grass, Ice',
        'weak': 'Weak against Rock, Fire, Water, Dragon'
    },
    'flying': {
        'type': 'Flying',
        'info': 'The flying-type Pokemon is known for being fast compared to any other type. They are super effective against the fighting-type and bug-type. However, flying types are weak compared to electric, rock, and steel types.',
        'picture': 'img\flying.png',
        'strong': 'Strong against Fighting, Bug, Grass, Fairy',
        'weak': 'Weak against Rock, Steel, Electric'
    },
    'ghost': {
        'type': 'Ghost',
        'info': 'Ghost-types are known as rare Pokemon and are considered dual types. During the first generation, it does not affect the Psychic Pokémon. Ghosts are super effective in attacking the ghost-type and psychic-type Pokémon. However, they are not very effective in the dark.',
        'picture': 'img\ghost.png',
        'strong': 'Strong against Ghost, Psychic',
        'weak': 'Weak against Dark'
    },
    'grass': {
        'type': 'Grass',
        'info': 'The grass-type Pokemon is considered one of the weakest pokémon types. This type is ineffective against steel, fire, dragon, and bug-type. On the other hand, water, rock, and ground types are no-match against the grass.',
        'picture': 'img\grass.png',
        'strong': 'Strong against Ground, Rock, Water',
        'weak': 'Weak against Flying, Poison, Bug, Steel, Fire, Grass'
    },
    'ground': {
        'type': 'Ground',
        'info': 'Many are looking forward to using a ground-type Pokémon because they are considered the strongest since they have a special defense. The attack of this type is strong against fire, electric, poison, rock, and steel',
        'picture': 'img\ground.png',
        'strong': 'Strong against Poison, Rock, Steel, Fire, Electric',
        'weak': 'Weak against Bug, Grass'
    },
    'ice': {
        'type': 'Ice',
        'info': 'The ice-type Pokemon is considered the rarest among every dual type. Its evolutionary line contains dual ice and bug. Their weaknesses include fire, rock, steel, and fighting-type Pokemon. Meanwhile, the attack of ice types is effective against flying and grass types of Pokemon. They are also immune to the damaging effect of hail.',
        'picture': 'img\ice.png',
        'strong': 'Strong against Flying, Ground, Grass, Dragon',
        'weak': 'Weak against Steel, Fire, Water, Ice'
    },
    'normal': {
        'type': 'Normal',
        'info': 'The Normal dual type is probably the most basic type of existing Pokemon. It is because you see them appear more often in the first route. However, normal types should be careful against the fighting and ghost-type Pokémon. But how do you watch Pokemon in the right order?',
        'picture': 'img\normal.png',
        'strong': 'Strong against Nothing Lmao',
        'weak': 'Weak against Rock, Steel, Ghost'
    },
    'poison': {
        'type': 'Poison',
        'info': 'Nowadays, the version of 83 poison-types is considered the weakest Pokemon since it is only effective against the grass and fairy. They will not win against the rock or ghost pokemon type and do not affect steel-type Pokémon.',
        'picture': 'img\poison.png',
        'strong': 'Strong against Grass, Fairy',
        'weak': 'Weak against Poison, Ground, Rock, Ghost'
    },
    'psychic': {
        'type': 'Psychic',
        'info': 'The psychic type only possesses a few strengths and weaknesses. It also has two generations which elevated its power. The psychic type is super effective against fighting and poison type but would lose against the dark Pokemon.  ',
        'picture': 'img\psychic.png',
        'strong': 'Strong against Fighting, Poison',
        'weak': 'Weak against Steel, Psychic, Dark'
    },
    'rock': {
        'type': 'Rock',
        'info': 'The rock-type Pokemon is known for having a high defense. They also don’t damage a sandstorm as it increases its special defense. They are effective against the ice, flying, and fire types and are weak with ground types.',
        'picture': 'img\rock.png',
        'strong': 'Strong against Flying, Bug, Fire, Ice',
        'weak': 'Weak against Fighting, Ground, Steel'
    },
    'steel': {
        'type': 'Steel',
        'info': 'The steel pokemon type has obviously a strong defense compared to other different types of Pokémon. They always win against ice, rock, and fairy type. On the other hand, water and electric types are mostly its weaknesses.',
        'picture': 'img\steel.png',
        'strong': 'Strong against Rock, Ice, Fairy',
        'weak': 'Weak against Steel, Fire, Water, Electric'
    },
    'water': {
        'type': 'Water',
        'info': 'Water type is the most common Pokemon type among the other characters because it also belongs to the basic elements. The attack moves of water pokemon are highly effective against ground and rock types. However, water types should be cautious when dealing with electricity and grass Pokémon.',
        'picture': 'img\water.png',
        'strong': 'Strong against Ground, Rock, Fire',
        'weak': 'Weak against Water, Grass, Dragon'
    },
    'empty': {}
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:pokemonType', (req, res) => {
    const Types = req.params.pokemonType.toLowerCase()
    if(pokemon[Types]){
        res.json(pokemon[Types])
    } else {
        res.json(pokemon['empty'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running.')
})