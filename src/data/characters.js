// Facts come from the film's Wikipedia cast list, the SIIMA nominations list and the Netflix English subtitles.
// `quote` lines are single short lines from those subtitles, with the time they are spoken.
export const characters = [
  {
    id: 'jaison', name: 'Jaison', alias: 'Minnal Murali', actor: 'Tovino Thomas', obj: 'bolt', accent: '#52c8ff',
    role: 'The tailor who becomes a hero',
    about: 'A tailor in his foster father’s shop in Kurukkanmoola who dreams of a life in the US. A lightning strike on Christmas Eve changes his plans, and he takes the name Minnal Murali.',
    stats: [['Day job', 'Tailor'], ['Setting', 'Kerala, 1990s'], ['Also played by Tovino', 'Martin Rangakala'], ['Honour', 'Best Actor, SIIMA (Malayalam)']],
    quote: { text: 'Tailors are in great demand there.', at: '0:08:56' },
    art: { src: 'run-gold.jpg', pos: '58% 30%', credit: 'Fan art by abhi.vpm' },
  },
  {
    id: 'shibu', name: 'Shibu', alias: 'The other bolt', actor: 'Guru Somasundaram', obj: 'crow', accent: '#c8213a',
    role: 'The outcast struck by the same storm',
    about: 'A teashop worker who lives on the edge of village life. The same lightning strike reaches him at the same moment as Jaison, and the two men start the film as equals.',
    stats: [['Day job', 'Teashop worker'], ['Loves', 'Usha'], ['Struck', 'At the same moment as Jaison'], ['Honour', 'Best Actor in a Negative Role, SIIMA (Malayalam)']],
    quote: { text: 'No sir! It was a torn wallet.', at: '0:07:12' },
    art: { src: 'red-hood.jpg', pos: '62% 30%', credit: 'Fan art' },
  },
  {
    id: 'biji', name: '“Bruce Lee” Biji', alias: 'Brusli Biji', actor: 'Femina George', obj: 'belt', accent: '#e8b13a',
    role: 'Karate instructor, travel agent, ally',
    about: 'She runs a travel agency and teaches karate, and she ends up on Jaison’s side when his name needs clearing.',
    stats: [['Business', 'Biji Mol Travel Agency and Martial Arts Academy'], ['Ex of', 'Aneesh'], ['Film debut', 'Minnal Murali'], ['Nominated', 'Best Debutant Actress, SIIMA (Malayalam)']],
  },
  {
    id: 'usha', name: 'Usha', alias: 'Shibu’s one hope', actor: 'Shelly Kishore', obj: 'lamp', accent: '#ff8a4c',
    role: 'The person Shibu would do anything for',
    about: 'Daasan’s sister, and the mother of a child who needs an operation. Her family’s troubles, and Shibu’s feelings for her, drive much of what happens.',
    stats: [['Brother', 'Daasan'], ['Her child', 'Needs an operation'], ['Loved by', 'Shibu'], ['Nominated', 'Best Supporting Actress, SIIMA (Malayalam)']],
  },
  {
    id: 'pothan', name: 'Pothan', alias: 'P. C. Siby Pothan', actor: 'Aju Varghese', obj: 'umbrella', accent: '#3ad1c0',
    role: 'The constable with opinions',
    about: 'A police constable married to Jaison’s foster sister Jesmi, and father to Josemon and Appumol. He brings much of the film’s comedy.',
    stats: [['Job', 'Police constable'], ['Relation', 'Jaison’s brother-in-law'], ['Wife', 'Jesmi (Arya Salim)'], ['Children', 'Josemon and Appumol'], ['Nominated', 'Best Actor in a Comic Role, SIIMA (Malayalam)']],
  },
  {
    id: 'daasan', name: 'Daasan', alias: 'The senior tailor', actor: 'Harisree Ashokan', obj: 'scissors', accent: '#e8b13a',
    role: 'The tailor next to Jaison’s machine',
    about: 'A veteran tailor in Varkey’s shop who works beside Jaison, and Usha’s brother.',
    stats: [['Day job', 'Tailor in Varkey’s shop'], ['Sister', 'Usha'], ['Works with', 'Jaison']],
  },
  {
    id: 'saajan', name: 'Saajan Antony', alias: 'SI Saajan', actor: 'Baiju Santhosh', obj: 'cap', accent: '#52c8ff',
    role: 'The village sub-inspector',
    about: 'The police sub-inspector of Kurukkanmoola. His daughter Bincy is Jaison’s ex-girlfriend, and he does not approve of Jaison.',
    quote: { text: 'It’s time I see him up and close!', at: '0:06:35' },
    stats: [['Job', 'Police sub-inspector'], ['Daughter', 'Bincy (Sneha Babu)'], ['Opinion of Jaison', 'Low']],
  },
  {
    id: 'varkey', name: 'Varkey', alias: 'The foster father', actor: 'P. Balachandran', obj: 'spool', accent: '#ff8a4c',
    role: 'The owner of the tailor shop',
    about: 'Jaison’s foster father and the head of the household. Jaison, Daasan and the shop’s work all sit under his roof.',
    stats: [['Relation', 'Jaison’s foster father'], ['Daughter', 'Jesmi'], ['Business', 'Tailor shop']],
  },
  {
    id: 'josemon', name: 'Josemon', alias: 'The nephew', actor: 'Vasisht Umesh', obj: 'plane', accent: '#3ad1c0',
    role: 'The kid who sees it first',
    about: 'Pothan and Jesmi’s son and Jaison’s nephew. He stands with his uncle when Jaison has to clear his name.',
    stats: [['Parents', 'Pothan and Jesmi'], ['Uncle', 'Jaison'], ['Sister', 'Appumol']],
  },
]
