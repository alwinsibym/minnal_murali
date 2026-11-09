const base = import.meta.env.BASE_URL
export const img = (name) => `${base}img/${name}`
export const audioSrc = `${base}audio/the-entrance.mp3`

export const film = {
  title: 'Minnal Murali',
  malayalam: 'മിന്നൽ മുരളി',
  released: '24 December 2021',
  runtime: '2 h 38 min',
  director: 'Basil Joseph',
  producer: 'Sophia Paul',
  studio: 'Weekend Blockbusters',
  platform: 'Netflix',
  netflix: 'https://www.netflix.com/title/81497215',
  imdb: 'https://www.imdb.com/title/tt7268738/',
}

export const cast = [
  { actor: 'Tovino Thomas', role: 'Jaison / Minnal Murali', lead: true },
  { actor: 'Guru Somasundaram', role: 'Shibu', lead: true },
  { actor: 'Aju Varghese', role: 'Pothan', lead: true },
  { actor: 'Harisree Ashokan', role: 'Daasan' },
  { actor: 'Baiju Santhosh', role: 'S.I. Saajan' },
  { actor: 'Mamukkoya', role: 'Dr. Sambhashivan' },
  { actor: 'Vasisht Umesh', role: 'Josemon' },
  { actor: 'Shelly Kishore', role: 'Usha' },
  { actor: 'Femina George', role: 'Bruce Lee Biji' },
]

export const crew = [
  ['Direction', 'Basil Joseph'],
  ['Production', 'Sophia Paul, Weekend Blockbusters'],
  ['Cinematography', 'Sameer Thahir'],
  ['Editing', 'Livingston Mathew'],
  ['Music', 'Sushin Shyam, Shaan Rahman'],
  ['Action', 'Vlad Rimburg'],
  ['Costume design', 'Melwy J.'],
  ['Sound mixing', 'Justin Jose'],
]

export const trailers = [
  { id: 'zAUAliz1TKA', title: 'Official trailer', note: 'Netflix India, 28 October 2021' },
]

export const timeline = [
  ['2018', 'Writer Arun brings the idea to Basil Joseph, who calls a Malayalam superhero film a massive challenge.'],
  ['2020–21', 'Shooting runs into the COVID-19 pandemic. A large set church is vandalised during the break.'],
  ['Mid 2021', 'The planned Onam theatrical release is dropped after the second wave. The film moves to Netflix.'],
  ['28 Oct 2021', 'Netflix releases the first trailer.'],
  ['1 Dec 2021', 'A bonus trailer follows.'],
  ['16 Dec 2021', 'Premiere at the Mumbai Film Festival.'],
  ['24 Dec 2021', 'Worldwide release on Netflix in six languages.'],
]

export const awards = [
  'Kerala State Film Awards',
  'Filmfare Awards South',
  'SIIMA',
  'Asian Academy Creative Awards',
  'IWM Digital Awards',
  'Taurus World Stunt Awards',
]

export const gallery = [
  { src: 'run-gold.jpg', alt: 'Minnal Murali sprinting through a golden city, fan art', credit: 'Art by abhi.vpm', wide: true },
  { src: 'stand-city.jpg', alt: 'Minnal Murali standing above a misty skyline', credit: 'Fan artwork' },
  { src: 'village-strike.jpg', alt: 'Lightning striking a Kerala village at night', credit: 'Fan artwork' },
  { src: 'red-hood.jpg', alt: 'A red-hooded figure among falling banknotes', credit: 'Fan art' },
  { src: 'jaison-celebration.jpg', alt: 'Jaison smiling in a red shirt as villagers clap', credit: 'Film still' },
]

export const links = [
  ['Wikipedia', 'Plot, cast and production', 'https://en.wikipedia.org/wiki/Minnal_Murali'],
  ['IMDb', 'Trivia, reviews and awards', 'https://www.imdb.com/title/tt7268738/'],
  ['TMDB', 'Cast, crew and streaming info', 'https://www.themoviedb.org/movie/657644'],
  ['Rotten Tomatoes', 'Critic and audience scores', 'https://www.rottentomatoes.com/m/minnal_murali'],
  ['Film Companion', 'Trailer talk', 'https://www.filmcompanion.in/trailer-talk/minnal-murali-trailer-tovino-thomas-a-malayali-superhero-who-has-never-heard-of-batman-or-superman'],
  ['Film Companion', 'Tovino Thomas and Basil Joseph on the making', 'https://filmcompanion.in/interviews/malayalam-interview/minnal-murali-movie-netflix-tovino-thomas-basil-joseph-on-the-making'],
  ['Onmanorama', 'Basil Joseph on directing through COVID', 'https://www.onmanorama.com/entertainment/interviews/2021/09/15/basil-joseph-on-directing-minnal-murali-covid-times-netflix-release.html'],
  ['Hollywood Reporter India', 'Sequel plans', 'https://www.hollywoodreporterindia.com/features/insight/basil-joseph-tovino-thomas-on-minnal-murali-sequel-plans-and-the-elusive-allu-arjun-project'],
]
